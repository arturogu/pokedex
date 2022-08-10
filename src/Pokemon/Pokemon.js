import { Button } from '@mui/material';
import './Pokemon.css'

function Pokemon(props) {
    const pokemon = props.pokemon;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <div className='pokemon-container'>
                <img src={pokemon.sprites.front_default}></img>
                <div>
                    { pokemon.types.map((type) => {
                        return (<div key={type.slot} className="type">{type.type.name}</div>)
                    })}
                </div>
            </div>
            <Button onClick={() => props.back(true)} variant="contained">Go back</Button>
        </div>
    );
}

export default Pokemon