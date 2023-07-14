import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../../services";

const Info = (props) => {
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();
  useEffect(() => {
    // agora fazer o codigo em getPokemon que adicione as habilidades, types e moves

    getPokemonById(id).then((pokemon) => setPokemon(pokemon));
  });

  return (
    <div>
      <Link to="/">Voltar</Link>
      <br />
      <br />
      <div className="info">
        {pokemon.image && (
          <img src={pokemon.image} alt={"Sprite do " + pokemon.name} />
        )}
        <h1>Nome: {pokemon.name}</h1>
        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities &&
            pokemon.abilities.map((ability) => (
              <li>
                <h4> {ability.name} </h4>
                <p> {ability.effect} </p>
              </li>
            ))}
        </ul>

        <h3>Moves</h3>
        <ul>
          {pokemon.moves &&
            pokemon.moves.map((move) => (
              <li>
                <h4>{move.name}</h4>
                <p>{move.effect}</p>
              </li>
            ))}
        </ul>

        <h3>Type</h3>
        <ul>
          {pokemon.types && pokemon.types.map((type) => <li>{type.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Info;
