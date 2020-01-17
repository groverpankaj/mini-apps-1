import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state  = {
      boardRows: 7,
      boardCols: 8,
      board: [],
      redOrBlack: 0
    }

    this.boardMapper = this.boardMapper.bind(this);
    this.colBoardMapper = this.colBoardMapper.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.checkTogether = this.checkTogether.bind(this);
  }

  componentDidMount() {
    let holdingArray = new Array(this.state.boardRows).fill(null);
    
    holdingArray.map( (element,index) =>{
      holdingArray[index] = new Array(this.state.boardCols).fill(null);
    });

    this.setState({
      board: holdingArray
    });
  }

  checkTogether(inputArray, searchElement) {
    console.log('Checking: ', inputArray);
    let foundTogther = 0;
    let maxTogether = 0;

    for(let i = 0; i < inputArray.length - 1; i++) {
     
      if(inputArray[i] === searchElement) {
          
        if(inputArray[i+1] === searchElement) {
          foundTogther++;
          if(maxTogether < foundTogther) {
            maxTogether = foundTogther;
          }
        } else {
          foundTogther = 0;
        } 

      }
    }

    // console.log('foundTogther: ', foundTogther, 'maxTogether: ', maxTogether);
    return(maxTogether)
  }

  checkResult(rowToCheck, colToCheck) {

    // Check Row
    let allElementsForGivenRow = this.state.board[rowToCheck];
    
    if(this.checkTogether(allElementsForGivenRow, 1) >= 3) {
      return true;
    }

    if(this.checkTogether(allElementsForGivenRow, 0) >=3) {
      return true;
    }
    
    // Check Col
    let allElementsForGivenCol = [];
    for(let i = 0; i < this.state.board.length; i++) {
      allElementsForGivenCol.push(this.state.board[i][colToCheck])
    }

    if(this.checkTogether(allElementsForGivenCol, 1) >= 3) {
      return true;
    }

    if(this.checkTogether(allElementsForGivenCol, 0) >=3) {
      return true;
    }
    
    // Major Diagonal
    let majorRow = rowToCheck;
    let majorCol = colToCheck;

  
    while(majorRow < this.state.boardRows-1 && majorCol > 0) {
      majorRow++;
      majorCol--;
    }
    
    let allElementsForMajorDigonal = [];
    
    while(majorRow >= 0 && majorCol <= this.state.boardCols-1) {
      allElementsForMajorDigonal.push(this.state.board[majorRow][majorCol]);
      majorRow--;
      majorCol++;
    }
    // console.log('allElementsForMajorDigonal', allElementsForMajorDigonal)

    if(this.checkTogether(allElementsForMajorDigonal, 1) >= 3) {
      return true;
    }

    if(this.checkTogether(allElementsForMajorDigonal, 0) >=3) {
      return true;
    }

    // Minor Diagonal
    let minorRow = rowToCheck;
    let minorCol = colToCheck;

    console.log(minorRow, minorCol);
    while(minorRow < this.state.boardRows-1 && minorCol < this.state.boardCols-1) {
     
      minorRow++;
      minorCol++;
    }
    console.log(minorRow, minorCol);

    let allElementsForMinorDigonal = [];
    
    while(minorRow >= 0 && minorCol >= 0) {
      allElementsForMinorDigonal.push(this.state.board[minorRow][minorCol]);
      minorRow--;
      minorCol--;
    }
    // console.log('allElementsForMinorDigonal', allElementsForMinorDigonal)

    if(this.checkTogether(allElementsForMinorDigonal, 1) >= 3) {
      return true;
    }

    if(this.checkTogether(allElementsForMinorDigonal, 0) >=3) {
      return true;
    }

    return false;
  }


  clickHandler(event) {
    let elementId = event.target.id;
    // console.log(elementId);
    let clickedCol = parseInt(elementId.slice(1));
    // console.log(clickedCol)

    // start search from last row kepping the col constant
    // add black or red when you find first null
    let holdingArray = this.state.board;

    for(let i = holdingArray.length-1; i >= 0; i--) {
      
      if(holdingArray[i][clickedCol] === null) {
        
        holdingArray[i][clickedCol] = this.state.redOrBlack;
        this.setState({
          board : holdingArray,
          redOrBlack: (this.state.redOrBlack) ? 0 : 1
        })
        if(this.checkResult(i, clickedCol)) {
          setTimeout(() => alert('Winner :-)'), 200);
        }
        break;
      }
    }

  };
  

  colBoardMapper(row, rowIndex) {
    let colElements = row.map( (colElement, colIndex) => {
      let divId = rowIndex.toString() + colIndex.toString();
      if(colElement === 1) {
        return(<div className="colDiv colDivBlack" id={divId} onClick={this.clickHandler}></div>);
      } else if (colElement === 0) {
        return(<div className="colDiv colDivRed" id={divId} onClick={this.clickHandler}></div>);
      } else {
        return(<div className="colDiv" id={divId} onClick={this.clickHandler}></div>);
      }

    });

    return colElements;

  }

  
  boardMapper() {

    let boradElements =  this.state.board.map((row, rowIndex) => {
      return(
        <div>
          {this.colBoardMapper(row, rowIndex)}
        </div>
      );
    });

    return boradElements;

  }

  render() {
    return (
      <div>
        Hello World !!!
        {this.boardMapper()}
      </div>
    );
  }
}

export default App;