import { useState, useCallback } from 'react';
import { ArtObject, GameSettings } from '../types';
import { getRandomArtwork, getDepartments } from '../services/metAPIService';

interface MetApiState {
  isLoading: boolean;
  error: string | null;
  departments: string[];
}

export const useMetApi = () => {
  const [state, setState] = useState<MetApiState>({
    isLoading: false,
    error: null,
    departments: []
  });
  
  // Fetch random artwork based on settings
  const fetchRandomArtwork = useCallback(async (settings: GameSettings): Promise<ArtObject | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const artwork = await getRandomArtwork(settings);
      setState(prev => ({ ...prev, isLoading: false }));
      return artwork;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage
      }));
      return null;
    }
  }, []);
  
  // Fetch departments for filtering
  const fetchDepartments = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const departments = await getDepartments();
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        departments 
      }));
      return departments;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage
      }));
      return [];
    }
  }, []);
  
  return {
    ...state,
    fetchRandomArtwork,
    fetchDepartments
  };
};