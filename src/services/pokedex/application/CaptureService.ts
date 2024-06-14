import { getCaputred, setCaptured } from "../infrastructure/captured-storage";

const CaptureService = {
  async capturePokemon(username: string, pokemonId: string) {
    const captured = getCaputred(username);
    captured.push(pokemonId);
    setCaptured(username, captured);
  },
  async isPokemonCaptured(username: string, pokemonId: string) {
    const captured = getCaputred(username);
    return captured.includes(pokemonId);
  },
};

export default CaptureService;
