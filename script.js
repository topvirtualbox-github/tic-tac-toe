const GAME = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    let player = "X";

    // Add event listener to each box
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (board[index] === "") {
                board[index] = player;
                box.textContent = player;
                if (player === "X") { player = "O"; }
                else { player = "X"; }
            }
        });
    });

})();