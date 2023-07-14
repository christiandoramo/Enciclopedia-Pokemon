import React, { createContext, useEffect, useState } from "react";
import { getMorePokemons } from "../services";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const range = 10;
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadMorePokemons();
  }, []);

  const loadMorePokemons = async () => {
    const pokemonsCurrent = await getMorePokemons(range, offset);
    setOffset((prevOffset) => prevOffset + range);
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsCurrent]);
  };

  return (
    <PokemonContext.Provider value={{ pokemons, loadMorePokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
