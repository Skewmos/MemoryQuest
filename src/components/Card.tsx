import { Card as CardGame } from "@/type/GameType";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import PokemonCard from "@/assets/pokemonBackCard.png";

type CardProps = {
	card: CardGame;
	handleCardClick: Function;
};

function getBackImage(themeName: string): string {
	switch (themeName) {
		case "Pokemon":
			return PokemonCard;

		default:
			return "https://via.placeholder.com/150";
	}
}
const Card: React.FC<CardProps> = ({ card, handleCardClick }) => {
	const theme = sessionStorage.getItem("selectedTheme") || "{}";
	const jsonTheme = JSON.parse(theme);
	const backImage = getBackImage(jsonTheme.name);

	return (
		<div
			key={card.id}
			className={twMerge(
				clsx(
					"w-60 h-60 flex items-center justify-center border rounded bg-cover bg-center",
					{
						"bg-green-500 text-white": card.matched,
						"bg-red-500 text-white": card.error,
						"bg-blue-500 text-white":
							card.flipped && !card.matched && !card.error,
						"bg-gray-200":
							!card.flipped && !card.matched && !card.error && !backImage,
					},
				),
			)}
			style={{
				backgroundImage:
					!card.flipped && !card.matched && !card.error && backImage
						? `url(${backImage})`
						: card.flipped || card.matched
							? `url(${card.image})`
							: "none",
			}}
			onClick={() => handleCardClick(card)}
		>
			{(card.flipped || card.matched) && (
				<img
					src={card.image}
					alt={`Card ${card.id}`}
					className="w-full h-full object-cover"
				/>
			)}
		</div>
	);
};

export default Card;
