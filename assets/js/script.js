// import
import * as functions from "./functions.js";
import * as constants from "./constants.js";

constants.endgameButton.addEventListener("click", functions.startGame);

constants.restartButton.addEventListener("click", functions.startGame);

// Initially run the start game function
functions.startGame();
