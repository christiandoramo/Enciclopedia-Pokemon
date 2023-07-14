const Pokemon = {
  create(id, name, image, abilities, types) {
    return {
      id,
      name,
      image,
      abilities,
      types,
      moves,
    };
  },
};

export default Pokemon;
