import {Box, Button} from "@mui/material";
import {IPeople} from "swapi-ts";
import {Link} from "react-router-dom";

type propsType = {
    character: IPeople
    id: number
}

export const CharacterItem = ({id, character}: propsType) => {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    } as const;
    return (
        <Box sx={style}>
            <div> {character.name}</div>
            <div><Button component={Link} to={`/person/${id}`} variant="outlined">
                About Page
            </Button></div>
        </Box>
    );
};