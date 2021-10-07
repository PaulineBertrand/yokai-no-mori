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

export function winModal(playerName) {
    const winner = document.querySelector(".winnerName");
    const modal = document.querySelector(".win");
    const modalBackground = document.querySelector(".modal-background");
    const closeButton = document.querySelector(".win .close-button");
    const bigContainer = document.querySelector(".big-container");

    winner.textContent += `${playerName}`;
    modal.classList.add("active");
    modalBackground.classList.add("active");
    bigContainer.classList.add("disappear");

    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
        bigContainer.classList.remove("disappear");
    })
}

export function displayRules() {
    const modal = document.querySelector(".rules.modal");
    const modalBackground = document.querySelector(".rules.modal-background");
    const closeButton = document.querySelector(".rules .close-button");
    const bigContainer = document.querySelector(".big-container");

    modal.classList.add("active");
    modalBackground.classList.add("active");
    bigContainer.classList.add("disappear");

    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
        bigContainer.classList.remove("disappear");
    })
}