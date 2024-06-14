const NEXT_PUBLIC_POKEDEX_IMG_BASE_URL =
  process.env.NEXT_PUBLIC_POKEDEX_IMG_BASE_URL;

export function getPokemonIdFromUrl(url: string) {
  const regex = /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(\d+)\/$/;
  const match = url.match(regex);
  if (match) {
    const pokemonId = match[1];
    return pokemonId;
  }
  return null;
}

export function getPokemonImageFromId(id: string) {
  const url = `${NEXT_PUBLIC_POKEDEX_IMG_BASE_URL}/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/
${id}.svg`;
  return url;
}
