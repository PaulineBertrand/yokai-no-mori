import * as pieces from "./pieces.js";
import * as board from "./board.js";
import * as players from "./players.js";


//------------------------------------------------------------------------------

// Setting up the board
const allSquares = document.querySelectorAll(".square");
board.setXandY(allSquares);
board.setUpBoard(allSquares);

//
// getting players names, displaying them and deciding which player starts
players.player1.name = prompt("Please enter your name. We will decide who starts at random.");
players.player2.name = prompt("Please enter the name for the other player");

const namePlayer1 = document.querySelector(".player-1-name");
const namePlayer2 = document.querySelector(".player-2-name");
namePlayer1.textContent = players.player1.name;
namePlayer2.textContent = players.player2.name;

let currentPlayer = "player" + String(Math.floor(Math.random()*2 + 1));
alert(`${players[currentPlayer]["name"]} will start this time`);

// initializing variables and getting some HTML locations

let boardPieceIsSelected = false;
let reservePieceIsSelected = false;
let activePiece;

const player1Reserve = document.querySelector(".player1.reserve");
const player2Reserve = document.querySelector(".player2.reserve");

//------------------------------------------------------------------------------

// Deciding what to do after a square on the board is clicked

function squareClicked(event) {
    const square = event.target; 
    const position = [square.getAttribute("x"), square.getAttribute("y")];
    const piece = square.getAttribute("content");

    // First we check whether it's the first or second click / whether a piece has been selected
    if (!boardPieceIsSelected && !reservePieceIsSelected) {
        if (board.checkIsEmpty(square) || board.checkEnemyPiece(currentPlayer, square)) {
            alert(`${players[currentPlayer]["name"]}, please select one of your pieces!`);

        } else {
            boardPieceIsSelected = true;
            activePiece = square;
            pieces.showPossibleMovements(square);
        }

    } else if (square.classList.contains("possible-movements")) { 
        if (board.checkIsEmpty(square)) {
            movePiece(activePiece, square);
            currentPlayer = players.changeTurn(currentPlayer);
            boardPieceIsSelected = false;
            activePiece = null;

        } else {
            eatPiece(activePiece, square);
            currentPlayer = players.changeTurn(currentPlayer);
            boardPieceIsSelected = false;
            activePiece = null;
        }
        
    } else if (reservePieceIsSelected) {
        landOnBoard(activePiece, square);

    } else {
        // here we assume that if the player clicks outside of the highlighted scope, s.he wants to let go of the selected piece 
        boardPieceIsSelected = false;
        activePiece = null;
        board.cleanAllPossibleMovementClasses();
    }
}

// A reserve square has been clicked!! What to do ???

function reserveSquareClicked(event) {
    reservePieceIsSelected = true;
    activePiece = event.target;
}


// adding a captured piece on the board after it has been selected

function landOnBoard(reserveSquare, square) {
    // get some info
    const player = reserveSquare.getAttribute("player");
    const piece = reserveSquare.getAttribute("content");
    // const possibleLandingLocations = document.querySelectorAll([content="empty"]);
    
    // check for player error and land the piece if s.he clicked correctly
    if (square.getAttribute('content') === "empty") {
        square.setAttribute("content", piece);
        square.setAttribute("player", player);
    } else {
        alert("Please click on an empty square")
    };

    // remove the piece from the reserve
    const reserve = document.querySelector(`.${player}.reserve`)
    reserve.removeChild(reserveSquare);

    // then update relevant variables for end of turm
    activePiece = null;
    currentPlayer = players.changeTurn(currentPlayer);
    reservePieceIsSelected = false;
}



// moving a board piece after it has been selected

function movePiece(formerSquare, newSquare) {
    // the piece moves
    const piece = formerSquare.getAttribute("content");
    formerSquare.setAttribute("content", "empty")
    newSquare.setAttribute("content", piece);

    // managing the player classes
    const activePlayer = formerSquare.getAttribute("player");
    formerSquare.setAttribute("player", "noplayer");
    newSquare.setAttribute("player", activePlayer);

    // check if there is a victory by Koropokurru to the finish line
    if (piece === "koropokurru") {
        if (activePlayer === "player1" && Number(newSquare.getAttribute("x")) === 0) {
            alert(`Congratulations!! ${players[activePlayer]["name"]} has won!!`);
        };
        if (activePlayer === "player2" && Number(newSquare.getAttribute("x")) === 3) {
            alert(`Congratulations!! ${players[activePlayer]["name"]} has won!!`);
        };
    };

    // also check whether a Kodama transforms into a Samurai
    pieces.transformKodama(newSquare);

    // removing the possible movements
    board.cleanAllPossibleMovementClasses();
}

function eatPiece(formerSquare, newSquare) {
    // get the characteristics of the piece...
    const eater = formerSquare.getAttribute("player");
    const piece = newSquare.getAttribute("content");

    // (check whether the game just ended!!!)
    if (piece === "koropokurru") {
        alert(`Congratulations! ${players[currentPlayer]["name"]} has won`)
    }

    // ...and put them in a div...
    const reserveSquare = document.createElement("div");
    reserveSquare.classList.add("reserve-square");
    reserveSquare.setAttribute("player", eater);
    reserveSquare.setAttribute("content", piece);
    // ...that goes in the correct reserve
    if (eater === "player1") {
        player1Reserve.appendChild(reserveSquare);
    } else {
        player2Reserve.appendChild(reserveSquare);
    }

    // Finally, put an event listener on it 
    reserveSquare.addEventListener('click', reserveSquareClicked);

    // And of course move the piece
    movePiece(formerSquare, newSquare);
    
}

function newGame() {
    board.setXandY(allSquares);
    board.setUpBoard(allSquares);
    player1Reserve.innerHTML = "";
    player2Reserve.innerHTML = "";
    boardPieceIsSelected = false;
    reservePieceIsSelected = false;
    activePiece = null;
    currentPlayer = "player" + String(Math.floor(Math.random()*2 + 1));
    alert(`${players[currentPlayer]["name"]} will start this time`);
}


// -------------------------------------------------------------------------------------

// listening to clicks on the board

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
        let htmlSquare = document.querySelector(`.square[x=${CSS.escape(i)}][y=${CSS.escape(j)}]`);
        htmlSquare.addEventListener('click', squareClicked);
    }
}

// the rules should appear when we click the button

const rulesButton = document.querySelector(".rules");
rulesButton.addEventListener('click', () => alert(`
This game is inspired by the Shogi, often called "japanese chess". Shogi is very similar to chess - except that you can return captured pieces to the board as your own. \n 
Here are the rules to this simplified version : \n
1. The goal is to capture the enemy Koropokurru. \n
2. The way each piece moves is indicated on it. To move a piece, select it and click on its destination. \n
3. If you capture a piece, it appears in the reserve and becomes available for you to put on an empty square at any point (but of course during your turn).
`))

// Launch a new game when the button is clicked

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener('click', newGame);