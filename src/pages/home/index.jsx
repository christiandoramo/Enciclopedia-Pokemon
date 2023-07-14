import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BtnVerMais } from "../../components/buttons";
import { PokemonContext } from "../../contexts";

var offset = 0;
const Home = () => {
  const { pokemons, loadMorePokemons } = useContext(PokemonContext);
  return (
    <>
      <h1>Lista de Pokémons</h1>
      <BtnVerMais addPokemons={loadMorePokemons} />
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/info/${pokemon.id}`}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.image} alt="Sprite do Pokémon" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
