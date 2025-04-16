import React, { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { GameSettings } from "../types";
import GameSettingsComponent from "./GameSettings";
import ArtDisplay from "./ArtDisplay";

interface GamePlayProps {
  settings?: GameSettings;
  onGameOver?: (score: number) => void;
}

const GamePlay: React.FC<GamePlayProps> = ({ settings, onGameOver }) => {
  const { gameState, startGame, handleCorrectGuess, handleIncorrectGuess } =
    useGameState();
  const [userGuess, setUserGuess] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(
    null
  );

  const handleStartGame = (settings: GameSettings) => {
    startGame(settings);
    setGameStarted(true);
    setShowResult(null);
  };

  const handleSubmitGuess = (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameState.currentArtwork || userGuess.trim() === "") return;

    // Normalize the guess and the actual title for comparison
    const normalizedGuess = userGuess.toLowerCase().trim();
    const normalizedTitle = gameState.currentArtwork.title.toLowerCase();

    // Check if the guess is correct (you can adjust how strict this check is)
    if (
      normalizedTitle.includes(normalizedGuess) ||
      normalizedGuess.includes(normalizedTitle)
    ) {
      setShowResult("correct");
      setTimeout(() => {
        handleCorrectGuess();
        setUserGuess("");
        setShowResult(null);
      }, 1500);
    } else {
      setShowResult("incorrect");
      setTimeout(() => {
        handleIncorrectGuess();
        setShowResult(null);
      }, 1500);
    }
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
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">Score: {gameState.score}</div>
          <div className="flex space-x-1">
            {[...Array(gameState.lives)].map((_, i) => (
              <span key={i} className="text-red-500 text-2xl">
                ❤️
              </span>
            ))}
            {[...Array(3 - gameState.lives)].map((_, i) => (
              <span key={i} className="text-gray-300 text-2xl">
                ❤️
              </span>
            ))}
          </div>
        </div>

        <ArtDisplay
          artwork={gameState.currentArtwork}
          pixelationLevel={gameState.pixelationLevel}
          clueType={gameState.clue}
          isLoading={gameState.isLoading}
        />

        <div className="mt-6">
          <form onSubmit={handleSubmitGuess}>
            <div className="flex">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter the artwork title..."
                className={`flex-grow p-2 border rounded-l ${
                  showResult === "correct"
                    ? "bg-green-50 border-green-500"
                    : showResult === "incorrect"
                    ? "bg-red-50 border-red-500"
                    : "border-gray-300"
                }`}
                disabled={gameState.isLoading || showResult !== null}
              />
              <button
                type="submit"
                className={`py-2 px-4 rounded-r ${
                  showResult === "correct"
                    ? "bg-green-500 text-white"
                    : showResult === "incorrect"
                    ? "bg-red-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={gameState.isLoading || showResult !== null}
              >
                {showResult === "correct"
                  ? "Correct!"
                  : showResult === "incorrect"
                  ? "Wrong!"
                  : "Guess"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">GuessTheMet</h1>
      {renderGameContent()}
    </div>
  );
};

export default GamePlay;
