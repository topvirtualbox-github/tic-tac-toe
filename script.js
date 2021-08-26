const GAME = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];

    const player1 = { name: "P1", mark: "X" };
    const player2 = { name: "P2", mark: "O" };
    const player3 = { name: "AI", mark: "O" };

    let user = player1;
    let opponent = player2;

    let status = false;
    let turn = user;

    const display = document.querySelector(".display");
    const boxes = document.querySelectorAll(".box");
    const player = document.querySelector(".btn-player");
    const versus = document.querySelector(".btn-versus");
    const reset = document.querySelector(".btn-reset");

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (!status || board[index] !== "") return;
            board[index] = turn.mark;
            box.textContent = turn.mark;
            checkStatus();
            endTurn();
            if (opponent === player3) { playAI(); }
        });
    });

    player.addEventListener("click", () => {
        let answer = prompt("Choose a name");
        while (answer !== null && (answer.length > 5 || answer.trim() === "")) {
            answer = prompt("Choose a name ( Max 5 characters )");
        }
        if (answer === null) return;
        user.name = answer.toUpperCase();
        player.textContent = answer.toUpperCase();
    });

    versus.addEventListener("click", () => {
        if (opponent === player2) { opponent = player3; versus.textContent = "AI"; }
        else { opponent = player2; versus.textContent = "P2"; }
        if (status) resetGame();
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
                display.textContent = turn.name + " WINS";
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
        status = true;
        turn = user;
        display.textContent = "";
        boxes.forEach(box => { box.textContent = ""; });
    }

    // End turn and switch current player
    function endTurn() {
        if (!status) return;
        if (turn === user) { turn = opponent; }
        else { turn = user; }
    }

    // AI Logic
    function playAI() {
        if (!status) return;
        let random = Math.floor(Math.random() * board.length);
        while (board[random] !== "") {
            random = Math.floor(Math.random() * board.length);
        }
        board[random] = turn.mark;
        boxes[random].textContent = turn.mark;
        checkStatus();
        endTurn();
    }

})();