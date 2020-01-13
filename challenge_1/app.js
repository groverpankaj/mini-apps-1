// Add Event Listener
const allBoxes = document.getElementsByClassName('eachBox')

for(let i = 0; i < allBoxes.length; i++) {
  allBoxes[i].addEventListener('click', (event) => ticClicked(event));
}

// Create initial board
var board = [];

// Cross or Zero
var sign = true;

// Reset Board
const resetBoard = () => { 
  board = new Array(3).fill(null);

  board.forEach( (ele, index) => {
    board[index] = new Array(3).fill(null);
  });

  for(let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].innerHTML = '&nbsp;';
  }
  alreadyWon = false;
  sign = true;
};


// Score
var score = 0;

// ScoreEle
var scoreEle = document.getElementById('score');

// Winner
var alreadyWon = false;

// Reset Button
const resetElem = document.getElementById('reset');
resetElem.addEventListener('click', resetBoard);

//Initial;
resetBoard();

// When Tic Tac Toe Box is clicked
const ticClicked = event => {
  
  if(alreadyWon) {
    return;
  }

  let currId = event.target.id;
  let rowClicked = parseInt(currId.slice(0, 1));
  let colClicked = parseInt(currId.slice(1));
  // console.log(rowClicked, colClicked);

  if(board[rowClicked][colClicked] === null) {
    // Update Board
    board[rowClicked][colClicked] = sign ? 1 : 0;
    // Update DOM
    let elemText = sign ? 'X' : '0';
    event.target.innerHTML = elemText;
    
    // Check Winner
    if(checkWinner(rowClicked, colClicked)) {
      score++;
      setTimeout(() => {
        alert(`You Win, your score is ${score}`);
      }, 100);
      alreadyWon = true;  
      scoreEle.innerHTML = score;
    }
    sign = !sign;
  }
};

// Check Row
const checkRowResult = rowClicked => {
  if( (board[rowClicked][0] === board[rowClicked][1]) && (board[rowClicked][1] === board[rowClicked][2]) ) {
    return true;
  }
  return false;
}

// Check Col
const checkColResult = colClicked => {
  if( (board[0][colClicked] === board[1][colClicked]) && (board[1][colClicked] === board[2][colClicked]) ) {
    return true;
  }
  return false;
}

// Check Major Diagonal
const checkMajorResult = () => {
  // console.log("checking major");
  if( (board[0][0] === board[1][1]) && (board[1][1] === board[2][2]) ) {
    return true;
  }
  return false;
}

// Check Minor Diagonal
const checkMinorResult = () => {
  // console.log("checking minor");
  if( (board[0][2] === board[1][1]) && (board[1][1] === board[2][0]) ) {
    return true;
  }
  return false;
}

// Checking if we have winning combination
const checkWinner = (rowClicked, colClicked) => {
  // Check Row
  let rowReault =  checkRowResult(rowClicked);
  //Check Column
  let colResult = checkColResult(colClicked);

  // Check Major Diagonal
  let majorResult = false;
  if(rowClicked === colClicked) {
    majorResult = checkMajorResult();
  }

  // Check Minor Diagonal 
  let minorResult = false;
  if ( (rowClicked == 0 && colClicked == 2) || 
       (rowClicked == 2 && colClicked == 0) ) {
    minorResult = checkMinorResult();
  }

  if(rowReault || colResult || majorResult || minorResult) {
    return true;
  }

  return false;
};





