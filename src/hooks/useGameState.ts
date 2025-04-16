import { useState, useEffect } from 'react';
import { GameState, GameSettings, ArtObject } from '../types';
import { getRandomArtwork } from '../services/metAPIService';

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  lives: 3,
  currentArtwork: null,
  isLoading: false,
  gameOver: false,
  pixelationLevel: 20, // Starting pixelation level (higher = more pixelated)
  clue: null,
  settings: {
    difficulty: 'medium',
    medium: null,
    country: null,
    yearStart: null,
    yearEnd: null
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  // Initialize a new game with the given settings
  const startGame = async (settings: GameSettings) => {
    setGameState({
      ...INITIAL_GAME_STATE,
      settings,
      isLoading: true
    });
    
    // Determine pixelation level based on difficulty
    let pixelationLevel = 20; // medium difficulty
    if (settings.difficulty === 'easy') pixelationLevel = 15;
    if (settings.difficulty === 'hard') pixelationLevel = 25;
    
    // Set clue type based on random selection
    const clueTypes: ("artist" | "year" | "title")[] = ['artist', 'year', 'title'];
    const randomClue = clueTypes[Math.floor(Math.random() * clueTypes.length)];
    
    try {
      const artwork = await getRandomArtwork(settings);
      setGameState(prevState => ({
        ...prevState,
        currentArtwork: artwork,
        isLoading: false,
        pixelationLevel,
        clue: randomClue
      }));
    } catch (error) {
      console.error('Failed to start game:', error);
      setGameState(prevState => ({
        ...prevState,
        isLoading: false,
        gameOver: true
      }));
    }
  };

  // Load the next artwork
  const loadNextArtwork = async () => {
    setGameState(prevState => ({
      ...prevState,
      isLoading: true
    }));
    
    // Get new clue type
    const clueTypes: ("artist" | "year" | "title")[] = ['artist', 'year', 'title'];
    const randomClue = clueTypes[Math.floor(Math.random() * clueTypes.length)];
    
    try {
      const artwork = await getRandomArtwork(gameState.settings);
      setGameState(prevState => ({
        ...prevState,
        currentArtwork: artwork,
        isLoading: false,
        clue: randomClue
      }));
    } catch (error) {
      console.error('Failed to load next artwork:', error);
      setGameState(prevState => ({
        ...prevState,
        isLoading: false
      }));
    }
  };

  // Handle a correct guess
  const handleCorrectGuess = () => {
    // Decrease pixelation for next round to make it harder
    const newPixelationLevel = Math.max(gameState.pixelationLevel - 2, 5);
    
    setGameState(prevState => ({
      ...prevState,
      score: prevState.score + calculateScore(prevState.settings.difficulty, prevState.pixelationLevel),
      pixelationLevel: newPixelationLevel
    }));
    
    // Load next artwork
    loadNextArtwork();
  };

  // Handle an incorrect guess
  const handleIncorrectGuess = () => {
    // Decrease pixelation to make current artwork easier to guess
    const newPixelationLevel = Math.max(gameState.pixelationLevel - 5, 5);
    
    if (gameState.lives <= 1) {
      // Game over
      setGameState(prevState => ({
        ...prevState,
        lives: 0,
        gameOver: true,
        pixelationLevel: 0 // Show full image
      }));
    } else {
      // Lose a life but continue
      setGameState(prevState => ({
        ...prevState,
        lives: prevState.lives - 1,
        pixelationLevel: newPixelationLevel
      }));
    }
  };

  // Calculate score based on difficulty and pixelation
  const calculateScore = (difficulty: 'easy' | 'medium' | 'hard', pixelation: number): number => {
    const baseScore = 100;
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
    const pixelationBonus = pixelation * 2; // Higher pixelation = higher score
    
    return Math.round(baseScore * difficultyMultiplier + pixelationBonus);
  };

  return {
    gameState,
    startGame,
    handleCorrectGuess,
    handleIncorrectGuess,
    loadNextArtwork
  };
};