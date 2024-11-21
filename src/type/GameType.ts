import useGameState from "@/hooks/useGameState";

export type Card = {
    error: boolean;
    flipped: boolean;
    id: number;
    matched: boolean;
    pairId: number;
    image: string;
};

export type BasicPokemon = {
  name: string;
  url: string;
}

export type PokemonDetail = {
  details: any;
}
  
export type Difficulty = 'Facile' | 'Moyen' | 'Difficile';

export type Level = {
  difficulty: Difficulty;
  pairs: number;
};

export type  Theme {
  name: string;
  image: string;
}

export type GameState = ReturnType<typeof useGameState>;
