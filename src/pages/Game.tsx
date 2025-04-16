import React, { useState } from "react";
import GameSettingsComponent from "../components/GameSettings";
import GamePlay from "../components/GamePlay";
import HighScores from "../components/HighScores";
import { GameSettings } from "../types";

const Game: React.FC = () => {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [settings, setSettings] = useState<GameSettings | null>(null);

  const handleStartGame = (gameSettings: GameSettings) => {
    setSettings(gameSettings);
    setGameInProgress(true);
    setFinalScore(null);
    setScoreSubmitted(false);
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameInProgress(false);
  };

  const handleSaveScore = (name: string) => {
    console.log(`Score saved for ${name}: ${finalScore}`);
    setScoreSubmitted(true);
  };

  const handlePlayAgain = () => {
    setGameInProgress(false);
    setFinalScore(null);
    setScoreSubmitted(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">GuessTheMet</h1>

      {!gameInProgress && !finalScore && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <GameSettingsComponent onStartGame={handleStartGame} />
          </div>
          <div>
            <HighScores />
          </div>
        </div>
      )}

      {gameInProgress && (
        <GamePlay settings={settings!} onGameOver={handleGameOver} />
      )}

      {!gameInProgress && finalScore !== null && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Game Over</h2>
            <p className="text-xl mb-4 text-center">
              Your final score:{" "}
              <span className="font-bold">{finalScore.toLocaleString()}</span>
            </p>

            <div className="flex justify-center mt-8">
              <button
                onClick={handlePlayAgain}
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
              >
                Play Again
              </button>
            </div>
          </div>

          <div>
            <HighScores
              currentScore={finalScore}
              onSaveScore={handleSaveScore}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
