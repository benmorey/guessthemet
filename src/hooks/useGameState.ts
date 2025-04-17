import { useState, useEffect } from "react";
import { GameState, GameSettings, ArtObject } from "../types";
import { getRandomArtwork } from "../services/metAPIService";

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  lives: 3,
  currentArtwork: null,
  options: [],
  correctOptionIndex: 0,
  isLoading: false,
  gameOver: false,
  pixelationLevel: 20, // Starting pixelation level (higher = more pixelated)
  clue: null,
  settings: {
    difficulty: "medium",
    medium: null,
    country: null,
    yearStart: null,
    yearEnd: null,
  },
  canGuess: true,
  lastGuessResult: null,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  // Initialize a new game with the given settings
  const startGame = async (settings: GameSettings) => {
    setGameState({
      ...INITIAL_GAME_STATE,
      settings,
      isLoading: true,
    });

    // Determine pixelation level based on difficulty
    let pixelationLevel = 20; // medium difficulty
    if (settings.difficulty === "easy") pixelationLevel = 15;
    if (settings.difficulty === "hard") pixelationLevel = 25;

    // Set clue type based on difficulty
    let clueType:
      | "artist"
      | "year"
      | "title"
      | "location"
      | "timeperiod"
      | null = null;

    if (settings.difficulty === "easy" || settings.difficulty === "medium") {
      // For easy and medium, randomly choose between location and time period hints
      clueType = Math.random() > 0.5 ? "location" : "timeperiod";
    }
    // For hard mode, no clues are provided

    try {
      // Get the correct artwork
      const correctArtwork = await getRandomArtwork(settings);

      // Get additional options based on difficulty
      const numOptions =
        settings.difficulty === "easy"
          ? 3
          : settings.difficulty === "medium"
          ? 5
          : 10;

      // We need numOptions - 1 additional artworks (since we already have the correct one)
      const additionalOptions: ArtObject[] = [];

      for (let i = 0; i < numOptions - 1; i++) {
        try {
          const artwork = await getRandomArtwork(settings);
          // Make sure we don't get the same artwork twice
          if (artwork.objectID !== correctArtwork.objectID) {
            additionalOptions.push(artwork);
          } else {
            // If we got the same artwork, try again
            i--;
          }
        } catch (error) {
          console.error("Failed to fetch additional artwork:", error);
          // Continue with fewer options if needed
        }
      }

      // Combine correct artwork with additional options
      const allOptions = [correctArtwork, ...additionalOptions];

      // Shuffle the options
      const shuffledOptions = shuffleArray(allOptions);

      // Find the index of the correct artwork in the shuffled array
      const correctIndex = shuffledOptions.findIndex(
        (artwork) => artwork.objectID === correctArtwork.objectID
      );

      setGameState((prevState) => ({
        ...prevState,
        currentArtwork: correctArtwork,
        options: shuffledOptions,
        correctOptionIndex: correctIndex,
        isLoading: false,
        pixelationLevel,
        clue: clueType,
        canGuess: true,
        lastGuessResult: null,
      }));
    } catch (error) {
      console.error("Failed to start game:", error);
      setGameState((prevState) => ({
        ...prevState,
        isLoading: false,
        gameOver: true,
      }));
    }
  };

  // Load the next artwork
  const loadNextArtwork = async () => {
    setGameState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    // Set clue type based on difficulty
    let clueType:
      | "artist"
      | "year"
      | "title"
      | "location"
      | "timeperiod"
      | null = null;

    if (
      gameState.settings.difficulty === "easy" ||
      gameState.settings.difficulty === "medium"
    ) {
      // For easy and medium, randomly choose between location and time period hints
      clueType = Math.random() > 0.5 ? "location" : "timeperiod";
    }
    // For hard mode, no clues are provided

    try {
      // Get the correct artwork
      const correctArtwork = await getRandomArtwork(gameState.settings);

      // Get additional options based on difficulty
      const numOptions =
        gameState.settings.difficulty === "easy"
          ? 3
          : gameState.settings.difficulty === "medium"
          ? 5
          : 10;

      // We need numOptions - 1 additional artworks (since we already have the correct one)
      const additionalOptions: ArtObject[] = [];

      for (let i = 0; i < numOptions - 1; i++) {
        try {
          const artwork = await getRandomArtwork(gameState.settings);
          // Make sure we don't get the same artwork twice
          if (artwork.objectID !== correctArtwork.objectID) {
            additionalOptions.push(artwork);
          } else {
            // If we got the same artwork, try again
            i--;
          }
        } catch (error) {
          console.error("Failed to fetch additional artwork:", error);
          // Continue with fewer options if needed
        }
      }

      // Combine correct artwork with additional options
      const allOptions = [correctArtwork, ...additionalOptions];

      // Shuffle the options
      const shuffledOptions = shuffleArray(allOptions);

      // Find the index of the correct artwork in the shuffled array
      const correctIndex = shuffledOptions.findIndex(
        (artwork) => artwork.objectID === correctArtwork.objectID
      );

      setGameState((prevState) => ({
        ...prevState,
        currentArtwork: correctArtwork,
        options: shuffledOptions,
        correctOptionIndex: correctIndex,
        isLoading: false,
        clue: clueType,
        canGuess: true,
        lastGuessResult: null,
      }));
    } catch (error) {
      console.error("Failed to load next artwork:", error);
      setGameState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  // Handle a correct guess
  const handleCorrectGuess = () => {
    // Decrease pixelation for next round to make it harder
    const newPixelationLevel = Math.max(gameState.pixelationLevel - 2, 5);

    setGameState((prevState) => ({
      ...prevState,
      score:
        prevState.score +
        calculateScore(
          prevState.settings.difficulty,
          prevState.pixelationLevel
        ),
      pixelationLevel: newPixelationLevel,
      lastGuessResult: "correct",
    }));

    // Load next artwork after a delay
    setTimeout(() => {
      loadNextArtwork();
    }, 1500);
  };

  // Handle an incorrect guess
  const handleIncorrectGuess = () => {
    // Decrease pixelation to make current artwork easier to guess
    const newPixelationLevel = Math.max(gameState.pixelationLevel - 5, 5);

    if (gameState.lives <= 1) {
      // Game over
      setGameState((prevState) => ({
        ...prevState,
        lives: 0,
        gameOver: true,
        pixelationLevel: 0, // Show full image
        canGuess: false,
        lastGuessResult: "incorrect",
      }));
    } else {
      // Lose a life but continue
      setGameState((prevState) => ({
        ...prevState,
        lives: prevState.lives - 1,
        pixelationLevel: newPixelationLevel,
        canGuess: false,
        lastGuessResult: "incorrect",
      }));

      // Re-enable guessing after a delay
      setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          canGuess: true,
          lastGuessResult: null,
        }));
      }, 1500);
    }
  };

  // Calculate score based on difficulty and pixelation
  const calculateScore = (
    difficulty: "easy" | "medium" | "hard",
    pixelation: number
  ): number => {
    const baseScore = 100;
    const difficultyMultiplier =
      difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2;
    const pixelationBonus = pixelation * 2; // Higher pixelation = higher score

    return Math.round(baseScore * difficultyMultiplier + pixelationBonus);
  };

  // Helper function to shuffle an array
  const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
    gameState,
    startGame,
    handleCorrectGuess,
    handleIncorrectGuess,
    loadNextArtwork,
  };
};
