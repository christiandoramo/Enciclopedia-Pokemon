import Pokemon from "../models/pokemon.js";

const urlPokemons = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonById(id) {
  const data = await getPokemonData(`${urlPokemons}/${id}/`);
  console.log(data);
  return data;
}

export async function getMorePokemons(range, offset) {
  const response = await fetch(
    `${urlPokemons}?limit=${range}&offset=${offset}`
  );
  const indexPokemons = await response.json();
  // pegando todos json pokemons
  const pokeDataArray = await Promise.all(
    indexPokemons.results.map((poke) => getPokemonData(poke.url))
    // buscando os dados de abilidades, typos, e os gerais do json padrão
  );
  return pokeDataArray;
}

async function getPokemonData(PokemonUrl) {
  const responseInfo = await fetch(PokemonUrl);
  const pokeData = await responseInfo.json();
  const abilities = await getPokemonAbilities(pokeData);
  const types = await getPokemonTypes(pokeData);
  const moves = await getPokemonMoves(pokeData);

  const data = {
    image: pokeData.sprites.other["official-artwork"].front_default,
    id: pokeData.id,
    name: pokeData.name,
    abilities: abilities, // basta os atributos terem os mesmos nomes que vai se tornar objeto pokemon
    types: types, //type
    moves: moves,
  };

  return data;
}

// agora fazer o codigo em getPokemon que adicione as habilidades, types e moves
async function getPokemonAbilities(pokemonData) {
  const pokeAbilitiesData = await Promise.all(
    pokemonData.abilities.map(async (index) => {
      const response = await fetch(index.ability.url);
      const abilityData = await response.json();
      return {
        name: index.ability.name,
        effect: abilityData.effect_entries[1].effect, // posição 1 -> Língua inglesa
      };
    })
  );
  return pokeAbilitiesData;
}

async function getPokemonTypes(pokemonData) {
  const pokeTypesData = await Promise.all(
    pokemonData.types.map(async (index) => {
      const response = await fetch(index.type.url);
      const typesData = await response.json();
      return {
        name: typesData.name,
      };
    })
  );
  return pokeTypesData;
}

async function getPokemonMoves(pokemonData) {
  const pokeMovesData = await Promise.all(
    pokemonData.moves.slice(0, 4).map(async (index) => {
      const response = await fetch(index.move.url);
      const movesData = await response.json();
      return {
        name: index.move.name,
        effect: movesData.flavor_text_entries[0].flavor_text,
      };
    })
  );
  console.log(pokeMovesData);
  return pokeMovesData;
}
