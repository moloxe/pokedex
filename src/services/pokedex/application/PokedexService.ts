import { POKEMONS_PER_PAGE } from "@/constants/pokedex";
import { PokedexResponse, PokemonResponse } from "../domain/pokemon";
import { pokedexFetch } from "../infrastructure/pokedex-fetch";

const PokedexService = {
  async getPokemons(page = 1) {
    try {
      const res = await pokedexFetch(
        `/pokemon?offset=${page}&limit=${POKEMONS_PER_PAGE}`
      );
      const data = (await res.json()) as PokedexResponse;
      return data;
    } catch (error) {
      throw new Error("Error cargando pokemones.");
    }
  },
  async getPokemon(pokemonId: string) {
    try {
      const res = await pokedexFetch(`/pokemon/${pokemonId}`);
      const data = (await res.json()) as PokemonResponse;
      return data;
    } catch (error) {
      throw new Error("Error cargando pokemon.");
    }
  },
};

export default PokedexService;
