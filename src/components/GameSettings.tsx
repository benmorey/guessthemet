import React, { useState, useEffect } from 'react';
import { GameSettings } from '../types';
import { getDepartments } from '../services/metAPIService';

interface GameSettingsProps {
  onStartGame: (settings: GameSettings) => void;
}

const GameSettingsComponent: React.FC<GameSettingsProps> = ({ onStartGame }) => {
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'medium',
    medium: null,
    country: null,
    yearStart: null,
    yearEnd: null
  });
  
  const [departments, setDepartments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample countries (you could expand this list)
  const countries = [
    'United States', 'Italy', 'France', 'China', 'Japan', 
    'Egypt', 'Greece', 'India', 'United Kingdom', 'Spain'
  ];
  
  // Sample mediums (you could fetch these from the API)
  const mediums = [
    'Paintings', 'Sculpture', 'Drawings', 'Photographs', 
    'Ceramics', 'Textiles', 'Prints', 'Armor', 'Furniture'
  ];
  
  useEffect(() => {
    // Load departments from API
    const loadDepartments = async () => {
      setIsLoading(true);
      try {
        const depts = await getDepartments();
        setDepartments(depts);
      } catch (error) {
        console.error('Failed to load departments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDepartments();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'yearStart' || name === 'yearEnd') {
      setSettings(prev => ({
        ...prev,
        [name]: value ? parseInt(value) : null
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value || null
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(settings);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Game Settings</h2>
      
      {isLoading ? (
        <p className="text-center">Loading options...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Difficulty Level</label>
            <select 
              name="difficulty"
              value={settings.difficulty}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Medium (Optional)</label>
            <select 
              name="medium"
              value={settings.medium || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Any Medium</option>
              {mediums.map(medium => (
                <option key={medium} value={medium}>{medium}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country of Origin (Optional)</label>
            <select 
              name="country"
              value={settings.country || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Any Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Year Start</label>
              <input 
                type="number"
                name="yearStart"
                value={settings.yearStart || ''}
                onChange={handleChange}
                placeholder="e.g. 1500"
                className="w-full p-2 border rounded"
                min="-3000"
                max="2023"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Year End</label>
              <input 
                type="number"
                name="yearEnd"
                value={settings.yearEnd || ''}
                onChange={handleChange}
                placeholder="e.g. 1900"
                className="w-full p-2 border rounded"
                min="-3000"
                max="2023"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Start Game
          </button>
        </form>
      )}
    </div>
  );
};

export default GameSettingsComponent;