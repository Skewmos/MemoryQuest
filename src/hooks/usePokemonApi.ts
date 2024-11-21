import { useEffect, useState } from "react";
import {PokemonDetail } from "./../type/GameType";
import { GameState } from "@/type/GameType";

const usePokemonApi = (gameState: GameState) => {
  const [allPokemon, setAllPokemon] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchPokemon = async (limit: number) => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
            const jsonResponse = await response.json();
            const pokemonDetails = await Promise.all(
              jsonResponse.results.map(async (pokemon: { name: string, url: string }) => {
                const detailResponse = await fetch(pokemon.url);
                const pokemonDetail = await detailResponse.json();
                return {
                  name: pokemon.name,
                  details: pokemonDetail
                };
              })
            );
            setAllPokemon(pokemonDetails);
            setIsReady(true);
          } catch (err) {
            setError('Erreur lors de la récupération des Pokémon');
          } finally {
            setLoading(false);
          }
    };

    fetchPokemon(gameState.level.pairs)
  }, []);

  return { allPokemon, loading, error, isReady };
};

export default usePokemonApi;
