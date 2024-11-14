import { Card, Level } from "@/type/GameType";
import { useState } from "react";

const useGameState = (initialLevel: Level) => {
    const [level, setLevel] = useState<Level>(initialLevel);
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