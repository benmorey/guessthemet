import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>GuessTheMet - Art guessing game using the Metropolitan Museum of Art API</p>
        <p className="text-sm mt-2">
          Created for IS 542 - Not affiliated with The Metropolitan Museum of Art
        </p>
        <div className="mt-4 text-sm text-gray-400">
          <p>
            Artwork data provided by{' '}
            <a 
              href="https://metmuseum.github.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              The Metropolitan Museum of Art Collection API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;