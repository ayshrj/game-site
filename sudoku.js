import {generateSolvedSudokuBoard, generateSudokuBoard, isValid} from './sudokuLogic.js';
// import {solvedBoard, sudokuBoard} from './sudokuLogic.js';
// console.log(solvedBoard, sudokuBoard);

let solution = generateSolvedSudokuBoard();

let difficulty=50;

let puzzle = generateSudokuBoard(JSON.parse(JSON.stringify(solution)), difficulty);

let userInput = JSON.parse(JSON.stringify(puzzle));

let sum=0;

for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
        sum+=userInput[i][j];
    }
}

console.log( sum);

console.log(puzzle);


const gameBoard = document.getElementById("gameBoard")
const digits = document.getElementById("digits")
const deleteNumber = document.getElementById("delete")
const newGame = document.getElementById("new-game")
const solveThisGame = document.getElementById("solve-this-game")
const mistake = document.getElementById("mistake")
let lastSelected = null;
let error = 0;

function printGeneratedSudoku(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            const div = document.createElement("div");
            div.classList.add("tile");
            div.addEventListener("click", selectTile);
            div.setAttribute("coord-x", i);
            div.setAttribute("coord-y", j);
            
            if(puzzle[i][j]!==0){ 
                div.classList.add("filled"); 
                div.innerText=`${puzzle[i][j]}`;
            }

            if(i===2 || i===5){
                div.classList.add("border-bottom");
            }

            if(j===2 || j===5){
                div.classList.add("border-right");
            }

            gameBoard.appendChild(div);
        }
    }

    for(let i=0; i<9; i++){
        const div = document.createElement("div");
        div.classList.add("tile");
        div.addEventListener("click", addNumber);
        div.innerText=i+1;
        div.style.height = gameBoard.getElementsByClassName("tile").clientHeight+"px";
        digits.append(div)
    }
}

window.addEventListener('load', printGeneratedSudoku());

function selectTile(){
    if(!this.classList.contains("filled")){
        if(lastSelected!=null){
            lastSelected.classList.remove("select-tile");
        }
        lastSelected=this;
        this.classList.add("select-tile");
    }
}

function areArraysSame(arr1, arr2) {  
    for (let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
            if (arr1[i][j] !== arr2[i][j]) {
                return false;
            }
        }
    }
  
    return true;
}

function addNumber(){
    lastSelected.innerText=parseInt(this.innerText);
    let i = parseInt(lastSelected.getAttribute("coord-x"));
    let j = parseInt(lastSelected.getAttribute("coord-y"));
    sum-=userInput[i][j];
    userInput[i][j]=parseInt(this.innerText);
    sum+=userInput[i][j];
    console.log(sum)
    console.log(userInput)
    if(!isValid(userInput, parseInt(this.innerText), i, j)){
        lastSelected.classList.add("red-text")
        error++;
        if(error===3){
            error=0;
            userInput = JSON.parse(JSON.stringify(puzzle));
            alert("You are bad :(((((((")
            gameBoard.innerHTML = '';
            digits.innerHTML = '';
            printGeneratedSudoku()
        }
        mistake.innerText = error
    } else{
        if(sum===405 && areArraysSame(userInput, solution)){
            alert("yeah!")
            solution = generateSolvedSudokuBoard();
            difficulty=50;
            puzzle = generateSudokuBoard(JSON.parse(JSON.stringify(solution)), difficulty);
            userInput = JSON.parse(JSON.stringify(puzzle));

            sum=0;
            for(let i=0; i<9; i++){
                for(let j=0; j<9; j++){
                    sum+=userInput[i][j];
                }
            }
            console.log(sum)
            gameBoard.innerHTML = '';
            digits.innerHTML = '';
            printGeneratedSudoku()
        }
        if(lastSelected.classList.contains("red-text")){
            lastSelected.classList.remove("red-text");
        }
    }
}

deleteNumber.onclick = () =>{
    if(!lastSelected.classList.contains("filled")){
        sum-=userInput[parseInt(lastSelected.getAttribute("coord-x"))][parseInt(lastSelected.getAttribute("coord-y"))];
        console.log(sum)
        console.log(userInput)
        lastSelected.innerText='';
    }
}

newGame.onclick = () =>{
    solution = generateSolvedSudokuBoard();
    difficulty=50;
    puzzle = generateSudokuBoard(JSON.parse(JSON.stringify(solution)), difficulty);
    userInput = JSON.parse(JSON.stringify(puzzle));

    sum=0;
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            sum+=userInput[i][j];
        }
    }
    console.log(sum)
    gameBoard.innerHTML = '';
    digits.innerHTML = '';
    printGeneratedSudoku()
}

solveThisGame.onclick = () =>{
    console.log(sum)
    gameBoard.innerHTML = '';
    digits.innerHTML = '';
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            const div = document.createElement("div");
            div.classList.add("tile");
            div.addEventListener("click", selectTile);
            div.setAttribute("coord-x", i);
            div.setAttribute("coord-y", j);
            
            if(puzzle[i][j]!==0){ 
                div.classList.add("filled"); 
                div.innerText=`${puzzle[i][j]}`;
            }else{
                div.innerText=`${solution[i][j]}`;
            }

            if(i===2 || i===5){
                div.classList.add("border-bottom");
            }

            if(j===2 || j===5){
                div.classList.add("border-right");
            }

            gameBoard.appendChild(div);
        }
    }

    for(let i=0; i<9; i++){
        const div = document.createElement("div");
        div.classList.add("tile");
        div.addEventListener("click", addNumber);
        div.innerText=i+1;
        div.style.height = gameBoard.getElementsByClassName("tile").clientHeight+"px";
        digits.append(div)
    }
}

function setDifficulty() {
    difficulty = parseInt(document.getElementById("myInput").value);
    solvedBoard = generateSolvedSudokuBoard();
    sudokuBoard = generateSudokuBoard(JSON.parse(JSON.stringify(solvedBoard)), difficulty);
    gameBoard.innerHTML = '';
    console.log(sudokuBoard);
    printGeneratedSudoku();
}