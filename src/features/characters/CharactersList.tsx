import {Box, Paper, styled, TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import React, {useEffect,useState} from 'react';
import {fetchCharactersListTC} from './characters-list-reducer';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import PaginationCharacters from '../../components/Pagination';
import { CharacterItem } from './CharacterItem';

const CharactersList = () => {

    const dispatch = useAppDispatch()
    const characters = useAppSelector(state => state.charactersList.results)
    const pageNumber = useAppSelector(state => state.charactersList.pageNumber)
    const count = useAppSelector(state => state.charactersList.count)
    const[search, setSearch] = useState<string|undefined>()

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const thunk = fetchCharactersListTC(pageNumber, search ? search:'undefined')
        dispatch(thunk)
    }, [search])

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        const thunk = fetchCharactersListTC(value, search)
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
            <TextField onChange={searchHandler} id="outlined-basic" label="Type name of character" variant="outlined"/>
            <Box sx={{width: '100%'}}>
                <Stack spacing={2}>
                    {
                        characters.map(char => {
                            return <Item key={char.name}>
                                <CharacterItem id={+char.url.split('/')[5]} character={char}/>
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