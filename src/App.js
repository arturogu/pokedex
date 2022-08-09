import { useState, useEffect } from 'react';
import axios from 'axios';
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

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <input onChange={e => setSearchItem(e.target.value)} value={searchItem} type="text"></input>
      <div>
        { pokemonList.map((pokemon) => {
          return (
            <li key={pokemon.name}>{pokemon.name}</li>
          );
        })}
      </div>
      <div>
        { listOffset > 0 ? <button onClick={previousPage}>previous</button> : null }
        { listOffset < 1100 ? <button onClick={nextPage}>next</button> : null }
      </div>
    </div>
  );
}

export default App;
