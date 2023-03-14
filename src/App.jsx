import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import "./App.css";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemons } from "./api";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const itemsPerPage = 30
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(itemsPerPage, itemsPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const result = await Promise.all(promises);
      setPokemons(result);
      setLoading(false);
      setTotalPage(Math.ceil(data.count / itemsPerPage))
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  useEffect(() => {
    console.log("carregou");
    fetchPokemons();
  }, [page]);

  return (
    <div>
      <Navbar />
      <Searchbar />
      <Pokedex
        pokemons={pokemons}
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
      
      <Footer/>
    </div>
  );
}

export default App;
