import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Determine if a nav link is active
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className="bg-blue-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold mb-2 sm:mb-0">
          GuessTheMet
        </Link>
        
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link 
                to="/" 
                className={`hover:underline py-1 px-2 rounded ${
                  isActive('/') ? 'bg-blue-700' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/play" 
                className={`hover:underline py-1 px-2 rounded ${
                  isActive('/play') ? 'bg-blue-700' : ''
                }`}
              >
                Play
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`hover:underline py-1 px-2 rounded ${
                  isActive('/about') ? 'bg-blue-700' : ''
                }`}
              >
                How to Play
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;