export function changeTurn(player) {
    return (player === "player1" ? "player2" : "player1");
}

// these probably don't need to be objects, might change them later

export let player1 = {
    name: "Alice"
}

export let player2 = {
    name: "Bob"
}

