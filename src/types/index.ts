// Art object from the MET API
export interface ArtObject {
    objectID: number;
    primaryImage: string;
    title: string;
    artistDisplayName: string;
    objectDate: string;
    medium: string;
    country: string;
    department: string;
    classification: string;
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
    isLoading: boolean;
    gameOver: boolean;
    pixelationLevel: number;
    clue: "artist" | "year" | "title" | null;
    settings: GameSettings;
  }