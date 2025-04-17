// Art object from the MET API
export interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  objectDate: string;
  department: string;
  culture: string;
  period: string;
  medium: string;
  dimensions: string;
  isPublicDomain: boolean;
}

// Game settings selected by the user
export interface GameSettings {
  difficulty: "easy" | "medium" | "hard";
  medium: string | null;
  country: string | null;
  yearStart: number | null;
  yearEnd: number | null;
}

// Game state
export interface GameState {
  score: number;
  lives: number;
  currentArtwork: ArtObject | null;
  options: ArtObject[]; // Multiple choice options
  correctOptionIndex: number; // Index of the correct option in the options array
  isLoading: boolean;
  gameOver: boolean;
  pixelationLevel: number;
  clue: "artist" | "year" | "title" | "location" | "timeperiod" | null;
  settings: GameSettings;
  canGuess: boolean; // Whether the user can submit a guess
  lastGuessResult: "correct" | "incorrect" | null; // Result of the last guess
}

export interface MetAPIResponse {
  total: number;
  objectIDs: number[];
}
