edBoard = generateSolvedSudokuBoard();
console.log(solvedBoard);

let difficulty=50;
const sudokuBoard = generateSudokuBoard(JSON.parse(JSON.stringify(solvedBoard)), difficulty);
console.lo