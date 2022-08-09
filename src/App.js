import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem } from '@mui/material';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [listOffset, setListOffset] = useState(0);
  const [searchItem, setSearchItem] = useState('');
  
  useEffect(() => {
    getPokemonList();
  }, [listOffset]);
 
  const getPokemonList = async() => {
    const res = await axios(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${listOffset}`);
    setPokemonList(Object.values(res.data.results));
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

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <TextField variant="outlined" onChange={e => setSearchItem(e.target.value.toLocaleLowerCase())} value={searchItem}/>
      <List>
        { filteredList.map((pokemon) => {
          return (
            <ListItem key={pokemon.name}>{pokemon.name}</ListItem>
          );
        })}
      </List>
      <div>
        { listOffset > 0 ? <Button variant="contained" onClick={previousPage}>previous</Button> : null }
        { listOffset < 1100 ? <Button variant="contained" onClick={nextPage}>next</Button> : null }
      </div>
    </div>
  );
}

export default App;
