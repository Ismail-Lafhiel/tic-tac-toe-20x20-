// Initializing the game state
let currentPlayer = 'X'; // Starting with player 'X'
const gridSize = 20; // Defining the size of the grid (20x20)
let moveHistory = []; // Tracking moves for undo functionality
let score = { X: 0, O: 0 }; // Tracking scores
let board = Array(gridSize * gridSize).fill(null); // Representing the grid as a flat array

// Function to create the game grid
const createGrid = (size) => {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = ''; // Clearing the grid if resetting
    
    // Looping to create each cell in the grid
    for (let i = 0; i < size * size; i++) {
        const cell = createCell(i);
        gridContainer.appendChild(cell);
    }
};

// Function to create a single cell
const createCell = (index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    // Adding click event listener to the cell
    cell.addEventListener('click', () => handleCellClick(cell, index));
    
    return cell;
};

// Function to handle a cell click event
const handleCellClick = (cell, index) => {
    // Checking if the cell is already occupied or the game is over
    if (!cell.textContent && !checkWin()) {
        cell.textContent = currentPlayer;
        cell.classList.add(`player-${currentPlayer.toLowerCase()}`);
        board[index] = currentPlayer; // Updating the board state
        moveHistory.push({ cell, index, player: currentPlayer }); // Recording move for undo
        
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            score[currentPlayer]++; // Incrementing the winner's score
            updateScoreboard(); // Updating the scoreboard
        } else {
            switchPlayer(); // Switching to the other player
        }
    }
};

// Function to switch the current player
const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Function to check for a win
const checkWin = () => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] && (
            checkDirection(i, 1) || // Horizontal
            checkDirection(i, gridSize) || // Vertical
            checkDirection(i, gridSize + 1) || // Diagonal (bottom-right)
            checkDirection(i, gridSize - 1) // Diagonal (bottom-left)
        )) {
            return true;
        }
    }
    return false;
};

// Function to check a specific direction for five in a row
const checkDirection = (index, step) => {
    let count = 1;
    for (let i = 1; i < 5; i++) {
        if (board[index] === board[index + step * i]) {
            count++;
        } else {
            break;
        }
    }
    return count === 5;
};

// Function to reset the game
const resetGame = () => {
    moveHistory = [];
    board = Array(gridSize * gridSize).fill(null);
    createGrid(gridSize);
};

// Function to undo the last move
const undoLastMove = () => {
    const lastMove = moveHistory.pop();
    if (lastMove) {
        lastMove.cell.textContent = '';
        lastMove.cell.classList.remove(`player-${lastMove.player.toLowerCase()}`);
        board[lastMove.index] = null;
        currentPlayer = lastMove.player;
    }
};

// Function to update the scoreboard
const updateScoreboard = () => {
    document.getElementById('score-x').textContent = score.X;
    document.getElementById('score-o').textContent = score.O;
};

// Event listeners for reset and undo buttons
document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('undo-btn').addEventListener('click', undoLastMove);

// Initializing the game
const initializeGame = () => {
    createGrid(gridSize);
    updateScoreboard();
};

// Starting the game
initializeGame();
