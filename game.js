document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button-option");
    const restartButton = document.getElementById("restart");
    const newGameButton = document.getElementById("new-game");
    const popup = document.querySelector(".popup");
    const message = document.getElementById("message");
    const turnIndicator = document.getElementById("turn-indicator");
    const scoreX = document.getElementById("score-x");
    const scoreO = document.getElementById("score-o");
    const darkModeButton = document.getElementById("dark-mode");

    let currentPlayer = "X";
    let gameActive = true;
    let board = ["", "", "", "", "", "", "", "", ""];
    let scores = { X: 0, O: 0 };

    // Sound Effects
    const clickSound = document.getElementById("click-sound");
    const winSound = document.getElementById("win-sound");
    const drawSound = document.getElementById("draw-sound");

    // Winning combinations
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Handle player move
    function handleClick(index) {
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            buttons[index].innerText = currentPlayer;
            buttons[index].disabled = true;
            clickSound.play();
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnIndicator.innerText = `Player ${currentPlayer}'s Turn`;
        }
    }

    // Check for a winner
    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                showResult(`Player ${board[a]} Wins!`);
                scores[board[a]]++;
                updateScore();
                winSound.play();
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            showResult("It's a Draw!");
            drawSound.play();
        }
    }

    // Display result message
    function showResult(result) {
        message.innerText = result;
        popup.classList.remove("hide");
    }

    // Update scoreboard
    function updateScore() {
        scoreX.innerText = scores.X;
        scoreO.innerText = scores.O;
    }

    // Restart game
    function restartGame() {
        board.fill("");
        buttons.forEach(button => {
            button.innerText = "";
            button.disabled = false;
        });
        gameActive = true;
        currentPlayer = "X";
        turnIndicator.innerText = "Player X's Turn";
        popup.classList.add("hide");
    }

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }

    // Add event listeners
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => handleClick(index));
    });

    restartButton.addEventListener("click", restartGame);
    newGameButton.addEventListener("click", restartGame);
    darkModeButton.addEventListener("click", toggleDarkMode);
});
