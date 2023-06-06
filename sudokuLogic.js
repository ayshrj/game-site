
//Genrates a array with random number between 1-9 placed at random places
function generateRandomArray() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var randomArray = [];
  
    while (numbers.length > 0) {
      var randomIndex = Math.floor(Math.random() * numbers.length);
      var randomNumber = numbers.splice(randomIndex, 1)[0];
      randomArray.push(randomNumber);
    }
  
    return randomArray;
}

//It makes a already solved completed board
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
  
    let randRow=generateRandomArray();
    let randCol=generateRandomArray();
    let randNum=generateRandomArray();

    for(let i = 0; i < size; i++){
      board[randRow[i]-1][randCol[i]-1]=randNum[i];
    }
    // Solve the Sudoku board
    solveSudoku(board);
  
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

function generateSudokuBoard(board, difficulty) {
  const size = 9
  // Remove random numbers to create a puzzle
  for (let i = 0; i < difficulty; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    board[row][col] = 0;
  }

  return board;
}

// Check if a value is valid in the given position
function isValid(board, num, row, col) {
  const size=9;
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

// // Example usage:
const solvedBoard = generateSolvedSudokuBoard();
// console.log(solvedBoard);

let difficulty=50;
const sudokuBoard = generateSudokuBoard(JSON.parse(JSON.stringify(solvedBoard)), difficulty);
// console.log(sudokuBoard);


export {generateSolvedSudokuBoard, generateSudokuBoard, isValid};
// export {solvedBoard, sudokuBoard};