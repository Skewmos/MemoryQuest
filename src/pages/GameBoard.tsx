import Card from "@/components/Card";
import CongratulationsDialog from "@/components/CongratulationsDialog";
import PlayerInfo from "@/components/PlayerInfo";
import useCardGame from "@/hooks/useCardGame";
import useGameState from "@/hooks/useGameState";
import React, { useEffect } from "react";
import useCardLogic from "@/hooks/useCardLogic";
import { Level } from "@/type/GameType";

const GameBoard: React.FC = () => {

  const isValidLevel = (level: string | null): level is Level => {
    return level === "Facile" || level === "Moyen" || level === "Difficile";
  };
  
  const storedLevel = sessionStorage.getItem("level");
  const initialLevel: Level = isValidLevel(storedLevel) ? storedLevel : "Facile";

  const gameState = useGameState(initialLevel);

  const {
    initializeGame,
  } = useCardGame(gameState);

  const {
    cards,
    gameWon,
    level,
    pairsFound,
    setLevel,
    turns,
  } = gameState;

  const {
    bestScore,
    handleCardClick,
    setBestScore,
  } = useCardLogic(gameState);

  const username = sessionStorage.getItem("username") || "undifined";

  useEffect(() => {
    initializeGame();
    const savedBestScore = sessionStorage.getItem("bestScore");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <PlayerInfo level={level} playerName={username} setLevel={setLevel} />
      <h1 className="text-2xl font-bold mb-4">
        Jeu de Mémoire - Niveau {level}
      </h1>
      <p className="mb-2">Nombre de tours : {turns}</p>
      <p className="mb-2">Paires découvertes : {pairsFound}</p>
      {bestScore !== null && (
        <p className="mb-4 text-green-600">
          Meilleur score : {bestScore} tours
        </p>
      )}

      {gameWon ? (
        <CongratulationsDialog
          turns={turns}
          bestScore={bestScore}
          isGameCompleted={gameWon}
        />
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-5 gap-4`}>
          {cards.map((card) => (
            <Card card={card} handleCardClick={handleCardClick}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
