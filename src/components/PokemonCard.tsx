import { PokedexResult } from "@/services/pokedex/domain/pokemon";
import { getPokemonIdFromUrl, getPokemonImageFromId } from "@/utils/pokedex";
import Image from "next/image";
import { FC, useMemo } from "react";

type Props = {
  pokemon: PokedexResult;
};

const PokemonCard: FC<Props> = ({ pokemon }) => {
  const pokemonId = useMemo(() => {
    const id = getPokemonIdFromUrl(pokemon.url);
    if (!id) throw new Error("Id de pokemon no encontrado.");
    return id;
  }, [pokemon]);

  const imgUrl = useMemo(() => {
    const url = getPokemonImageFromId(pokemonId);
    return url;
  }, [pokemonId]);

  return (
    <a
      className="flex flex-col items-center gap-4 hover:text-primary h-32"
      href={`/pokemon/${pokemonId}`}
    >
      <Image
        className="h-20"
        src={imgUrl}
        alt={pokemon.name}
        width={100}
        height={100}
      />
      <h3 className="mt-auto">{pokemon.name}</h3>
    </a>
  );
};
export default PokemonCard;
