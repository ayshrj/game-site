function generateSolvedSudokuBoard(){
  const size = 9; // Size of the Sudoku board (9x9)
  const board = [];

  // Fill the board with zeroes
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }

  // Solve the Sudoku board
  solveSudoku(board);

  return board;
}

function generateSudokuBoard(board) {
  const size = 9
  // Remove random numbers to create a puzzle
  const difficulty = 50; // Adjust the difficulty level by changing the number of removed numbers
  for (let i = 0; i < difficulty; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    board[row][col] = 0;
  }

  return board;
}

function solveSudoku(board) {
  const size = 9; // Size of the Sudoku board (9x9)

  // Find the next empty cell
  function findEmptyCell(board) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  // Check if a value is valid in the given position
  function isValid(board, num, pos) {
    const [row, col] = pos;

    // Check row
    for (let i = 0; i < size; i++) {
      if (board[i][col] === num && i !== row) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < size; i++) {
      if (board[row][i] === num && i !== col) {
        return false;
      }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num && i !== row && j !== col) {
          return false;
        }
      }
    }

    return true;
  }

  // Solve the Sudoku board using backtracking
  function solve(board) {
    const emptyCell = findEmptyCell(board);

    if (emptyCell === null) {
      return true; // All cells filled, Sudoku solved
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= size; num++) {
      if (isValid(board, num, [row, col])) {
        board[row][col] = num;

        if (solve(board)) {
          return true;
        }

        board[row][col] = 0; // Backtrack if the current configuration doesn't lead to a solution
      }
    }

    return false;
  }

  solve(board);
}

// Example usage:
const solvedBoard = generateSolvedSudokuBoard();
console.log(solvedBoard);

const sudokuBoard = generateSudokuBoard(JSON.parse(JSON.stringify(solvedBoard)));
console.log(sudokuBoard);
