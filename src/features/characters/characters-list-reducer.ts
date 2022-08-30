import {IPeople} from "swapi-ts/src/SWApi";
import {People} from 'swapi-ts';
import {AppThunk} from "../../app/store";

type CharactersList = {
    count: number
    next: string | null
    previous: string | null
    results: Array<IPeople>
    pageNumber: number
}

export enum characterActions {
    setCharacters = 'APP/CHARACTERSLIST/SET',
    setPageNumber = 'APP/CHARACTERSLIST/SET-PAGE-NUMBER',
}

const initialState: CharactersList = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    pageNumber: 1
}

export const charactersListReducer = (state: CharactersList = initialState, action: CharactersListActionsType): CharactersList => {
    switch (action.type) {
        case characterActions.setCharacters: {
            return {
                ...state,
                count: action.charactersList.count,
                next: action.charactersList.next,
                previous: action.charactersList.previous,
                results: [...action.charactersList.results],
            }
        }
        case characterActions.setPageNumber: {
            return {
                ...state,
                pageNumber: action.pageNumber,
            }
        }
        default:
            return state;
    }
}

//ActionCreators
export const setCharactersList = (charactersList: CharactersList) => ({
    type: characterActions.setCharacters,
    charactersList
} as const)
export const setPageNumber = (pageNumber: number) => ({type: characterActions.setPageNumber, pageNumber} as const)

//ThunkCreators
export const fetchCharactersListTC = (pageNumber: number, search?: string): AppThunk => async dispatch => {
    let response;
    try {
        if (search === undefined) {
            response = await People.getPage(pageNumber)
        } else {
            response = await People.getPage(pageNumber, search)
        }
        dispatch(setCharactersList(response))
        dispatch(setPageNumber(pageNumber))
    } catch (error: any) {
        console.log('fetchCharactersListTC', error)
    }
}

export type SetCharactersListActionType = ReturnType<typeof setCharactersList>
export type SetPageNumberActionType = ReturnType<typeof setPageNumber>

export type CharactersListActionsType =
    | SetCharactersListActionType
    | SetPageNumberActionType