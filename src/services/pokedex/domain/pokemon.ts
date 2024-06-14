export type PokedexResult = { name: string; url: string };

export type PokedexResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokedexResult[];
};
