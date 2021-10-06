let player1;
let player2;
export const players = [player1, player2];

// The 5 following functions all come together in dealingWithNames

function displayNameModal(modal, modalBackground) {
    const nameInputs = modal.querySelectorAll("input");

    // switching the modal on with classes
    modal.classList.add("active");
    modalBackground.classList.add("active");
}

function implementCloseButton(closeButton, modal, modalBackground) {
    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    })
}

function getNamesInfo() {
    player1 = document.querySelector(".name-1-input").value;
    player2 = document.querySelector(".name-2-input").value; 
    return [player1, player2];
}

function displayNameInfo() {
    const namePlayer1Location = document.querySelector(".player-1-name");
    const namePlayer2Location = document.querySelector(".player-2-name");

    namePlayer1Location.textContent = `${player1}`;
    namePlayer2Location.textContent = `${player2}`;
}

modal.classList.remove("active");
modalBackground.classList.remove("active");

currentPlayer = [player1, player2][Math.floor(Math.random()*2)];
console.log('player inside getNamesInfo', currentPlayer)

export function displayChosenPlayer(player) {

    // getting useful nodes
    const modal = document.querySelector(".random.modal");
    const modalBackground = document.querySelector(".random-modal-background");
    const closeButton = document.querySelector(".random-modal-background .close-button");
    const paragraph = document.querySelector(".random-modal-background p");

    paragraph.textContent = `${currentPlayer} will play first!`;
    /// get the name of the player with the object. Here, player is a string, "player1" or "player2"

    modal.classList.add("active");
    modalBackground.classList.add("active");

    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    })

    modalBackground.addEventListener('keypress', (event) => {
        if (event.code === "Enter") {
            modal.classList.remove("active");
            modalBackground.classList.remove("active");
        }
    })
}



export function dealingWithNames() {
    // Getting the nodes
    const closeButton = document.querySelector(".name-modal-background .close-button");
    const modal1 = document.querySelector(".names.modal");
    const modalBackground1 = document.querySelector(".name-modal-background");

    displayNameModal(modal1, modalBackground1);
    implementCloseButton(closeButton, modal1, modalBackground1);
   
    let playersArray = getNamesInfo();
    const currentPlayer = choosePlayer();
    displayChosenPlayer();
    nameInputs.forEach((input) => {
        input.addEventListener("keypress", (event) => {
          if (event.code === "Enter") ;
        });
      });
    return currentPlayer;
}



export function changeTurn(player) {
    return (player === "player1" ? "player2" : "player1");
}// The 5 following functions all come together in dealingWithNames

function displayNameModal(modal, modalBackground) {
    const nameInputs = modal.querySelectorAll("input");

    // switching the modal on with classes
    modal.classList.add("active");
    modalBackground.classList.add("active");
}

function implementCloseButton(closeButton, modal, modalBackground) {
    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    })
}

function getNamesInfo() {
    player1 = document.querySelector(".name-1-input").value;
    player2 = document.querySelector(".name-2-input").value; 
    return [player1, player2];
}

function displayNameInfo() {
    const namePlayer1Location = document.querySelector(".player-1-name");
    const namePlayer2Location = document.querySelector(".player-2-name");

    namePlayer1Location.textContent = `${player1}`;
    namePlayer2Location.textContent = `${player2}`;
}

modal.classList.remove("active");
modalBackground.classList.remove("active");

currentPlayer = [player1, player2][Math.floor(Math.random()*2)];
console.log('player inside getNamesInfo', currentPlayer)

export function displayChosenPlayer(player) {

    // getting useful nodes
    const modal = document.querySelector(".random.modal");
    const modalBackground = document.querySelector(".random-modal-background");
    const closeButton = document.querySelector(".random-modal-background .close-button");
    const paragraph = document.querySelector(".random-modal-background p");

    paragraph.textContent = `${currentPlayer} will play first!`;
    /// get the name of the player with the object. Here, player is a string, "player1" or "player2"

    modal.classList.add("active");
    modalBackground.classList.add("active");

    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    })

    modalBackground.addEventListener('keypress', (event) => {
        if (event.code === "Enter") {
            modal.classList.remove("active");
            modalBackground.classList.remove("active");
        }
    })
}



export function dealingWithNames() {
    // Getting the nodes
    const closeButton = document.querySelector(".name-modal-background .close-button");
    const modal1 = document.querySelector(".names.modal");
    const modalBackground1 = document.querySelector(".name-modal-background");

    displayNameModal(modal1, modalBackground1);
    implementCloseButton(closeButton, modal1, modalBackground1);
   
    let playersArray = getNamesInfo();
    const currentPlayer = choosePlayer();
    displayChosenPlayer();
    nameInputs.forEach((input) => {
        input.addEventListener("keypress", (event) => {
          if (event.code === "Enter") ;
        });
      });
    return currentPlayer;
}



export function changeTurn(player) {
    return (player === "player1" ? "player2" : "player1");
}