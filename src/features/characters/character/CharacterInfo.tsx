import {Box, Button, FormGroup, Grid, Paper, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {IPeople} from 'swapi-ts/src/SWApi';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {fetchCharacterTC, setCharacter} from './character-reducer';
import {useFormik} from 'formik';

const CharacterInfo = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const character: IPeople = useAppSelector(state => state.character)
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        const thunk = fetchCharacterTC(params.userId)
        dispatch(thunk)
    }, [])

    return <>
        <Box sx={{width: '100%', padding: 2}}>
            <Button component={Link} to={`/`} variant="outlined">Back to Home</Button>
            <Paper sx={{padding: '2rem 3rem', marginTop: 2}}>
                {!editMode &&
                    <>
                        <Button sx={{float: 'right'}} onClick={() => setEditMode(true)} variant="outlined">Edit</Button>
                        <CharacterData character={character}/>
                    </>
                }
                {editMode && <CharacterDataForm character={character} setEditMode={setEditMode}/>}
            </Paper>
        </Box>
    </>;
};

export default CharacterInfo;

const CharacterData = ({character}: any) => {
    let characterData = Object.keys(character).map((el, i) => {
        if (el === 'name' || el === 'url' || el === 'created' || el === 'edited') return false
        return <Grid container spacing={2} key={i}>
            <Grid item xs={2}>{el}</Grid><Grid item xs={2}>{character[el]}</Grid>
        </Grid>
    })

    return (
        <>
            <h3>{character.name}</h3>
            {characterData}
        </>
    );
};

const CharacterDataForm = ({character, setEditMode}: any) => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: character,

        onSubmit: values => {
            dispatch(setCharacter(values))
            console.log(values)
            setEditMode(false)
        },
    });
    let characterData = Object.keys(character).map((el, i) => {
        if (el === 'url' || el === 'created' || el === 'edited') return false
        return <Grid key={i}>
            <Grid item sx={{margin: '.5rem 0'}}>
                <TextField fullWidth label={el} {...formik.getFieldProps(el)}
                />
            </Grid>
        </Grid>
    })
    return <form onSubmit={formik.handleSubmit}>
        <FormGroup>
            {characterData}
            <Button type={'submit'} variant={'contained'} color={'primary'}>
                Save
            </Button>
        </FormGroup>
    </form>
}