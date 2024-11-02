import CongratulationsDialog from '@/components/CongratulationsDialog';
import React, { useEffect, useState } from 'react';

type Card = {
  id: number;
  pairId: number;
  flipped: boolean;
  matched: boolean;
  error: boolean;
};

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [pairsFound, setPairsFound] = useState(0);
  const [level, setLevel] = useState(sessionStorage.getItem('level') || 'Facile');
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [showMismatch, setShowMismatch] = useState(false);

  useEffect(() => {
    initializeGame();
    const savedBestScore = sessionStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, [level]);

  const initializeGame = () => {
    const numberOfPairs = level === 'Facile' ? 4 : level === 'Moyen' ? 5 : 10;
    let newCards: Card[] = [];

    for (let i = 0; i < numberOfPairs; i++) {
      newCards.push({ id: i * 2, pairId: i, flipped: false, matched: false, error: false });
      newCards.push({ id: i * 2 + 1, pairId: i, flipped: false, matched: false, error: false });
    }

    newCards = newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setTurns(0);
    setFlippedCards([]);
    setPairsFound(0);
    setGameWon(false);
  };

  const handleCardClick = (card: Card) => {
    if (flippedCards.length === 2 || card.flipped || card.matched) return;

    const newFlippedCards = [...flippedCards, { ...card, flipped: true }];
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTurns((prevTurns) => prevTurns + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (newFlippedCards: Card[]) => {
    const [firstCard, secondCard] = newFlippedCards;
  
    if (firstCard.pairId === secondCard.pairId) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.pairId === firstCard.pairId ? { ...card, matched: true } : card
        )
      );
      setFlippedCards([]);
      setPairsFound((prevPairsFound) => {
        const newPairsFound = prevPairsFound + 1;
        if (newPairsFound === cards.length / 2) {
          setGameWon(true);
          updateBestScore();
        }
        return newPairsFound;
      });
    } else {
      setShowMismatch(true);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, error: true }
            : card
        )
      );
  
      setTimeout(() => {
        setShowMismatch(false);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false, error: false }
              : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const updateBestScore = () => {
    if (bestScore === null || turns < bestScore) {
      setBestScore(turns);
      sessionStorage.setItem('bestScore', turns.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Jeu de Mémoire - Niveau {level}</h1>
      <p className="mb-2">Nombre de tours : {turns}</p>
      <p className="mb-2">Paires découvertes : {pairsFound}</p>
      {bestScore !== null && (
        <p className="mb-4 text-green-600">Meilleur score : {bestScore} tours</p>
      )}

      {gameWon ? (
         <CongratulationsDialog turns={turns} bestScore={bestScore} isGameCompleted={gameWon} />
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-5 gap-4`}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-20 h-20 flex items-center justify-center border rounded ${
                card.matched
                ? 'bg-green-500 text-white'
                : card.error
                ? 'bg-red-500 text-white' 
                : card.flipped
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
              }`}
              onClick={() => handleCardClick(card)}
            >
              {card.flipped || card.matched ? card.pairId : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
