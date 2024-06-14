"use client";
import PokedexService from "@/services/pokedex/application/PokedexService";
import { PokemonResponse } from "@/services/pokedex/domain/pokemon";
import { getPokemonImageFromId } from "@/utils/pokedex";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo } from "react";

export default function PokemonPage({
  params,
}: {
  params: { pokemonId: string };
}) {
  const { data: pokemon, isLoading } = useQuery<PokemonResponse>({
    queryKey: ["pokemon", params.pokemonId],
    queryFn: () => PokedexService.getPokemon(params.pokemonId),
  });

  const imgUrl = useMemo(() => {
    const url = getPokemonImageFromId(`${pokemon?.id}`);
    return url;
  }, [pokemon]);

  if (isLoading) return <>Cargando :D</>;
  if (!pokemon) return <>No se encontraron resultados.</>;

  return (
    <div className="flex flex-wrap gap-8 mx-auto">
      <Image
        className="h-80 w-80"
        src={imgUrl}
        alt={pokemon.name}
        width={100}
        height={100}
      />
      <div className="flex flex-col roudned bg-white bg-opacity-10 rounded-lg p-4 min-w-[400px] max-sm:w-full">
        <h2>{pokemon.name}</h2>
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>

        <button className="bg-primary rounded p-2 mt-auto">Capturar</button>
      </div>
    </div>
  );
}
