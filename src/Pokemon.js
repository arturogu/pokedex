import { Button } from '@mui/material';

function Pokemon(props) {
    const pokemon = props.pokemon;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default}></img>
            { pokemon.types.map((type) => {
                return (<div key={type.slot}>{type.type.name}</div>)
            })}
            <Button onClick={() => props.back(true)} variant="contained">Go back</Button>
        </div>
    );
}

export default Pokemon