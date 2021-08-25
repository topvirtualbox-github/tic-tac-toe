const GAME = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];

    let player = "X";

    let status = false;

    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Event listeners
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (status && board[index] === "") {
                board[index] = player;
                box.textContent = player;
                checkStatus();
                if (player === "X") { player = "O"; }
                else { player = "X"; }
            }
        });
    });
    const reset = document.querySelector(".btn-reset");
    reset.addEventListener("click", () => {
        reset.textContent = "RESET";
        resetGame();
    });

    // Check if game has ended
    function checkStatus() {
        for (let i = 0; i < wins.length; i++) {
            const win = wins[i];
            const a = board[win[0]];
            const b = board[win[1]];
            const c = board[win[2]];
            if (a !== "" && a === b && b === c) {
                alert(player + " WINS");
                status = false;
                break;
            }
        }
        if (status && !board.includes("")) { alert("TIE"); }
    }

    // Reset everything to default values
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        player = "X";
        status = true;
        boxes.forEach(box => { box.textContent = ""; });
    }

})();