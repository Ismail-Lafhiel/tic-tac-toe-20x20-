
# Tic Tac Toe Game (20x20)

This project is a JavaScript-based Tic Tac Toe game played on a 20x20 grid. The objective is for a player to get five of their marks in a row, either horizontally, vertically, or diagonally. The game includes features like move tracking, undo functionality, and a scoreboard.

Ce projet est un jeu de Tic Tac Toe en JavaScript, joué sur une grille de 20x20. L'objectif est pour un joueur de placer cinq de ses marques d'affilée, soit horizontalement, verticalement ou en diagonale. Le jeu inclut des fonctionnalités telles que le suivi des coups, la fonction annuler, et un tableau des scores.
## Demo

- Here where you can see it [live](http://13.61.12.231/)
## Explanation

### Game State Initialization / Initialisation de l'état du jeu

```js
let currentPlayer = 'X';
const gridSize = 20;
let moveHistory = [];
let score = { X: 0, O: 0 };
let board = Array(gridSize * gridSize).fill(null);
```

#### English Explanation:

- `currentPlayer`: Initializes the game with player 'X' as the starting player.
- `gridSize`: Defines the size of the grid as 20x20.
- `moveHistory`: Keeps a history of all moves made, which is useful for implementing the undo functionality.
- `score`: Tracks the score of both players ('X' and 'O').
- `board`: Represents the game board as a flat array, where each cell corresponds to an index in this array.

#### Explication en Français :

- `currentPlayer`: Initialise le jeu avec le joueur 'X' comme joueur de départ.
- `gridSize`: Définit la taille de la grille à 20x20.
- `moveHistory`: Garde une trace de tous les coups effectués, ce qui est utile pour implémenter la fonctionnalité d'annulation.
- `score`: Suivi du score des deux joueurs ('X' et 'O').
- `board`: Représente la grille du jeu comme un tableau à une dimension, où chaque cellule correspond à un index dans ce tableau.


### Creating the Game Grid / Création de la grille du jeu

```js
const createGrid = (size) => {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = ''; // Clearing the grid if resetting
    
    for (let i = 0; i < size * size; i++) {
        const cell = createCell(i);
        gridContainer.appendChild(cell);
    }
};
```

#### English Explanation:

- `createGrid(size)`: This function generates the game grid based on the defined size. It first clears any existing grid (useful when resetting) and then creates individual cells, appending them to the grid container.

#### Explication en Français :

- `createGrid(size)`: Cette fonction génère la grille de jeu en fonction de la taille définie. Elle commence par effacer toute grille existante (utile lors de la réinitialisation) et crée ensuite des cellules individuelles, les ajoutant au conteneur de la grille.

### Creating Individual Cells / Création des cellules individuelles

```js
const createCell = (index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    cell.addEventListener('click', () => handleCellClick(cell, index));
    
    return cell;
};
```

#### English Explanation:

- `createCell(index)`: This function creates a single cell for the grid. It adds a CSS class to style the cell and attaches a click event listener that triggers the game logic when a player clicks the cell.

#### Explication en Français :

- `createCell(index)` : Cette fonction crée une cellule unique pour la grille. Elle ajoute une classe CSS pour styliser la cellule et attache un écouteur d'événement de clic qui déclenche la logique du jeu lorsqu'un joueur clique sur la cellule.

### Handling Cell Click Events / Gestion des événements de clic sur les cellules

```js
const handleCellClick = (cell, index) => {
    if (!cell.textContent && !checkWin()) {
        cell.textContent = currentPlayer;
        cell.classList.add(`player-${currentPlayer.toLowerCase()}`);
        board[index] = currentPlayer;
        moveHistory.push({ cell, index, player: currentPlayer });
        
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            score[currentPlayer]++;
            updateScoreboard();
        } else {
            switchPlayer();
        }
    }
};
```
#### English Explanation:

- `handleCellClick(cell, index)`: This function handles what happens when a player clicks on a cell. It checks if the cell is empty and if the game is still ongoing. If so, it updates the cell with the current player's mark, adds the move to history, and checks for a win. If a win is detected, the score is updated; otherwise, it switches players.

#### Explication en Français :

- `handleCellClick(cell, index)` : Cette fonction gère ce qui se passe lorsqu'un joueur clique sur une cellule. Elle vérifie si la cellule est vide et si le jeu est toujours en cours. Si c'est le cas, elle met à jour la cellule avec la marque du joueur actuel, ajoute le coup à l'historique et vérifie s'il y a une victoire. Si une victoire est détectée, le score est mis à jour ; sinon, le joueur est changé.

### Checking for a Win / Vérification d'une victoire

```js
const checkWin = () => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] && (
            checkDirection(i, 1) || 
            checkDirection(i, gridSize) || 
            checkDirection(i, gridSize + 1) || 
            checkDirection(i, gridSize - 1)
        )) {
            return true;
        }
    }
    return false;
};
```

#### English Explanation:
- `checkWin()`: This function scans the board to see if there is a winning combination. It checks in all possible directions (horizontal, vertical, and both diagonals) to determine if a player has won the game.

#### Explication en Français :
- `checkWin()` : Cette fonction parcourt la grille pour voir s'il y a une combinaison gagnante. Elle vérifie dans toutes les directions possibles (horizontale, verticale et les deux diagonales) pour déterminer si un joueur a gagné la partie.

### Resetting the Game / Réinitialisation du jeu

```js
const resetGame = () => {
    moveHistory = [];
    board = Array(gridSize * gridSize).fill(null);
    createGrid(gridSize);
};
```

#### English Explanation:
- `resetGame()`: This function resets the game by clearing the move history and reinitializing the board. It also recreates the grid.

#### Explication en Français :
- `resetGame()` : Cette fonction réinitialise le jeu en effaçant l'historique des coups et en réinitialisant la grille. Elle recrée également la grille.

### Undoing the Last Move / Annulation du dernier coup

```js
const undoLastMove = () => {
    const lastMove = moveHistory.pop();
    if (lastMove) {
        lastMove.cell.textContent = '';
        lastMove.cell.classList.remove(`player-${lastMove.player.toLowerCase()}`);
        board[lastMove.index] = null;
        currentPlayer = lastMove.player;
    }
};
```

#### English Explanation:
- `undoLastMove()`: This function undoes the last move made in the game. It retrieves the last move from history, clears the cell, and restores the previous player's turn.

#### Explication en Français :
- `undoLastMove()` : Cette fonction annule le dernier coup joué dans le jeu. Elle récupère le dernier coup de l'historique, efface la cellule et rétablit le tour du joueur précédent.

### Updating the Scoreboard / Mise à jour du tableau des scores

```js
const updateScoreboard = () => {
    document.getElementById('score-x').textContent = score.X;
    document.getElementById('score-o').textContent = score.O;
};
```
#### English Explanation:
- `updateScoreboard()`: This function updates the displayed scores for both players based on the current game state.

#### Explication en Français :
- `updateScoreboard()` : Cette fonction met à jour les scores affichés pour les deux joueurs en fonction de l'état actuel du jeu.

### Event Listeners for Reset and Undo / Écouteurs d'événements pour réinitialisation et annulation

```js
document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('undo-btn').addEventListener('click', undoLastMove);
```

#### English Explanation:
- **Event Listeners**: These listeners are attached to the reset and undo buttons. When the buttons are clicked, they trigger the respective functions to reset the game or undo the last move.

#### Explication en Français :
- **Écouteurs d'événements** : Ces écouteurs sont attachés aux boutons de réinitialisation et d'annulation. Lorsque les boutons sont cliqués, ils déclenchent les fonctions respectives pour réinitialiser le jeu ou annuler le dernier coup.

### Initializing the Game / Initialisation du jeu

```js
const initializeGame = () => {
    createGrid(gridSize);
    updateScoreboard();
};
```

#### English Explanation:
- `initializeGame()`: This function initializes the game when the page loads. It creates the game grid based on the defined grid size and updates the scoreboard to reflect the initial scores.

#### Explication en Français :
- `initializeGame()` : Cette fonction initialise le jeu lorsque la page se charge. Elle crée la grille du jeu en fonction de la taille définie et met à jour le tableau des scores pour refléter les scores initiaux.

### Starting the Game / Démarrage du jeu

```js
initializeGame();
```

#### English Explanation:
- `initializeGame()` ***call***: This line ensures that the game starts as soon as the script is executed, setting up the grid and scoreboard for play.

#### Explication en Français :
- ***Appel à*** initializeGame() : Cette ligne garantit que le jeu démarre dès que le script est exécuté, en configurant la grille et le tableau des scores pour le jeu.
