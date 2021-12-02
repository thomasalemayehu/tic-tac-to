// Create the board as an array
var gameBoard;

// Define tokens for each player
const humanPlayer = "O";
const computerPlayer = "X";

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

// End game section
var gameSection = document.querySelector(".game-section");

// End game message
var endgameMessage = document.querySelector(".endgame-message");

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
  // check if cell is already in use
  if (typeof gameBoard[cell.target.id] == "number") {
    //  Add content to clicked cell
    playTurn(cell.target.id, humanPlayer);

    if (!checkWin(gameBoard, humanPlayer) && !checkTie()) {
      playTurn(bestSpot(), computerPlayer);
    }
  }
}

// Function to handle click on cells on game turn for user and computer
function playTurn(cellId, player) {
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

  declareWinner(gameWon.player == humanPlayer ? "You win!" : "You lose!");
}

function bestSpot() {
  return minimax(gameBoard, computerPlayer).index;
}

function getEmptyCells() {
  return gameBoard.filter((cell) => typeof cell == "number");
}

function checkTie() {
  if (getEmptyCells().length == 0) {
    allGameCells.forEach((cell) => {
      cell.style.backgroundColor = "yellow";
      cell.removeEventListener("click", playClick, false);
    });

    declareWinner("Tie Game");
    return true;
  }
  return false;
}

function declareWinner(winner) {
  endgameMessage.innerText = winner;
}

function minimax(newBoard, player) {
  var availSpots = getEmptyCells();

  if (checkWin(newBoard, humanPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, computerPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == computerPlayer) {
      var result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, computerPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === computerPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
