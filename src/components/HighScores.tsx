import React, { useState, useEffect } from 'react';

interface HighScore {
  name: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  date: string;
}

interface HighScoresProps {
  currentScore?: number;
  onSaveScore?: (name: string) => void;
}

const HighScores: React.FC<HighScoresProps> = ({ 
  currentScore, 
  onSaveScore 
}) => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [activeTab, setActiveTab] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  // Load high scores from local storage
  useEffect(() => {
    const savedScores = localStorage.getItem('guessTheMet_highScores');
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores);
        setHighScores(parsedScores);
      } catch (e) {
        console.error('Failed to parse high scores:', e);
        setHighScores([]);
      }
    }
  }, []);
  
  // Save high score to local storage
  const saveHighScore = () => {
    if (!currentScore || !playerName.trim() || !onSaveScore) return;
    
    const newScore: HighScore = {
      name: playerName.trim(),
      score: currentScore,
      difficulty: activeTab,
      date: new Date().toLocaleDateString()
    };
    
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep only top 10 scores
    
    setHighScores(updatedScores);
    localStorage.setItem('guessTheMet_highScores', JSON.stringify(updatedScores));
    onSaveScore(playerName);
  };
  
  // Filter scores by difficulty
  const filteredScores = highScores.filter(score => score.difficulty === activeTab);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">High Scores</h2>
      
      {/* Difficulty tabs */}
      <div className="flex border-b mb-4">
        {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
          <button
            key={difficulty}
            className={`flex-1 py-2 font-medium ${
              activeTab === difficulty
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(difficulty)}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Save score form (if current score exists) */}
      {currentScore && onSaveScore && (
        <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-100">
          <p className="text-center mb-2">Your Score: <span className="font-bold">{currentScore}</span></p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="flex-grow p-2 border rounded"
              maxLength={15}
            />
            <button
              onClick={saveHighScore}
              disabled={!playerName.trim()}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Save
            </button>
          </div>
        </div>
      )}
      
      {/* High scores table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-right">Score</th>
              <th className="py-2 px-4 text-right hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredScores.length > 0 ? (
              filteredScores.map((score, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{score.name}</td>
                  <td className="py-2 px-4 text-right">{score.score.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right hidden sm:table-cell">{score.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No high scores yet for this difficulty level.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighScores;