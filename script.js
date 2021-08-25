const GAME = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];

    const player1 = { name: "P1", mark: "X" };
    const player2 = { name: "P2", mark: "O" };

    let current = player1;

    let status = false;

    const display = document.querySelector(".display");
    const boxes = document.querySelectorAll(".box");
    const reset = document.querySelector(".btn-reset");

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (status && board[index] === "") {
                board[index] = current.mark;
                box.textContent = current.mark;
                checkStatus();
                switchPlayer();
            }
        });
    });

    reset.addEventListener("click", () => {
        reset.textContent = "RESET";
        resetGame();
    });

    // Check if game has ended
    function checkStatus() {
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < wins.length; i++) {
            const win = wins[i];
            const a = board[win[0]];
            const b = board[win[1]];
            const c = board[win[2]];
            if (a !== "" && a === b && b === c) {
                display.textContent = current.name + " WINS";
                status = false;
                break;
            }
        }
        if (status && !board.includes("")) {
            display.textContent = "TIE";
            status = false;
        }
    }

    // Reset everything to default values
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        current = player1;
        status = true;
        display.textContent = "";
        boxes.forEach(box => { box.textContent = ""; });
    }

    // Switch current player
    function switchPlayer() {
        if (!status) return;
        if (current === player1) { current = player2; }
        else { current = player1; }
    }

})();