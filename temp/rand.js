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
  
  function pickRandomIndex(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
    
    console.log("Random Index: " + randomIndex);
    console.log("Random Element: "+ randomElement);
    
    array.splice(randomIndex, 1);
  
    console.log(array)
  }
  
  var resultArray = generateRandomArray();
  console.log(resultArray);
  
  copyResultArray=JSON.parse(JSON.stringify(resultArray))
  
  for(let i=0; i<9; i++){
      copyOfCopyResultArray=JSON.parse(JSON.stringify(copyResultArray))
  
      var randomElement = pickRandomIndex(copyResultArray);
      console.log("Remaining Array:" + copyResultArray);
  }