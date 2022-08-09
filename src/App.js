import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Pokemon from './Pokemon';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [listOffset, setListOffset] = useState(0);
  const [searchItem, setSearchItem] = useState('');
  const [pokemon, setPokemon] = useState({});
  const [pokedexFlag, setPokedexFlag] = useState(true);
  
  useEffect(() => {
    getPokemonList();
  }, [listOffset]);
 
  const getPokemonList = async() => {
    const res = await axios(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${listOffset}`);
    setPokemonList(Object.values(res.data.results));
  }

  const getPokemon = async (url) => {
    const poke = await axios(url);
    setPokemon(poke.data);
    setPokedexFlag(false);
  }

  const previousPage = () => {
    setListOffset(listOffset - 100);
  }

  const nextPage = () => {
    setListOffset(listOffset + 100);
  }

  const filteredList = pokemonList.filter(pokemon => {
    return pokemon.name.startsWith(searchItem)
  });

  const pokedexList = (<>
      <h1>Pokedex</h1>
      <Box sx={{maxWidth: 300, margin: 'auto'}}>
        <TextField variant="outlined" onChange={e => setSearchItem(e.target.value.toLocaleLowerCase())} 
          value={searchItem} label="Filter"/>
        <List>
          { filteredList.map((pokemon) => {
            return (
              <ListItem key={pokemon.name} >
                <ListItemButton onClick={() => getPokemon(pokemon.url)}>
                  <ListItemText>{pokemon.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        { listOffset > 0 ? <Button variant="contained" onClick={previousPage} sx={{mr: 'auto'}}>previous</Button> : null }
        { listOffset < 1100 ? <Button variant="contained" onClick={nextPage}>next</Button> : null }
      </Box>
  </>);


  return (
    <div className="App">
      { pokedexFlag ? pokedexList : <Pokemon pokemon={pokemon} back={setPokedexFlag}/>}
    </div>
  );
}

export default App;
