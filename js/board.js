// Setting up the board -------------------------------------------------------

export function setXandY(allSquares) {
    for (let i = 0; i < 12; i++) {
       allSquares[i].setAttribute("x", Math.floor(i/3));
       allSquares[i].setAttribute("y", i%3);
       allSquares[i].setAttribute("content", "empty");
       allSquares[i].setAttribute("player", "noplayer")
    }
}

export function setUpBoard(allSquares) {
    // All pieces
    const squareA0 = document.querySelector(".square[x='0'][y='0']");
    const squareD2 = document.querySelector(`.square[x="3"][y="2"]`);
    squareA0.setAttribute("content", "tanuki");
    squareD2.setAttribute("content", "tanuki");

    const squareA1 = document.querySelector(`.square[x="0"][y="1"]`);
    const squareD1 = document.querySelector(`.square[x="3"][y="1"]`);
    squareA1.setAttribute("content", "koropokurru");
    squareD1.setAttribute("content", "koropokurru");

    const squareA2 = document.querySelector(`.square[x="0"][y="2"]`);
    const squareD0 = document.querySelector(`.square[x="3"][y="0"]`);
    squareA2.setAttribute("content", "kitsune");
    squareD0.setAttribute("content", "kitsune");

    const squareB1 = document.querySelector(`.square[x="1"][y="1"]`);
    const squareC1 = document.querySelector(`.square[x="2"][y="1"]`);
    squareB1.setAttribute("content", "kodama");
    squareC1.setAttribute("content", "kodama");

    // All player classes

    squareD0.setAttribute("player", "player1");
    squareD1.setAttribute("player", "player1");
    squareD2.setAttribute("player", "player1");
    squareC1.setAttribute("player", "player1");

    squareA0.setAttribute("player", "player2");
    squareA1.setAttribute("player", "player2");
    squareA2.setAttribute("player", "player2");
    squareB1.setAttribute("player", "player2");
}

// Checking & updating various states of the squares -------------------------------------
export function checkIsEmpty(square) {
    return (square.getAttribute("content") === "empty");
}

export function checkEnemyPiece(player, square) {
    // I could just have one function tell me whether the piece is ally, enemy or there is no piece
    return (player !== square.getAttribute("player"));
};

export function cleanAllPossibleMovementClasses() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => square.classList.remove("possible-movements"));
}