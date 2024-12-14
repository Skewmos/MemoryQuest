import Card from "@/components/Card";
import CongratulationsDialog from "@/components/CongratulationsDialog";
import PlayerInfo from "@/components/PlayerInfo";
import useCardGame from "@/hooks/useCardGame";
import useGameState from "@/hooks/useGameState";
import React, { useEffect } from "react";
import useCardLogic from "@/hooks/useCardLogic";
import { Difficulty } from "@/type/GameType";
import usePokemonApi from "@/hooks/usePokemonApi";
import Loader from "@/components/Loader";
import Button from "../components/Button";

const GameBoard: React.FC = () => {
	const isValidLevel = (level: string | null): level is Difficulty => {
		return level === "Facile" || level === "Moyen" || level === "Difficile";
	};
	const storedLevel = sessionStorage.getItem("level");
	const initialLevel: Difficulty = isValidLevel(storedLevel)
		? storedLevel
		: "Facile";
	const gameState = useGameState(initialLevel);
	const { allPokemon, loading, error, isReady } = usePokemonApi(gameState);
	const { initializeGame } = useCardGame(gameState, allPokemon);
	const { cards, gameWon, level, pairsFound, setLevel, turns } = gameState;
	const { bestScore, handleCardClick, setBestScore } = useCardLogic(gameState);
	const username = sessionStorage.getItem("username") || "undefined";
	const gridClasses = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4`;
	
	const replay = () => {
		window.location.reload();
	}

	useEffect(() => {
		const savedBestScore = sessionStorage.getItem("bestScore");
		if (savedBestScore) {
			setBestScore(parseInt(savedBestScore, 10));
		}
	}, [setBestScore]);

	useEffect(() => {
		if (isReady && allPokemon.length > 0) {
			initializeGame();
		}
	}, [isReady, allPokemon, initializeGame]);

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Loader />
			</div>
		);
	}

	if (error) {
		return <div>Erreur : {error}</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
			<PlayerInfo level={level} playerName={username} setLevel={setLevel} />
			<div className="mt-10 pt-10">
				<p className="mb-2">Nombre de tours : {turns}</p>
				<p className="mb-2">Paires découvertes : {pairsFound}</p>
				{bestScore !== null && (
					<p className="mb-4 text-green-600">
						Meilleur score : {bestScore} tours
					</p>
				)}
				{gameWon && 	<Button
				onClick={replay}
				label="Rejouer une partie"
				className={"bg-rose-600 hover:bg-rose-900"}
			></Button>}
			
			</div>

			{gameWon ? (
				<CongratulationsDialog
					turns={turns}
					bestScore={bestScore}
					isGameCompleted={gameWon}
				/>
			) : (
				<div className={`grid ${gridClasses} gap-4`}>
					{loading ? (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100vh",
							}}
						>
							<Loader />
						</div>
					) : (
						cards.map((card) => (
							<Card
								key={card.id}
								card={card}
								handleCardClick={handleCardClick}
							/>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default GameBoard;
