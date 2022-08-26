import {Box, Grid, Paper} from '@mui/material';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {People} from 'swapi-ts';
import {IPeople} from 'swapi-ts/src/SWApi';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {fetchCharacterTC} from './character-reducer';

const CharacterInfo = () => {
    const params = useParams();
    const characterUrl = `https://swapi.dev/api/people/${params.userId}/`;
    const dispatch = useAppDispatch();
    const character: IPeople = useAppSelector(state => state.character)

    useEffect(() => {
        const thunk = fetchCharacterTC(params.userId)
        dispatch(thunk)
    }, [])


    return <>
        <Box sx={{width: '100%', padding: 2}}>
            <Paper sx={{padding: '2rem 3rem'}}>
                <h3>{character.name}</h3>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Birth year:</Grid><Grid item xs={2}>{character.birth_year}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Eye color:</Grid><Grid item xs={2}>{character.eye_color}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Films:</Grid><Grid item xs={2}>{character.films.map((e,i) => <div key={i}>{''+e}</div>)}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Gender:</Grid><Grid item xs={2}>{character.gender}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Hair color:</Grid><Grid item xs={2}>{character.hair_color}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Height:</Grid><Grid item xs={2}>{character.height}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Homeworld:</Grid><Grid item xs={2}>{''+character.homeworld}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Mass:</Grid><Grid item xs={2}>{character.mass}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Skin color:</Grid><Grid item xs={2}>{character.skin_color}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Species:</Grid><Grid item xs={2}>{character.species.map((e,i) => <div key={i}>{''+e}</div>)}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Starships:</Grid><Grid item xs={2}>{character.starships.map((e,i) => <div key={i}>{''+e}</div>)}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>Vehicles:</Grid><Grid item xs={2}>{character.vehicles.map((e,i) => <div key={i}>{''+e}</div>)}</Grid>
                </Grid>
            </Paper>
        </Box>
    </>;
};

export default CharacterInfo;