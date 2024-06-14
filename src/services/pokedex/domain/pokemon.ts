export type PokedexResult = { name: string; url: string };

export type PokedexResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokedexResult[];
};

export type PokemonResponse = {
  height: number;
  id: number;
  name: string;
  weight: number;
};
