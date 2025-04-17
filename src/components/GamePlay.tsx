import React, { useState, useEffect } from "react";
import { useGameState } from "../hooks/useGameState";
import { GameSettings, ArtObject } from "../types";
import GameSettingsComponent from "./GameSettings";
import ArtDisplay from "./ArtDisplay";
import LoadingScreen from "./LoadingScreen";

interface GamePlayProps {
  settings?: GameSettings;
  onGameOver?: (score: number) => void;
}

const defaultSettings: GameSettings = {
  difficulty: "medium",
  medium: null,
  country: null,
  yearStart: null,
  yearEnd: null,
};

const GamePlay: React.FC<GamePlayProps> = ({ settings, onGameOver }) => {
  const { gameState, startGame, handleCorrectGuess, handleIncorrectGuess } =
    useGameState();
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isDeblurred, setIsDeblurred] = useState(false);

  // Reset states when new artwork is loaded
  useEffect(() => {
    setSelectedOption(null);
    setShowCorrectAnswer(false);
    setIsDeblurred(false);
  }, [gameState.currentArtwork]);

  // Preload option images when options change
  useEffect(() => {
    if (gameState.options.length > 0) {
      // Reset progress when new options are loaded
      setLoadingProgress(0);

      // Calculate how much each image contributes to the total progress
      const totalImages = gameState.options.length + 1; // +1 for the main artwork
      const progressPerImage = 100 / totalImages;

      // Track how many images have been loaded
      let loadedCount = 0;

      // Check if main artwork is already loaded
      if (
        gameState.currentArtwork &&
        imagesLoaded[gameState.currentArtwork.objectID]
      ) {
        loadedCount++;
        setLoadingProgress(progressPerImage * loadedCount);
      }

      // Preload option images
      gameState.options.forEach((option) => {
        if (option.primaryImage) {
          // If already loaded, increment counter
          if (imagesLoaded[option.objectID]) {
            loadedCount++;
            setLoadingProgress(progressPerImage * loadedCount);
          } else {
            // Otherwise, load the image
            const img = new Image();
            img.onload = () => {
              setImagesLoaded((prev) => ({
                ...prev,
                [option.objectID]: true,
              }));
              loadedCount++;
              setLoadingProgress(progressPerImage * loadedCount);
            };
            img.src = option.primaryImage;
          }
        }
      });
    }
  }, [gameState.options, gameState.currentArtwork]);

  const handleStartGame = (settings: GameSettings) => {
    startGame(settings);
    setGameStarted(true);
    setSelectedOption(null);
    setShowCorrectAnswer(false);
    setIsDeblurred(false);
    setImagesLoaded({});
    setLoadingProgress(0);
  };

  const handleOptionSelect = (index: number) => {
    if (!gameState.canGuess) return;

    setSelectedOption(index);

    if (index === gameState.correctOptionIndex) {
      handleCorrectGuess();
      setShowCorrectAnswer(false);
      setIsDeblurred(true);
    } else {
      handleIncorrectGuess();
      setShowCorrectAnswer(true);
    }
  };

  const handleImageLoad = (objectID: number) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [objectID]: true,
    }));

    // Update progress when main artwork loads
    if (
      gameState.currentArtwork &&
      objectID === gameState.currentArtwork.objectID
    ) {
      const totalImages = gameState.options.length + 1;
      const progressPerImage = 100 / totalImages;
      const loadedCount = Object.keys(imagesLoaded).length + 1; // +1 for this image
      setLoadingProgress(progressPerImage * loadedCount);
    }
  };

  // Check if all images are loaded
  const allImagesLoaded = () => {
    if (!gameState.currentArtwork || gameState.options.length === 0)
      return false;

    // Check if the main artwork image is loaded
    if (!imagesLoaded[gameState.currentArtwork.objectID]) return false;

    // Check if all option images are loaded
    return gameState.options.every((option) => imagesLoaded[option.objectID]);
  };

  const getButtonClassName = (index: number) => {
    if (!gameState.canGuess) {
      if (showCorrectAnswer && index === gameState.correctOptionIndex) {
        return "bg-green-100 border border-green-500";
      }
      if (selectedOption === index) {
        return "bg-red-100 border border-red-500";
      }
      return "bg-gray-100";
    }

    if (selectedOption === index) {
      return index === gameState.correctOptionIndex
        ? "bg-green-100 border border-green-500"
        : "bg-red-100 border border-red-500";
    }

    return "bg-white border border-gray-300 hover:bg-gray-50";
  };

  const renderGameContent = () => {
    if (!gameStarted) {
      return <GameSettingsComponent onStartGame={handleStartGame} />;
    }

    if (gameState.gameOver) {
      return (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Game Over</h2>
          <p className="text-xl mb-4">Your final score: {gameState.score}</p>
          {gameState.currentArtwork && (
            <div className="mb-4">
              <p className="font-bold">The last artwork was:</p>
              <p>{gameState.currentArtwork.title}</p>
              <p>
                by{" "}
                {gameState.currentArtwork.artistDisplayName || "Unknown Artist"}
              </p>
              <img
                src={gameState.currentArtwork.primaryImage}
                alt={gameState.currentArtwork.title}
                className="max-h-64 mx-auto my-4"
              />
            </div>
          )}
          <button
            onClick={() => setGameStarted(false)}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      );
    }

    return (
      <div className="game-container">
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="text-lg font-bold text-white">
            Score: {gameState.score}
          </div>
          <div className="flex space-x-1">
            {[...Array(gameState.lives)].map((_, i) => (
              <span key={i} className="text-2xl">
                🤍
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="lg:w-3/4 w-full">
            {gameState.currentArtwork && (
              <div className="relative bg-white rounded-lg shadow-lg p-4">
                <ArtDisplay
                  artwork={gameState.currentArtwork}
                  pixelationLevel={isDeblurred ? 0 : gameState.pixelationLevel}
                  clueType={gameState.clue}
                  isLoading={gameState.isLoading}
                  onImageLoad={() =>
                    handleImageLoad(gameState.currentArtwork!.objectID)
                  }
                />
              </div>
            )}
          </div>

          <div className="lg:w-1/4 w-full lg:min-w-[300px]">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h3 className="text-lg font-bold mb-4">
                Select the correct artwork title:
              </h3>

              <div className="flex flex-col gap-2">
                {gameState.options.map((option, index) => (
                  <button
                    key={option.objectID}
                    onClick={() => handleOptionSelect(index)}
                    disabled={!gameState.canGuess}
                    className={`p-3 rounded text-left transition-colors ${getButtonClassName(
                      index
                    )}`}
                  >
                    {option.title}
                  </button>
                ))}
              </div>

              {gameState.lastGuessResult && (
                <div
                  className={`mt-4 p-4 rounded ${
                    gameState.lastGuessResult === "correct"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {gameState.lastGuessResult === "correct"
                    ? "Correct!"
                    : "Incorrect!"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#e4002b]">
      <div className="container mx-auto px-4 py-8 relative">
        {gameStarted && (gameState.isLoading || !allImagesLoaded()) && (
          <LoadingScreen />
        )}
        {renderGameContent()}
      </div>
    </div>
  );
};

export default GamePlay;
