export function changeTurn(player) {
    return (player === "player1" ? "player2" : "player1");
}

// these probably don't need to be objects, might change them later

export let player1 = {
    name: ""
}

export let player2 = {
    name: ""
}

export function winModal(playerName) {
    const winner = document.querySelector(".winnerName");
    const modal = document.querySelector(".win");
    const modalBackground = document.querySelector(".modal-background");
    const closeButton = document.querySelector(".win .close-button");
    const bigContainer = document.querySelector(".big-container");

    winner.textContent = `${playerName}`;
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

    modal.classList.add("active");
    modalBackground.classList.add("active");
    

    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    })
}

export function errorMessage(playerName) {
    const errorMessage = document.querySelector(".error-message");
    const errorPlayer = document.querySelector(".error-player");

    errorPlayer.textContent = playerName;
    errorMessage.classList.add("active")
    let timeID = setTimeout(() => {errorMessage.classList.remove("active")}, 1000);
}


