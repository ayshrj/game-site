function isValid(grid, arr, row, col, num) {
    // console.log("Grid: " + grid);
    for (let i = 0; i < row; i++) {
        if (grid[i][col] === num) return false;
    }

    for (let j = 0; j < col; j++) {
        if (arr[j] === num) return false;
    }

    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < row; i++) {
        for (let j = boxCol; j < col; j++) {
            if (grid[i][j] === num) return false;
        }
    }

    return true;
}

/*
+-------+-------+-------+
| $ $ $ | $ $ $ | $ $ $ |
| $ $ $ | $ $ $ | $ $ $ |
| $ $ $ | $ ~ . | . . . |
+-------+-------+-------+
| . . . | . . . | . . . |
| . . . | . . . | . . . |
| . . . | . . . | . . . |
+-------+-------+-------+
| . . . | . . . | . . . |
| . . . | . . . | . . . |
| . . . | . . . | . . . |
+-------+-------+-------+
*/

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

function generate(grid) {
    for (let i = 0; i < 9; i++) {
        let tempArr = [];
        let randomArray = generateRandomArray()
        for (let j = 0; j < 9; j++) {
            let k=0;
            let temp = randomArray[k]
            while (!isValid(grid, tempArr, i, j, temp)) {
                temp = randomArray[++k]
            }
            randomArray.splice(k, 1);
            tempArr.push(temp);
        }
        grid.push(tempArr);
    }
}

let grid = [];
generate(grid);
console.log(grid);