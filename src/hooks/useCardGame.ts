import { Card, GameState, PokemonDetail, Theme } from "@/type/GameType";
import { useCallback } from "react";

const getImageForTheme = (
  theme: Theme | {},
  index: number,
  allPokemon: PokemonDetail[]
) => {

  switch (theme.name) {
    case "Pokemon":
      return (
        allPokemon[index]?.details.sprites.other["official-artwork"]
          .front_default
      );

    default:
      return "https://via.placeholder.com/150";
  }
};

const useCardGame = (gameState: GameState, allPokemon: PokemonDetail[]) => {
  const {
    level,
    setCards,
    setFlippedCards,
    setGameWon,
    setPairsFound,
    setTurns,
  } = gameState;

  const initializeGame = useCallback(() => {
    const numberOfPairs =
      level.difficulty === "Facile" ? 4 : level.difficulty === "Moyen" ? 6 : 10;
    let newCards: Card[] = [];
    const theme = sessionStorage.getItem("selectedTheme") || "{}";
    for (let i = 0; i < numberOfPairs; i++) {
      const image = getImageForTheme(JSON.parse(theme), i, allPokemon);
      newCards.push({
        id: i * 2,
        pairId: i,
        flipped: false,
        matched: false,
        error: false,
        image: image,
      });
      newCards.push({
        id: i * 2 + 1,
        pairId: i,
        flipped: false,
        matched: false,
        error: false,
        image: image,
      });
    }

    newCards = newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setTurns(0);
    setFlippedCards([]);
    setPairsFound(0);
    setGameWon(false);
  }, [
    allPokemon,
    level.difficulty,
    setCards,
    setFlippedCards,
    setGameWon,
    setPairsFound,
    setTurns,
  ]);

  return {
    gameState,
    initializeGame,
  };
};

export default useCardGame;
