import {IPeople,IFilm} from "swapi-ts/src/SWApi";
import {Films, People, Planets, Species, Starships, Vehicles } from 'swapi-ts';
import { AppThunk } from "../../../app/store";
import { getData } from "../../../app/utils.js";


export enum characterActions {
    setCharacter = 'APP/CHARACTER/SET',
    setFilms = 'APP/CHARACTER/SET-FILMS',
    setSpecies = 'APP/CHARACTER/SET-SETSPECIES',
    setStarships = 'APP/CHARACTER/SET-STARSHIPS',
    setVehicles = 'APP/CHARACTER/SET-VEHICLES',
    setHomeworld = 'APP/CHARACTER/SET-HOMEWORLD',
}

const initialState: IPeople = {
    birth_year: '',
    eye_color: '',
    films: [],
    gender: '',
    hair_color: '',
    height: '',
    homeworld: '',
    mass: 'string',
    name: 'string',
    skin_color: 'string',
    created: new Date,
    edited:  new Date,
    species: [],
    starships: [],
    url: '',
    vehicles: [],
}

export const characterReducer = (state: IPeople = initialState, action: CharacterActionsType): IPeople => {
    switch (action.type) {
        case characterActions.setCharacter: {
            return {
                ...state,
                ...action.character
            }
        }
        case characterActions.setFilms: {
            return {
                ...state,
                films: [...action.films]
            }
        }
        case characterActions.setSpecies: {
            return {
                ...state,
                species: [...action.species]
            }
        }
        case characterActions.setStarships: {
            return {
                ...state,
                starships: [...action.starships]
            }
        }
        case characterActions.setVehicles: {
            return {
                ...state,
                vehicles: [...action.vehicles]
            }
        }
        case characterActions.setHomeworld: {
            return {
                ...state,
                homeworld: action.title
            }
        }
        default:
            return state;
    }
}

//ActionCreators
export const setCharacter = (character: IPeople) => ({type: characterActions.setCharacter, character} as const)
export const setFilms = (films: string[]) => ({type: characterActions.setFilms, films} as const)
export const setSpecies = (species: string[]) => ({type: characterActions.setSpecies, species} as const)
export const setStarships = (starships: string[]) => ({type: characterActions.setStarships, starships} as const)
export const setVehicles = (vehicles: string[]) => ({type: characterActions.setVehicles, vehicles} as const)
export const setHomeworld = (title: string) => ({type: characterActions.setHomeworld, title} as const)

//ThunkCreators
export const fetchCharacterTC = (id:string | undefined): AppThunk => async dispatch => {
    //dispatch(setAppStatusAC('loading'))
    try {
        const characterUrl = `https://swapi.dev/api/people/${id}/`;
        const response = await People.find(people => people.url === characterUrl)
        dispatch(setCharacter(response.resources[0].value))
/*        if(response.resources[0].value.films.length>0){
            let films = [];
            for (let i = 0; i < response.resources[0].value.films.length; i++) {
                const film = await Films.find(films => films.url === response.resources[0].value.films[i])
                films.push(film.resources[0].value.title)
                dispatch(setFilms(films))
            }
        }*/
        getData(Films, response.resources[0].value.films, setFilms, dispatch, 'title')
        getData(Species, response.resources[0].value.species, setSpecies, dispatch, 'name')
        getData(Starships, response.resources[0].value.starships, setStarships, dispatch, 'name')
        getData(Vehicles, response.resources[0].value.vehicles, setVehicles, dispatch, 'name')
        const homeworldResponse = await Planets.find(el => el.url === response.resources[0].value.homeworld)
        dispatch(setHomeworld(homeworldResponse.resources[0].value.name))
        //dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        console.log('fetchCharacterTC', error)
        //errorNetworkHandler(error, dispatch)
    }
}

export type SetCharacterActionType = ReturnType<typeof setCharacter>
export type SetFilmsActionType = ReturnType<typeof setFilms>
export type SetSpeciesActionType = ReturnType<typeof setSpecies>
export type SetStarshipsActionType = ReturnType<typeof setStarships>
export type SetVehiclesActionType = ReturnType<typeof setVehicles>
export type SetHomeworldActionType = ReturnType<typeof setHomeworld>

export type CharacterActionsType = 
    | SetCharacterActionType 
    | SetFilmsActionType
    | SetSpeciesActionType
    | SetStarshipsActionType
    | SetVehiclesActionType
    | SetHomeworldActionType