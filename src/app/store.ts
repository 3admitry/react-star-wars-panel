import {CharactersListActionsType, charactersListReducer} from "../features/characters/characters-list-reducer";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { CharacterActionsType, characterReducer } from "../features/characters/character/character-reducer";

const rootReducer = combineReducers({
    charactersList: charactersListReducer,
    character: characterReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType = CharactersListActionsType | CharacterActionsType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;