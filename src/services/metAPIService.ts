import axios from 'axios';
import { ArtObject, GameSettings } from '../types';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Function to get a random artwork based on filters
export const getRandomArtwork = async (settings: GameSettings): Promise<ArtObject | null> => {
  try {
    // Start with a basic search query
    let searchQuery = 'hasImages=true';
    
    // Add medium filter if selected
    if (settings.medium) {
      searchQuery += `&medium=${encodeURIComponent(settings.medium)}`;
    }
    
    // Add country filter if selected
    if (settings.country) {
      searchQuery += `&geoLocation=${encodeURIComponent(settings.country)}`;
    }
    
    // Add date range if selected
    if (settings.yearStart && settings.yearEnd) {
      searchQuery += `&dateBegin=${settings.yearStart}&dateEnd=${settings.yearEnd}`;
    }
    
    // Get object IDs matching our criteria
    const response = await axios.get(`${BASE_URL}/search?${searchQuery}`);
    
    if (response.data.total === 0 || !response.data.objectIDs) {
      console.error('No artworks found matching criteria');
      return null;
    }
    
    // Select a random object ID from the results
    const randomIndex = Math.floor(Math.random() * response.data.objectIDs.length);
    const objectId = response.data.objectIDs[randomIndex];
    
    // Get the details for this object
    const objectResponse = await axios.get(`${BASE_URL}/objects/${objectId}`);
    
    // Return object only if it has a primary image
    if (objectResponse.data.primaryImage) {
      return objectResponse.data;
    } else {
      // Recursively try again if this object doesn't have an image
      return getRandomArtwork(settings);
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return null;
  }
};

// Function to get departments/categories for filtering options
export const getDepartments = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/departments`);
    return response.data.departments.map((dept: any) => dept.displayName);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};