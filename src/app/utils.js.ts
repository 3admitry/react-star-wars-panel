import {CharacterActionsType} from "../features/characters/character/character-reducer";

export const  getData = async (obj: any, data: Array<any>, actioCreator: (value: any) => CharacterActionsType, dispatch: any, title: any) => {
    if(data.length>0){
        let array = [];
        for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            const arr = await obj.find(el => el.url === data[i])
            if(arr.resources.length>0){
                // @ts-ignore
                array.push(arr.resources[0].value[title])
                dispatch(actioCreator(array))
            }
        }
    }
}