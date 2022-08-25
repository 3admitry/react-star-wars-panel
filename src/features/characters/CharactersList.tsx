import {Box, Paper, styled} from '@mui/material';
import Stack from '@mui/material/Stack';
import React, {useEffect} from 'react';
import {fetchCharactersListTC} from "./characters-list-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {People} from 'swapi-ts';
import PaginationCharacters from "../../components/Pagination";

const CharactersList = () => {

    const dispatch = useAppDispatch()
    const characters = useAppSelector(state => state.charactersList.results)
    const pageNumber = useAppSelector(state => state.charactersList.pageNumber)
    const count = useAppSelector(state => state.charactersList.count)

    useEffect(() => {
        People.find(people => people.name === 'Biggs Darklighter').then(res=> console.log(res))

        const thunk = fetchCharactersListTC(pageNumber)
        dispatch(thunk)
    }, [])

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        const thunk = fetchCharactersListTC(value)
        dispatch(thunk)
    };

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Box sx={{width: '100%'}}>
                <Stack spacing={2}>
                    {
                        characters.map(char => {
                            return <Item key={char.name}>
                                <CharacterItem character={char}/>
                            </Item>
                        })
                    }
                </Stack>
            </Box>
            <PaginationCharacters count={count/10} pageNumber={pageNumber} handlePagination={handlePagination}/>
        </>
    );
};

export default CharactersList;

const CharacterItem = ({character}: any) => {
    return (
        <div>
            {character.name}
        </div>
    );
};
