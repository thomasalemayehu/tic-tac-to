// Define tokens for each player
export const humanPlayer = "O";
export const aiPlayer = "X";

// Array of all winning combinations
export const winningCombinations = [
  // Horizontal Winning Combination
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical Winning Combination
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal Winning Combinations
  [0, 4, 8],
  [2, 4, 6],
];

// get all game box cells
export var allGameCells = document.querySelectorAll(".game-cells");

// get endgame message
export var endgameMessage = document.querySelector(".endgame-message");

// get endgame button
export var endgameButton = document.querySelector(".endgame-button");

// get restart button
export var restartButton = document.querySelector(".restart-button");
