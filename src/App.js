import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  
  useEffect(() => {
    getPokemonList();
  }, []);
 
  const getPokemonList = async() => {
    const res = await axios("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
    setPokemonList(Object.values(res.data.results));
  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <ul>
        { pokemonList.map((pokemon) => {
          return (
            <li>{pokemon.name}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
