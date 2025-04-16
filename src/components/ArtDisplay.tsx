import React, { useState, useEffect } from 'react';
import { ArtObject } from '../types';

interface ArtDisplayProps {
  artwork: ArtObject | null;
  pixelationLevel: number;
  clueType: 'artist' | 'year' | 'title' | null;
  isLoading: boolean;
}

const ArtDisplay: React.FC<ArtDisplayProps> = ({ 
  artwork, 
  pixelationLevel, 
  clueType, 
  isLoading 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Reset image loaded state when artwork changes
    setImageLoaded(false);
  }, [artwork]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!artwork) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 rounded">
        <p className="text-gray-500">No artwork to display</p>
      </div>
    );
  }
  
  // Get clue text based on the clue type
  const getClueText = () => {
    if (!clueType || !artwork) return null;
    
    switch (clueType) {
      case 'artist':
        return `Artist: ${artwork.artistDisplayName || 'Unknown'}`;
      case 'year':
        return `Year: ${artwork.objectDate || 'Unknown'}`;
      case 'title':
        return `Title: ${artwork.title || 'Untitled'}`;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="relative">
        {/* Artwork Image with CSS pixelation filter */}
        <div 
          className="relative aspect-[4/3] w-full bg-gray-200 rounded overflow-hidden"
          style={{
            filter: `blur(${pixelationLevel}px)`,
            WebkitFilter: `blur(${pixelationLevel}px)`,
          }}
        >
          {artwork.primaryImage && (
            <img
              src={artwork.primaryImage}
              alt="Artwork to guess"
              className="w-full h-full object-contain"
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          )}
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        
        {/* Artwork clue */}
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <h3 className="font-bold text-blue-800">Clue:</h3>
          <p className="text-blue-700">{getClueText()}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtDisplay;