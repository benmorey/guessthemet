import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GamePlay from "./components/GamePlay";

// Simple Home component
const Home: React.FC = () => (
  <div className="min-h-screen bg-red-600 text-white">
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-4xl font-serif mb-12">How keen is your eye?</h1>

      <div className="bg-white rounded-lg p-8 mb-12 aspect-square flex items-center justify-center">
        <p className="text-black text-xl">random portrait</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-black font-serif mb-4">Rules of the Game:</h2>
          <ol className="text-left text-black space-y-2">
            <li>
              1. You have to guess the artwork based on the colors and bits that
              are exposed.
            </li>
            <li>2. You'll have three tries until you're out</li>
            <li>3. The more you guess, the longer your streak</li>
          </ol>
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

// About page component
const About: React.FC = () => (
  <div className="min-h-screen bg-red-600 text-white">
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-4">select your game mode</h1>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <label className="text-xl">level:</label>
          <div className="w-64">
            <select className="w-full p-2 rounded-lg bg-white text-black">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xl">mediums:</label>
          <div className="w-64">
            <select className="w-full p-2 rounded-lg bg-white text-black">
              <option>All</option>
              <option>Paintings</option>
              <option>Sculptures</option>
              <option>Photographs</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xl">artist's country:</label>
          <div className="w-64">
            <select className="w-full p-2 rounded-lg bg-white text-black">
              <option>All</option>
              <option>France</option>
              <option>Italy</option>
              <option>Netherlands</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xl">years:</label>
          <div className="w-64">
            <input type="range" className="w-full" min="1400" max="2023" />
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/play"
            className="inline-block bg-black text-white py-3 px-12 rounded-full hover:bg-gray-900 transition"
          >
            play now
          </Link>
        </div>
      </div>
    </div>
  </div>
);

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
                  <Link to="/about" className="hover:underline">
                    ABOUT
                  </Link>
                </li>
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
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<GamePlay />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
