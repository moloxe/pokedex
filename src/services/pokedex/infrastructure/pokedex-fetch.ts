const NEXT_PUBLIC_POKEDEX_BASE_URL = process.env.NEXT_PUBLIC_POKEDEX_BASE_URL;

export function pokedexFetch(path: string) {
  return fetch(`${NEXT_PUBLIC_POKEDEX_BASE_URL}/api/v2${path}`);
}
