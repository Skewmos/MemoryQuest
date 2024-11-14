import { Card, GameState } from "@/type/GameType";
import { useCallback } from "react";

const useCardGame = (gameState: GameState) => {
  const {
    level,
    setCards,
    setFlippedCards,
    setGameWon,
    setPairsFound,
    setTurns,
  } = gameState;

  const initializeGame = useCallback(() => {
    const numberOfPairs = level === "Facile" ? 4 : level === "Moyen" ? 5 : 10;
    let newCards: Card[] = [];

    for (let i = 0; i < numberOfPairs; i++) {
      newCards.push({
        id: i * 2,
        pairId: i,
        flipped: false,
        matched: false,
        error: false,
      });
      newCards.push({
        id: i * 2 + 1,
        pairId: i,
        flipped: false,
        matched: false,
        error: false,
      });
    }

    newCards = newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setTurns(0);
    setFlippedCards([]);
    setPairsFound(0);
    setGameWon(false);
  }, [level]);

  return {
    gameState,
    initializeGame,
  };
};

export default useCardGame;
