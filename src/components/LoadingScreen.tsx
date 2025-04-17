import React, { useState, useEffect } from "react";

const artFacts = [
  "The Mona Lisa has no eyebrows. It was the fashion in Renaissance Florence to shave them off.",
  "Vincent van Gogh only sold one painting during his lifetime.",
  "The largest art museum in the world is the Louvre in Paris, France.",
  "The most expensive painting ever sold was Leonardo da Vinci's 'Salvator Mundi' for $450.3 million.",
  "The Sistine Chapel ceiling took Michelangelo 4 years to paint.",
  "The oldest known cave paintings are over 40,000 years old.",
  "Pablo Picasso could draw before he could walk.",
  "The Statue of Liberty was originally copper-colored, not green.",
  "The first photograph ever taken was in 1826 by Joseph Nicéphore Niépce.",
  "The Metropolitan Museum of Art was founded in 1870.",
  "The most visited art museum in the world is the Louvre, with over 10 million visitors annually.",
  "The first selfie was taken in 1839 by Robert Cornelius.",
  "The world's largest painting is 'The Battle of Gettysburg', which measures 125 feet by 42 feet.",
  "The first art museum in America was the Wadsworth Atheneum, founded in 1842.",
  "The most stolen artwork in history is the 'Ghent Altarpiece', which has been stolen 7 times.",
];

const LoadingScreen: React.FC = () => {
  const [currentFact, setCurrentFact] = useState("");
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    // Set initial fact
    setCurrentFact(artFacts[0]);

    // Change fact every 5 seconds
    const interval = setInterval(() => {
      setFactIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % artFacts.length;
        setCurrentFact(artFacts[newIndex]);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-8"></div>

      <div className="max-w-2xl text-center">
        <p className="text-white text-xl mb-6">
          Loading artwork and options...
        </p>

        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-6">
          <h3 className="text-white text-lg font-semibold mb-2">
            Did You Know?
          </h3>
          <p className="text-white text-md italic">{currentFact}</p>
        </div>

        <div className="text-gray-300 text-sm">
          <p>
            The Metropolitan Museum of Art API is a free, open-source service.
          </p>
          <p>Loading times may vary as we're using their public API.</p>
          <p>Thank you for your patience while we fetch the artwork!</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
