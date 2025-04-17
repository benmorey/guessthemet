import axios from "axios";
import { ArtObject, GameSettings, MetAPIResponse } from "../types";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to get a random artwork based on game settings
export const getRandomArtwork = async (
  settings: GameSettings
): Promise<ArtObject> => {
  try {
    // Build search parameters based on settings
    const searchParams = new URLSearchParams();
    searchParams.append("hasImages", "true"); // Only get objects with images

    if (settings.medium) {
      searchParams.append("medium", settings.medium);
    }

    if (settings.country) {
      searchParams.append("geoLocation", settings.country);
    }

    if (settings.yearStart && settings.yearEnd) {
      searchParams.append("dateBegin", settings.yearStart.toString());
      searchParams.append("dateEnd", settings.yearEnd.toString());
    }

    // Get list of object IDs matching the criteria
    const searchResponse = await axios.get<MetAPIResponse>(
      `${BASE_URL}/search?${searchParams.toString()}&q=*`
    );

    if (!searchResponse.data.total || !searchResponse.data.objectIDs?.length) {
      throw new Error("No artworks found matching the criteria");
    }

    // Get a random object ID from the results
    const randomObjectId = getRandomItem(searchResponse.data.objectIDs);

    // Get the full details of the random artwork
    const objectResponse = await axios.get<ArtObject>(
      `${BASE_URL}/objects/${randomObjectId}`
    );

    // Ensure the artwork has a primary image
    if (!objectResponse.data.primaryImage) {
      // If no image, try again recursively
      return getRandomArtwork(settings);
    }

    return objectResponse.data;
  } catch (error) {
    console.error("Error fetching random artwork:", error);
    throw error;
  }
};

// Function to get departments
export const getDepartments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/departments`);
    return response.data.departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
