function generateGrid() {
    const grid = createEmptyGrid();
    if (solveGrid(grid)) {
      return grid;
    } else {
      return null; // Unable to generate a valid grid
    }
  }
  
  function createEmptyGrid() {
    const grid = new Array(9);
    for (let i = 0; i < 9; i++) {
      grid[i] = new Array(9).fill(0);
    }
    return grid;
  }
  
  function solveGrid(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true; // Grid is solved
    }
  
    const { row, col } = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solveGrid(grid)) {
          return true; // Found a valid solution
        }
  
        grid[row][col] = 0; // Reset the cell if the current choice leads to an invalid solution
      }
    }
  
    return false; // No valid solution found
  }
  
  function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return { row, col };
        }
      }
    }
    return null; // Grid is completely filled
  }
  
  function isValidMove(grid, row, col, num) {
    return (
      isRowValid(grid, row, num) &&
      isColValid(grid, col, num) &&
      isBoxValid(grid, row - (row % 3), col - (col % 3), num)
    );
  }
  
  function isRowValid(grid, row, num) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  function isColValid(grid, col, num) {
    for (let row = 0; row < 9; row++) {
      if (grid[row][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  function isBoxValid(grid, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row + boxStartRow][col + boxStartCol] === num) {
          return false;
        }
      }
    }
    return true;
  }
  
  // Example usage:
  const grid = generateGrid();