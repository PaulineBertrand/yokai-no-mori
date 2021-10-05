// This function is used by every move function to get rid of off-board positions -----------------------

export function removeOffLimits(positions) {
    let filteredPositions = [];
    // I could probably do this with a filter
    for (let i = 0; i < positions.length; i++) {
        if (positions[i][0] < 4 && positions[i][0] >= 0 && positions[i][1] < 3 && positions[i][1] >= 0) {
            filteredPositions.push(positions[i]);
        } 
    }
    return filteredPositions;
}


// Move functions ---------------------------------------------------------------------------------------
// Only the samurai and the kodama are asymmetrical and need player as an argument,
// but I'm having it on all functions for fluidity in index.js

export const moves = {
    kodama: moveKodama,
    kitsune: moveKitsune,
    koropokurru: moveKoropokurru,
    tanuki: moveTanuki,
    samurai: moveSamurai
};

export function moveKodama(position, player) {
    if (player === "player1") {
        return removeOffLimits([[position[0] - 1, position[1]]]);
    } else {
        return removeOffLimits([[position[0] + 1, position[1]]]);
    }
}

export function moveTanuki(position, player) {
    return removeOffLimits([[position[0] - 1, position[1]], [position[0] + 1, position[1]], [position[0], position[1] - 1], [position[0], position[1] + 1]]);
}

export function moveKitsune(position, player) {
    const positions = [];
    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j +=2) {
            positions.push([position[0]+i, position[1]+j]);
        }
    }
    return removeOffLimits(positions);
}

export function moveKoropokurru(position, player) {
    const positions = [];
    for (let i = -1; i < 2; i++) {
        positions.push([position[0] - 1, position[1] + i]);
        positions.push([position[0] + 1, position[1] + i]);
    }
    positions.push([position[0], position[1] - 1]);
    positions.push([position[0], position[1] + 1]);   
    
    return removeOffLimits(positions);
}

export function moveSamurai(position, player) {
    const positions = [];
    // There is probably a better way to do all this...
    if (player === "player1") {
        for (let i = -1; i < 2; i++) {
            positions.push([position[0] - 1, position[1] + i]);
        }
        positions.push([position[0], position[1] - 1]);
        positions.push([position[0], position[1] + 1]); 
        positions.push([position[0] + 1, position[1]]);
    }

    if (player === "player2") {
        for (let i = -1; i < 2; i++) {
            positions.push([position[0] + 1, position[1] + i]);
        }
        positions.push([position[0], position[1] - 1]);
        positions.push([position[0], position[1] + 1]); 
        positions.push([position[0] - 1, position[1]]);
    }
    
    return removeOffLimits(positions);
}


// This function shows the squares where the player can move his piece

export function showPossibleMovements(square) {
    // getting all the square attributes
    const player = square.getAttribute("player");
    const piece = square.getAttribute("content");
    const position = [Number(square.getAttribute('x')), Number(square.getAttribute('y'))];

    // determining all possible positions and giving them the class possible-movements
    const possiblePositions = moves[piece](position, player);
    possiblePositions.forEach ((possiblePosition) => {
        const possiblePositionSquare = document.querySelector(`[x=${CSS.escape(possiblePosition[0])}][y=${CSS.escape(possiblePosition[1])}]`);
        if (possiblePositionSquare.getAttribute("player") !== player) { 
            possiblePositionSquare.classList.add("possible-movements");
        };
        console.log(possiblePositions);
    });
}

// Check if a kodama has arrived at the end line and 
// transform it into a samurai

export function transformKodama(square) {
    const piece = square.getAttribute("content");
    const xPosition = Number(square.getAttribute("x"));
    const player = square.getAttribute("player");
    // the following is a big condition but basically it just tests whether a kodama has arrived to a finish line
    if ((piece === "kodama") && ((player === "player1" && xPosition === 0) || (player === "player2" && xPosition === 3))) {
        square.setAttribute("content", "samurai");
    }
}

// function createKing(currCamp) {
//     return {
//       camp: currCamp,
//       type: “king”,
//     };
//   }
//   function createQueen(currCamp) {
//     return {
//       type: “queen”,
//     };
//   }
//   /**
//    *
//    */
//   moveKing = () => {
//     return “i move like a king”;
//   };
//   moveQueen = () => {
//     return “im a moving queen”;
//   };
//   const queen1 = createQueen("red");
//   const updatedQueen = Object.assign(queen1, { move: moveQueen });
//   console.log(“--->“, updatedQueen.move());



// I think all the following commented code is useless

// Create a generic game piece -------------------------------------------------------------------------

// function createPiece(player, initialPosition) {
//     return {
//         player: player,
//         position: initialPosition
//     }
// }


// Create specific game pieces -------------------------------------------------------------------------

// function makeKodama(player, initialPosition) {
//     const piece = createPiece(player, initialPosition);
// }

// function makeKitsune(player, initialPosition) {
//     const piece = createPiece(player, initialPosition);
// }

// function makeTanuki(player, initialPosition) {
//     const piece = createPiece(player, initialPosition);
// }

// function makeKoropokurru(player, initialPosition) {
//     const piece = createPiece(player, initialPosition);
// }
