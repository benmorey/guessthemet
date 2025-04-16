/**
 * Calculate the score for a correct guess based on difficulty and pixelation level
 * @param difficulty Game difficulty
 * @param pixelationLevel Current pixelation level (higher = more pixelated)
 * @returns Score for the guess
 */
export const calculateScore = (
    difficulty: 'easy' | 'medium' | 'hard',
    pixelationLevel: number
  ): number => {
    // Base score for each correct guess
    const baseScore = 100;
    
    // Difficulty multiplier
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2
    }[difficulty];
    
    // Pixelation bonus - more pixelated = harder to guess = higher score
    const pixelationBonus = pixelationLevel * 2;
    
    return Math.round(baseScore * difficultyMultiplier + pixelationBonus);
  };
  
  /**
   * Calculate total possible bonus based on game settings
   * @param settings Game settings
   * @returns Bonus multiplier
   */
  export const calculateSettingsBonus = (settings: {
    medium: string | null;
    country: string | null;
    yearStart: number | null;
    yearEnd: number | null;
  }): number => {
    let bonus = 1;
    
    // Add bonus for using more specific filters
    if (settings.medium) bonus += 0.1;
    if (settings.country) bonus += 0.1;
    if (settings.yearStart && settings.yearEnd) {
      // Smaller time range = bigger bonus
      const yearRange = settings.yearEnd - settings.yearStart;
      if (yearRange <= 50) bonus += 0.3;
      else if (yearRange <= 100) bonus += 0.2;
      else bonus += 0.1;
    }
    
    return bonus;
  };
  
  /**
   * Format the score with commas
   * @param score Number to format
   * @returns Formatted score string
   */
  export const formatScore = (score: number): string => {
    return score.toLocaleString();
  };