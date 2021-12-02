// Create the board as an array
var gameBoard;

// Define tokens for each player
const humanPlayer = "O";
const computerPlayer = "X";

// Value to store number of moves
var moves = 0;

// Array of all winning combinations
const winningCombinations = [
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
var allGameCells = document.querySelectorAll(".game-cells");

// get the endgame section
var endGameContent = document.querySelector(".endgame-section");

var gameSection = document.querySelector(".game-section");

// Start game at the beginning
startGame();

// Function to start game
function startGame() {
  // reset number of moves
  moves = 0;
  // Remove/hide the endgame message and button
  endGameContent.style.display = "none";
  // Create the game board -> create array from 0 to 9
  gameBoard = Array.from(Array(9).keys());

  // prepare the game cells -> remove background , clear content and add event listener
  allGameCells.forEach((cell) => {
    // remove background
    cell.style.removeProperty("background-color");

    // clear content
    cell.innerText = "";

    // add event listener
    cell.addEventListener("click", playClick, false);
  });
}

// Handle  cell click for user
function playClick(cell) {
  // Add content to clicked cell
  playTurn(cell.target.id, humanPlayer);
}

// Function to handle click on cells on game turn for user and computer
function playTurn(cellId, player) {
  // increment moves
  moves++;
  // set the user to clicked cell
  gameBoard[cellId] = player;

  // display the token on the clicked cell
  var currentCell = document.getElementById(cellId);
  currentCell.innerText = player;

  let gameWon = checkWin(gameBoard, player);

  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);

  let gameWon = null;

  for (let [index, win] of winningCombinations.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }

  console.log(plays);
  return gameWon;
}

function gameOver(gameWon) {
  // Highlight every cell
  for (let index of winningCombinations[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === humanPlayer ? "green" : "red";
  }

  // remove click event listener
  allGameCells.forEach((cell) => {
    cell.removeEventListener("click", playClick, false);
  });

  // display game  over section
  endGameContent.style.display = "flex";
}
