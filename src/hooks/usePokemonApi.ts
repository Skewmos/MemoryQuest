import { useState, useEffect } from 'react';
import { GameState, PokemonDetail } from '@/type/GameType'; // Assurez-vous que ces types sont correctement importés

const usePokemonApi = (gameState: GameState) => {
  const [allPokemon, setAllPokemon] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchRandomPokemon = async (count: number) => {
      try {
        setLoading(true);
        
        // Obtenir le nombre total de Pokémon
        const totalResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
        const totalData = await totalResponse.json();
        const totalPokemon = totalData.count;

        // Générer des IDs aléatoires uniques
        const randomIds = new Set<number>();
        while (randomIds.size < count) {
          randomIds.add(Math.floor(Math.random() * totalPokemon) + 1);
        }

        // Récupérer les détails des Pokémon aléatoires
        const pokemonDetails = await Promise.all(
          Array.from(randomIds).map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonDetail = await response.json();
            return {
              name: pokemonDetail.name,
              details: pokemonDetail,
            };
          })
        );

        setAllPokemon(pokemonDetails);
        setIsReady(true);
      } catch (err) {
        setError("Erreur lors de la récupération des Pokémon");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPokemon(gameState.level.pairs);
  }, [gameState.level.pairs]);

  return { allPokemon, loading, error, isReady };
};

export default usePokemonApi;