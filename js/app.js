// When DOM content is loaded, create variables, initialize an empty string for the board
window.addEventListener('DOMContentLoaded', () => {
    const squares = Array.from(document.querySelectorAll('.square'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#resetButton');
    const message = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let activeGame = true;

    const playerXWins = 'PLAYERX_WINS!';
    const playerOWins = 'PLAYERO_WINS!';
    const tie = "It's a Tie!";


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    // Defined winning conditions based on the indices within the board string
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to determine the result of the game
    const gameResult = () => {
        // Initialize the roundWon variable to false
        let roundWon = false;
        // Loop through each of the winningCondition arrays checking if any of them are true
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    // if roundOne evaluates to true, display that ___ player has won and end the game
    if (roundWon) {
        displayMessage(currentPlayer === 'X' ? playerXWins : playerOWins);
        activeGame = false;
        return;
        }
    
    // if none of the winning conditions are met, displayMessage that it is a tie
    if (!board.includes(''))
        displayMessage(tie);
    }

    // If any of the winning conditions evaluate to true, displayMessage which player has won
    const displayMessage = (type) => {
        switch(type){
            case playerOWins:
                message.innerHTML = 'Player <span class="playerO">O</span> Wins';
                break;
            case playerXWins:
                message.innerHTML = 'Player <span class="playerX">X</span> Wins';
                break;
            case tie:
                message.innerText = "It's a tie!";
        }
        message.classList.remove('hide');
    };

    // Function to check if a particular square can be played, or if it has already been played
    const isValidPlay = (square) => {
        if (square.innerText === 'X' || square.innerText === 'O'){
            return false;
        }

        return true;
    };

    // Function to update the board with the current player's turn
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    // Function to change the player's turn after each move
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    // Function to log player move, update the board, check gameResults to see if there is a winner, and then change to the next player
    const userAction = (square, index) => {
        if(isValidPlay(square) && activeGame) {
            square.innerText = currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            gameResult();
            changePlayer();
        }
    }
    
    // Function to reset the board upon the start of a new game
    const boardReset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        activeGame = true;
        message.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
        // Loops through each square and removes the text 
        squares.forEach(square => {
            square.innerText = '';
            square.classList.remove('playerX');
            square.classList.remove('playerO');
        });
    }

    // Adds an event listener so the userAction function runs when a square is clicked
    squares.forEach( (square, index) => {
        square.addEventListener('click', () => userAction(square, index));
    });

    // Adds an event listener so the board resets when the resetButton is clicked
    resetButton.addEventListener('click', boardReset);
});