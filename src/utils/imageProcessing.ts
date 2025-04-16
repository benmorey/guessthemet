// This utility provides functions to help with image processing,
// particularly for creating the pixelation effect for the artwork

// In a real implementation, we might use Canvas APIs to actually pixelate
// the image, but for our app we're using CSS blur filters for simplicity

/**
 * Calculate the appropriate pixelation level based on difficulty
 * @param difficulty Game difficulty setting
 * @returns Pixelation level (higher = more pixelated)
 */
export const getPixelationLevel = (
    difficulty: 'easy' | 'medium' | 'hard'
  ): number => {
    switch (difficulty) {
      case 'easy':
        return 15; // Less pixelated
      case 'medium':
        return 20;
      case 'hard':
        return 25; // More pixelated
      default:
        return 20;
    }
  };
  
  /**
   * Calculate the next pixelation level after a correct/incorrect guess
   * @param currentLevel Current pixelation level
   * @param correct Whether the guess was correct
   * @returns New pixelation level
   */
  export const getNextPixelationLevel = (
    currentLevel: number,
    correct: boolean
  ): number => {
    if (correct) {
      // If correct, make the next image harder (more pixelated)
      return Math.min(currentLevel + 2, 30);
    } else {
      // If incorrect, make the current image easier (less pixelated)
      return Math.max(currentLevel - 5, 5);
    }
  };
  
  /**
   * Checks if an image URL is valid and accessible
   * @param url Image URL to check
   * @returns Promise that resolves to boolean
   */
  export const isImageValid = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };