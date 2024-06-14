import CaptureService from "@/services/pokedex/application/CaptureService";
import { PokedexResult } from "@/services/pokedex/domain/pokemon";
import useAuth from "@/store/auth/useAuth";
import { getPokemonIdFromUrl, getPokemonImageFromId } from "@/utils/pokedex";
import { useQuery } from "@tanstack/react-query";
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
  const auth = useAuth();
  const { data: isCaptured } = useQuery<boolean>({
    queryKey: ["captured-pokemon", pokemonId],
    queryFn: () => {
      if (!auth.user?.username) return false;
      return CaptureService.isPokemonCaptured(auth.user.username, pokemonId);
    },
  });
  const imgUrl = useMemo(() => {
    const url = getPokemonImageFromId(pokemonId);
    return url;
  }, [pokemonId]);

  return (
    <a
      className="relative flex flex-col items-center gap-4 hover:text-primary h-32"
      href={`/pokemon/${pokemonId}`}
    >
      {isCaptured && (
        <p className="absolute text-xs top-0 right-[2rem] bg-white text-black">
          Capturado!
        </p>
      )}

      <Image
        className="h-20 w-20"
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
