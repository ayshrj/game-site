function isValid(board, num, row, col) {
    // Check row
    for (let i = 0; i < row; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < col; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < row; i++) {
        for (let j = boxCol; j < col; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

let a=[]

for(let i = 0; i < 9; i++){
    let tempArr=[];
    for(let j = 0; j < 9; j++){
        let temp=Math.random()*9+1;
        while(a.length!==0 && !isValid(a, i, j, temp)){
            temp=Math.random()*9+1;
        }
        tempArr.push(temp);
    }
    a.push(tempArr);
}

console.log(a)