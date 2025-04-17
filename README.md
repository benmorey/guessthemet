# Guess The Met 🎨

A fun and interactive game that challenges players to guess artworks from The Metropolitan Museum of Art's extensive collection. Test your art knowledge while learning about various masterpieces from one of the world's most prestigious museums.

## Project Description

Guess The Met is a React-based web application that presents players with pixelated or partially obscured artworks from The Met's collection. Players must guess the correct artwork title from multiple options, with the image becoming clearer as they progress or when they guess correctly. The game features different difficulty levels and provides interesting art facts during loading screens.

## Instructions to Run the Project

1. **Prerequisites**

   - Node.js (v14 or higher)
   - npm or yarn package manager

2. **Installation**

   ```bash
   # Clone the repository
   git clone [your-repository-url]

   # Navigate to the project directory
   cd guessthemet

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Running the Project**
   ```bash
   # Start the development server
   npm start
   # or
   yarn start
   ```
   The application will be available at `http://localhost:3000`

## API Integration

The project uses The Metropolitan Museum of Art Collection API:

- **Base URL**: `https://collectionapi.metmuseum.org/public/collection/v1`
- **API Documentation**: [The Met Collection API](https://metmuseum.github.io/)

### Data Handling

- Artwork data is fetched dynamically using the Met's public API
- Search parameters can be customized based on:
  - Medium
  - Geographic location
  - Time period
- Images are preloaded to ensure smooth gameplay
- The API is rate-limited and free to use, which is reflected in the loading screen messaging

## Features

### Core Gameplay

- Multiple choice artwork guessing game
- Progressive difficulty levels
- Score tracking system
- Lives system
- Pixelated image reveal system

### Visual Features

- Responsive design with side-by-side layout for larger screens
- Met-themed color scheme (signature red background)
- Smooth transitions and animations
- Loading screen with rotating art facts
- Clear visual feedback for correct/incorrect answers

### Game Mechanics

- Image deblurring on correct guesses
- Multiple choice options
- Clue system showing artwork location/department
- Sticky answer panel for better user experience

### Additional Features

1. **Dynamic Loading Screen**

   - Displays interesting art facts while loading
   - Explains API response times
   - Maintains user engagement during loading periods

2. **Adaptive Layout**

   - Responsive design for all screen sizes
   - Optimized image display for various artwork dimensions
   - Side-panel answer system for better visibility

3. **Visual Feedback**

   - Color-coded responses for correct/incorrect answers
   - Progressive image reveal system
   - Lives display with themed hearts
   - Score tracking

4. **Game Settings**
   - Customizable difficulty levels
   - Adjustable game parameters
   - Various artwork categories and time periods

## Future Enhancements

- User accounts and high scores
- Social sharing features
- Additional game modes
- Achievement system
- Detailed artwork information after each round
- Custom difficulty settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- The Metropolitan Museum of Art for providing the open API
- Professor Liddle
