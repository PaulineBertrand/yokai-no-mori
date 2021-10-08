import * as pieces from "./pieces.js";
import * as board from "./board.js";
import * as players from "./players.js";

// -----------------------------------------------------------------------------

const allSquares = document.querySelectorAll(".square");
let player1Reserve = document.querySelector(".player1.reserve");
let player2Reserve = document.querySelector(".player2.reserve");
player1Reserve.innerHTML = "";
player2Reserve.innerHTML = "";
let currentPlayer = "";

//------------------------------------------------------------------------------

function newGame() {

    // Setting up the board
    board.setXandY(allSquares);
    board.setUpBoard(allSquares);

    player1Reserve.innerHTML = "";
    player2Reserve.innerHTML = "";

    // initializing variables and getting some HTML locations

    let boardPieceIsSelected = false;
    let reservePieceIsSelected = false;
    let activePiece = "";

    const namePlayer1 = document.querySelector(".player-1-name");
    const namePlayer2 = document.querySelector(".player-2-name");
    namePlayer1.textContent = "";
    namePlayer2.textContent = "";

    players.player1.name = "";
    players.player2.name = "";

    // I need these for player name choice
    currentPlayer = "";
    const chosenParagraph = document.querySelector(".random-message");
    chosenParagraph.textContent ="";

        // Modal window
        const modal = document.querySelector(".name.modal");
        const modalBackground = document.querySelector(".name.modal-background");
        const closeButton = document.querySelector(".name .close-button");
        const bigContainer = document.querySelector(".big-container");

        modal.classList.add("active");
        modalBackground.classList.add("active");
        bigContainer.classList.add("disappear");

         // Managing and displaying inputs/names
         let input1 = document.querySelector(".input1")
         let input2 = document.querySelector(".input2")

        closeButton.addEventListener('click', () => {
            modal.classList.remove("active");
            modalBackground.classList.remove("active");
            bigContainer.classList.remove("disappear");
            input1.value = "";
            input2.value = "";
        })    
    
       

        input1.addEventListener('input', (event) => {
                players.player1.name = input1.value;
                namePlayer1.innerText = players.player1.name;
        })

        input2.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                players.player2.name = input2.value;
                namePlayer2.innerText = players.player2.name;
                currentPlayer = "player" + String(Math.floor(Math.random()*2 + 1));
                let player = (currentPlayer === "player1" ? players.player1.name : players.player2.name);
                chosenParagraph.textContent = `${player} will start this round!`;
            }
        })


    
    //------------------------------------------------------------------------------

    // Deciding what to do after a square on the board is clicked

    function squareClicked(event) {
        const square = event.target; 
        const position = [square.getAttribute("x"), square.getAttribute("y")];
        const piece = square.getAttribute("content");

        // First we check whether it's the first or second click / whether a piece has been selected
        if (!boardPieceIsSelected && !reservePieceIsSelected) {
            if (board.checkIsEmpty(square) || board.checkEnemyPiece(currentPlayer, square)) {
                console.log(currentPlayer)
                players.errorMessage(`${(currentPlayer === "player1" ? players.player1.name : players.player2.name)}`);

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
        console.log(activePiece)

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
        };

        // remove the piece from the reserve
        const reserve = document.querySelector(`.${player}.reserve`)
        reserve.removeChild(reserveSquare);

        // then update relevant variables for end of turm
        activePiece = null;
        currentPlayer = players.changeTurn(currentPlayer);
        let timeoutID = setTimeout(() => reservePieceIsSelected = false, 500);
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
                players.winModal(`${players.player1.name}`)
                board.setXandY(allSquares);
                board.setUpBoard(allSquares);
                player1Reserve.innerHTML = "";
                player2Reserve.innerHTML = "";
                namePlayer1.textContent = "";
                namePlayer2.textContent = "";

            };
            if (activePlayer === "player2" && Number(newSquare.getAttribute("x")) === 3) {
                players.winModal(`${players.player2.name}`)
                board.setXandY(allSquares);
                board.setUpBoard(allSquares);
                player1Reserve.innerHTML = "";
                player2Reserve.innerHTML = "";
                namePlayer1.textContent = "";
                namePlayer2.textContent = "";
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

        // And of course move the piece
        movePiece(formerSquare, newSquare);
        
        // (check whether the game just ended!!!)
        if (piece === "koropokurru") {
            players.winModal(`${(eater === "player1" ? players.player1.name : players.player2.name)}`)
            board.setXandY(allSquares);
            board.setUpBoard(allSquares);
            player1Reserve.innerHTML = "";
            player2Reserve.innerHTML = "";
            namePlayer1.textContent = "";
            namePlayer2.textContent = "";  

        }

        // Finally, put an event listener on it 
        reserveSquare.addEventListener('click', reserveSquareClicked);
    }

    // -------------------------------------------------------------------------------------

    // listening to clicks on the board

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            let htmlSquare = document.querySelector(`.square[x=${CSS.escape(i)}][y=${CSS.escape(j)}]`);
            htmlSquare.addEventListener('click', squareClicked);
        }
    }
}


// the rules should appear when we click the button

const rulesButton = document.querySelector(".rules-button");
rulesButton.addEventListener('click', players.displayRules)

// Launch a new game when the button is clicked

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener('click', newGame);