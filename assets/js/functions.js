// import constants
import * as constants from "./constants.js";

// Represents the game board
var gameBoard;
startGame();
// Define start game function
function startGame() {
  // hide the endgame button and message
  constants.endgameButton.style.display = "none";
  constants.endgameMessage.style.display = "none";

  constants.restartButton.style.display = "block";

  constants.allGameCells.forEach((cell) => {
    //   clear the content of all the cells
    cell.innerText = "";

    // clear background color of all the cells
    cell.style.removeProperty("background-color");

    //   add click listeners to all the cells
    cell.addEventListener("click", playCellClick);
  });
  //   create the game board
  gameBoard = Array.from(Array(9).keys());
}

// function to find available spots
function getEmptyCells() {
  return gameBoard.filter((cell) => typeof cell == "number");
}

function pickBestSpot() {
  return minimaxPick(gameBoard, constants.aiPlayer).index;
}
// Function to handle user cell click
function playCellClick(cell) {
  // check if call is free/ not occupied
  if (typeof gameBoard[cell.target.id] == "number") {
    //   Handle the turn
    playTurn(cell.target.id, constants.humanPlayer);
    //   check for a win or tie before ai plays
    if (!checkWin(gameBoard, constants.humanPlayer) && !checkTie()) {
      // Call for ai turn
      playTurn(pickBestSpot(), constants.aiPlayer);
    }
  }
}

// Function to play turn
function playTurn(cellId, player) {
  // set the player token to game board
  gameBoard[cellId] = player;

  //   Display the token on the position
  var currentCell = document.getElementById(cellId);
  currentCell.innerText = player;

  //   Check for game win
  let gameWon = checkWin(gameBoard, player);

  //   if game has been won call game over
  if (gameWon) gameOver(gameWon);
}

// Function to check win
function checkWin(board, player) {
  // find every index that player has played in
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);

  let gameWon = null;

  //   Compare each entry to the winning combination enrty
  for (let [index, win] of constants.winningCombinations.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

// Function to handle game over
function gameOver(gameWon) {
  // Highlight every cell with a background
  for (let index of constants.winningCombinations[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === constants.humanPlayer ? "green" : "red";
  }

  // remove click event listener
  constants.allGameCells.forEach((cell) => {
    cell.removeEventListener("click", playCellClick, false);
  });

  declareWinner(
    gameWon.player == constants.humanPlayer ? "You win!" : "You lose!"
  );
}

// Function to check for a tie
function checkTie() {
  if (getEmptyCells().length == 0) {
    constants.allGameCells.forEach((cell) => {
      cell.style.backgroundColor = "yellow";
      cell.removeEventListener("click", playCellClick, false);
    });

    declareWinner("Tie Game");
    return true;
  }
  return false;
}

function declareWinner(winner) {
  // display game  over message and section
  constants.endgameButton.style.display = "flex";
  constants.endgameMessage.innerText = winner;
  constants.endgameMessage.style.display = "flex";
  constants.restartButton.style.display = "none";
}

// Function to pick ai moves
function minimaxPick(gameBoard, player) {
  // get all available spots
  var availableSpots = getEmptyCells();

  //   check terminal state and return value
  if (checkWin(gameBoard, constants.humanPlayer)) {
    return { score: -10 };
  } else if (checkWin(gameBoard, constants.aiPlayer)) {
    return { score: 10 };
  } else if (availableSpots.length == 0) {
    return { score: 0 };
  }

  //   Store all the possible moves as move objects
  var allMoves = [];
  availableSpots.forEach((spot) => {
    var move = {};
    move.index = gameBoard[spot];
    gameBoard[spot] = player;

    if (player == constants.aiPlayer) {
      var result = minimaxPick(gameBoard, constants.humanPlayer);
      move.score = result.score;
    } else {
      var result = minimaxPick(gameBoard, constants.aiPlayer);
      move.score = result.score;
    }

    gameBoard[spot] = move.index;

    allMoves.push(move);
  });

  var bestMove;

  if (player === constants.aiPlayer) {
    var bestScore = -Infinity;
    for (var i = 0; i < allMoves.length; i++) {
      if (allMoves[i].score > bestScore) {
        bestScore = allMoves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = Infinity;
    for (var i = 0; i < allMoves.length; i++) {
      if (allMoves[i].score < bestScore) {
        bestScore = allMoves[i].score;
        bestMove = i;
      }
    }
  }
  return allMoves[bestMove];
}
export { startGame };
