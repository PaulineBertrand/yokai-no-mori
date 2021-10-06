export let player1 = {
    name: "Player",
    score: 0
}

export let player2 = {
    name: "Player",
    score: 0
}

export function nameModal() {
    // getting useful nodes
    const modal = document.querySelector(".names.modal");
    const modalBackground = document.querySelector(".name-modal-background");
    const closeButton = document.querySelector(".name-modal-background .close-button");
    const nameForm = document.querySelector(".modal form");

    const namePlayer1Location = document.querySelector(".player-1-name");
    const namePlayer2Location = document.querySelector(".player-2-name");

    // switching the modal on with classes
    modal.classList.add("active");
    modalBackground.classList.add("active");
    
    // getting the names and displaying them
    function getNamesInfo() {
        player1.name = document.querySelector(".name-1-input").value;
        player2.name = document.querySelector(".name-2-input").value;
        console.log(player1.name);

        namePlayer1Location.textContent = player1.name;
        namePlayer2Location.textContent = player2.name;

        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    }

    closeButton.addEventListener('click', () => {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
    })

    nameForm.addEventListener('submit', getNamesInfo)
}

export function changeTurn(player) {
    return (player === "player1" ? "player2" : "player1");
}




