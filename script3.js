const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameIsActive = true;
let board = Array(9).fill('');


function handleClick(cell) {
  const cellIndex = parseInt(cell.id.substring(1), 10); 

  
  if (board[cellIndex] === '' && gameIsActive) {
    board[cellIndex] = currentPlayer; 
    cell.textContent = currentPlayer; 

    
    if (checkForWinner()) {
      statusDisplay.textContent = `${currentPlayer} Wins!`;
      gameIsActive = false;
    } else if (checkTie()) {
      statusDisplay.textContent = "It's a Tie!";
      gameIsActive = false;
    } else {
      
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}


function checkForWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = board[condition[0]];
    const cell2 = board[condition[1]];
    const cell3 = board[condition[2]];

    
    if (cell1 === currentPlayer && cell2 === currentPlayer && cell3 === currentPlayer && cell1 !== '') {
      return true;
    }
  }

  return false;
}
function checkTie() {
  return board.every(cell => cell !== '');
}


function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X'; 
  gameIsActive = true;

  cells.forEach(cell => cell.textContent = ''); 
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}


cells.forEach(cell => cell.addEventListener('click', () => handleClick(cell)));
resetButton.addEventListener('click', resetGame);
