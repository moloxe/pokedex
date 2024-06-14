"use client";
import PokemonCard from "@/components/PokemonCard";
import { POKEMONS_PER_PAGE } from "@/constants/pokedex";
import PokedexService from "@/services/pokedex/application/PokedexService";
import { PokedexResponse } from "@/services/pokedex/domain/pokemon";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const { data: pokemons, isLoading } = useQuery<PokedexResponse>({
    queryKey: ["pokemons", page],
    queryFn: () => PokedexService.getPokemons(Number(page)),
  });

  const totalPages = useMemo(() => {
    if (!pokemons?.count) return 0;
    return Math.floor(pokemons?.count / POKEMONS_PER_PAGE);
  }, [pokemons]);

  const paginations = useMemo(() => {
    const list = new Array<{
      path: string;
      title: string;
      page: string;
    }>();
    for (let index = 0; index < totalPages; index++) {
      const page = `${index + 1}`;
      list.push({
        page,
        path: `/pokedex?page=${page}`,
        title: `${page}`,
      });
    }
    return list;
  }, [totalPages]);

  if (isLoading) return <>Cargando :D</>;
  if (!pokemons?.results) return <>No se encontraron resultados.</>;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 w-full m-auto max-md:grid-cols-3 max-sm:grid-cols-2 gap-x-2 gap-y-4">
        {pokemons.results.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 p-4">
        {paginations.map((pagination) => (
          <a
            className={`text-sm hover:underline hover:text-primary ${
              pagination.page === page ? "text-primary" : ""
            }`}
            href={pagination.path}
            key={pagination.path}
          >
            {pagination.title}
          </a>
        ))}
      </div>
    </div>
  );
}
