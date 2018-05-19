(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Instructions {
  constructor(n) {
    this.n = n;
    this.instr = []
  }

  // print() {
  //   return this.instr;
  // }
  //
  // solveNQ();
  //
  // function printSolution(board){
  //   for (let i=0; i< this.n; i++){
  //     let row = "";
  //     for (let j=0; j< this.n; j++){
  //       row = row + " " +board[i][j]+ " ";
  //     }
  //     console.log(row);
  //   }
  // }
  //
  isSafe(board, row, col){

    // Checks the ← direction
    for (let i=0; i<col; i++){
      if (board[row][i] === 1) {
        return false;
      }
    }

    // Checks the ↖ direction
    for (let i=row, j=col; i>=0 && j>=0; i--, j--){
      if (board[i][j] === 1) {
        return false;
      }
    }

    // Checks the ↙ direction
    for (let i=row, j=col; j>=0 && i< this.n; i++, j--){
      if (board[i][j] === 1){
        return false;
      }
    }

    return true;
  }
  //
  //
  recurseNQ(board, col){
    if (col >= this.n){
      return true;
    }

    for (let i = 0; i < this.n; i++){
      this.instr.push(["evaluate", [i, col]])
      if (this.isSafe(board, i, col)){
        board[i][col] = 1;
        if (this.recurseNQ(board, col + 1)===true)
          return true;
        board[i][col]=0;
      }
    }
    return false;
  }


  solveNQ(){
    let board = this.generateBoard(this.n);
    if (this.recurseNQ(board, 0)===false){
      console.log("No solution found");
      return false;
    }
    // printSolution(board);
    console.log(board);
  }

  generateBoard(n){
    let board=[];
    for (let i=0; i< this.n; i++){
      board[i]=[];
      for (let j=0; j< this.n; j++){
        board[i][j]=0;
      }
    }
    return board;
  }

}

module.exports = Instructions;

},{}],2:[function(require,module,exports){
let Instructions = require('./instructions.js');
let instructions = new Instructions(8);
instructions.solveNQ();
console.log(instructions.instr);

},{"./instructions.js":1}]},{},[2]);
