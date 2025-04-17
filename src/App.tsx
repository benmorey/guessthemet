import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GamePlay from "./components/GamePlay";
import { getRandomArtwork } from "./services/metAPIService";
import { ArtObject } from "./types";
import HomePage from "./components/HomePage";

// Simple Home component
const Home: React.FC = () => {
  const [randomArtwork, setRandomArtwork] = useState<ArtObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRandomArtwork = async () => {
    try {
      const artwork = await getRandomArtwork({
        difficulty: "medium",
        medium: null,
        country: null,
        yearStart: null,
        yearEnd: null,
      });
      setRandomArtwork(artwork);
    } catch (error) {
      console.error("Error loading random artwork:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRandomArtwork();
    // Set up interval to change artwork every 3 seconds
    const interval = setInterval(loadRandomArtwork, 3000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-red-600 text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl text-center">
        <h1 className="text-4xl font-serif mb-12">How keen is your eye?</h1>

        <div className="flex justify-center items-start gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 w-96 aspect-square flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <p className="text-black text-xl">Loading...</p>
            ) : randomArtwork ? (
              <img
                src={randomArtwork.primaryImage}
                alt="Random artwork from The Met"
                className="w-full h-full object-contain transition-opacity duration-500"
                style={{ opacity: isLoading ? 0 : 1 }}
              />
            ) : (
              <p className="text-black text-xl">Failed to load artwork</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-8 w-96 aspect-square flex items-center justify-center">
            <div className="text-center text-black space-y-4">
              <h2 className="font-serif mb-4">Rules of the Game:</h2>
              <ol className="space-y-2">
                <li>
                  1. You have to guess the artwork based on the colors and bits
                  that are exposed.
                </li>
                <li>2. You'll have three tries until you're out</li>
                <li>3. The more you guess, the longer your streak</li>
              </ol>
            </div>
          </div>
        </div>

        <Link
          to="/play"
          className="inline-block bg-black text-white py-3 px-12 rounded-full hover:bg-gray-900 transition"
        >
          play now
        </Link>
      </div>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <header className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-serif">
              GUESS THE MET
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/play" className="hover:underline">
                    PLAY
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/guessthemet" element={<HomePage />} />
            <Route path="/play" element={<GamePlay />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
