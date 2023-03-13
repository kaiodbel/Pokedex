import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import "./App.css"
import Pokedex from "./components/Pokedex";
import { getPokemons } from "./api";

function App() {

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const result = await getPokemons();
      setPokemons(result);
      setLoading(false);
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  }

  useEffect(() => {
    console.log("carregou");
    fetchPokemons();
  }, [])


  return (
    <div>
      <Navbar />
      <Searchbar />
      <Pokedex pokemons={pokemons} loading={loading} />
    </div>
  );
}

export default App;
