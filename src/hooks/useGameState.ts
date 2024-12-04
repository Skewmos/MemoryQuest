import { Card, Difficulty, Level } from "@/type/GameType";
import { useState } from "react";

const DIFFICULTY_PAIRS: Record<Difficulty, number> = {
  'Facile': 4,
  'Moyen': 6,
  'Difficile': 10
};

export function getLevel(difficulty: Difficulty): Level {
  return {
    difficulty,
    pairs: DIFFICULTY_PAIRS[difficulty]
  };
}

const useGameState = (initialLevel: Difficulty) => {
  
    const [level, setLevel] = useState<Level>(getLevel(initialLevel));
    const [cards, setCards] = useState<Card[]>([]);
    const [turns, setTurns] = useState(0);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [pairsFound, setPairsFound] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const resetGame = () => {
        setCards([]);
        setTurns(0);
        setFlippedCards([]);
        setPairsFound(0);
        setGameWon(false);
      };

      return {
        cards,
        flippedCards, 
        gameWon, 
        level,
        pairsFound, 
        resetGame,
        setCards,
        setFlippedCards,
        setGameWon,
        setLevel,
        setPairsFound,
        setTurns,
        turns,
      }
};

export default useGameState;