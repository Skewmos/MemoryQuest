import { Card, GameState } from "@/type/GameType";
import { useState } from "react";
import { Howl } from "howler";
import PokeballOpen from "@/assets/sound/PokeballOpen.mp3";

const useCardLogic = (gameState: GameState) => {
	const [showMismatch, setShowMismatch] = useState(false);
	const [bestScore, setBestScore] = useState<number | null>(null);
	const sound = new Howl({
		src: [PokeballOpen],
		html5: true,
	});

	const playSound = () => {
		sound.play();
	};

	const {
		cards,
		turns,
		flippedCards,
		setCards,
		setTurns,
		setFlippedCards,
		setPairsFound,
		setGameWon,
	} = gameState;

	const handleCardClick = (card: Card) => {
		if (flippedCards.length === 2 || card.flipped || card.matched) return;

		const newFlippedCards = [...flippedCards, { ...card, flipped: true }];
		const updatedCards = cards.map((c) =>
			c.id === card.id ? { ...c, flipped: true } : c,
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
			playSound();
			setCards((prevCards) =>
				prevCards.map((card) =>
					card.pairId === firstCard.pairId ? { ...card, matched: true } : card,
				),
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
						: card,
				),
			);

			setTimeout(() => {
				setShowMismatch(false);
				setCards((prevCards) =>
					prevCards.map((card) =>
						card.id === firstCard.id || card.id === secondCard.id
							? { ...card, flipped: false, error: false }
							: card,
					),
				);
				setFlippedCards([]);
			}, 1000);
		}
	};

	const updateBestScore = () => {
		if (bestScore === null || turns < bestScore) {
			setBestScore(turns);
			sessionStorage.setItem("bestScore", turns.toString());
		}
	};

	return {
		bestScore,
		checkForMatch,
		handleCardClick,
		setBestScore,
		showMismatch,
		updateBestScore,
	};
};

export default useCardLogic;
