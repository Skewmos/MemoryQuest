import { Card as CardGame } from "@/type/GameType";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
    card: CardGame,
    handleCardClick: Function
  };

const Card: React.FC<CardProps> = ({card, handleCardClick}) => {
    return (
      <div
        key={card.id}
        className={twMerge(
          clsx("w-20 h-20 flex items-center justify-center border rounded", {
            "bg-green-500 text-white": card.matched,
            "bg-red-500 text-white": card.error,
            "bg-blue-500 text-white":
              card.flipped && !card.matched && !card.error,
            "bg-gray-200": !card.flipped && !card.matched && !card.error,
          })
        )}
        onClick={() => handleCardClick(card)}
      >
        {card.flipped || card.matched ? card.pairId : ""}
      </div>
    );
};

export default Card;