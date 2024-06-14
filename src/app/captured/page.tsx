"use client";
import CaptureService from "@/services/pokedex/application/CaptureService";
import useAuth from "@/store/auth/useAuth";
import { getPokemonImageFromId } from "@/utils/pokedex";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const auth = useAuth();
  const {
    data: pokemonIds,
    isLoading,
    refetch,
  } = useQuery<string[]>({
    queryKey: ["captured"],
    queryFn: () => {
      if (!auth.user) return [];
      return CaptureService.getCapturedPokemons(auth.user.username);
    },
  });

  if (isLoading) return <>Cargando :D</>;

  return (
    <div className="flex flex-col gap-4">
      <h1>Pokemones capturados</h1>
      <button
        className="bg-primary w-fit rounded px-2 mb-4"
        onClick={() => refetch()}
      >
        Refrescar
      </button>
      <div className="grid grid-cols-4 w-full m-auto max-md:grid-cols-3 max-sm:grid-cols-2 gap-x-2 gap-y-4">
        {(pokemonIds ?? []).map((id) => (
          <div
            key={id}
            className="relative flex flex-col items-center gap-4 hover:text-primary h-32"
          >
            <Image
              className="h-20 w-20"
              src={getPokemonImageFromId(id)}
              alt={id}
              width={100}
              height={100}
            />
            <a href={`/pokemon/${id}`} className="mt-auto">
              {id}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
