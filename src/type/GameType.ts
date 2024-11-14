import useGameState from "@/hooks/useGameState";

export type Card = {
    error: boolean;
    flipped: boolean;
    id: number;
    matched: boolean;
    pairId: number;
  };
  
export type Level = 'Facile' | 'Moyen' | 'Difficile';

export type GameState = ReturnType<typeof useGameState>;
