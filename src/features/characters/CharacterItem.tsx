import { Button } from "@mui/material";
import { IPeople } from "swapi-ts";
import { Link } from "react-router-dom";


type propsType = {
    character: IPeople
    id: number
}
export const CharacterItem = ({id, character}: propsType) => {
    return (
        <div>
            {character.name}

            <Button component={Link} to={`/person/${id}`} variant="outlined">
                About Page
            </Button>

        </div>
    );
};