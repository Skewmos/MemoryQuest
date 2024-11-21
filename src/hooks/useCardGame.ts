import { Card, GameState, PokemonDetail } from "@/type/GameType";
import { useCallback } from "react";

const getImageForTheme = (theme: string, index: number, allPokemon: PokemonDetail[]) => {

  switch (theme) {
    case 'Pokemon':
      return allPokemon[index]?.details.sprites.other['official-artwork'].front_default 
        || allPokemon[index]?.details.sprites.front_default 
        || "https://via.placeholder.com/150";
    
    case 'Star Wars':
      const starWarsImages = [
        "https://example.com/starwars1.jpg",
        "https://example.com/starwars2.jpg",
        "https://example.com/starwars3.jpg",
      ];
      return starWarsImages[index % starWarsImages.length];
    
    case 'Harry Potter':
      const harryPotterImages = [
        "https://example.com/harrypotter1.jpg",
        "https://example.com/harrypotter2.jpg",
        "https://example.com/harrypotter3.jpg",
      ];
      return harryPotterImages[index % harryPotterImages.length];
    
    default:
      return "https://via.placeholder.com/150";
  }
};

const useCardGame = (gameState: GameState, allPokemon: PokemonDetail[]) => {
  const {
    level,
    setCards,
    setFlippedCards,
    setGameWon,
    setPairsFound,
    setTurns,
  } = gameState;

  const initializeGame = useCallback(() => {
    const numberOfPairs = level.difficulty === "Facile" ? 4 : level.difficulty === "Moyen" ? 5 : 10;
    let newCards: Card[] = [];
    const theme = sessionStorage.getItem('selectedTheme') || 'non définie';
    
    for (let i = 0; i < numberOfPairs; i++) {
      const image = getImageForTheme(theme, i, allPokemon);
      newCards.push({
        id: i * 2,
        pairId: i,
        flipped: false,
        matched: false,
        error: false,
        image: image
      });
      newCards.push({
        id: i * 2 + 1,
        pairId: i,
        flipped: false,
        matched: false,
        error: false,
        image: image
      });
    }

    newCards = newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setTurns(0);
    setFlippedCards([]);
    setPairsFound(0);
    setGameWon(false);
  }, [level]);

  return {
    gameState,
    initializeGame,
  };
};

export default useCardGame;
