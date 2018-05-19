(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let Cell = require('./cell.js');

class Board {
  constructor(n) {
    this.cells = this.generateBoard(n);
    this.print();
    this.queenCoords = [];
    this.n = n;
    this.colorize();
  }

  generateBoard(n) {
    let board = [];
    let boardRow;
    for (let j = 0; j < n; j++) {
      boardRow = [];
      for (let i = 0; i < n; i++) {
        let cell = new Cell([j, i]);
        boardRow.push(cell);
      }
      board.push(boardRow);
    }
    return board;
  }

  colorize() {
    let row;
    for (let i = 0; i < this.n; i++) {
      row = this.cells[i];
      if (i % 2 === 0) {
        row.map(cell => {
          if (cell.col % 2 !== 0) {
            cell.element().className += " black";
            cell.className += " black";
          };
        });
      } else {
        row.map(cell => {
          if (cell.col % 2 === 0) {
            cell.element().className += " black";
            cell.className += " black";
          };
        });
      }
    }
  }

  print() {
    let gridHtml ="";
    for (let j = 0; j < this.cells.length; j++) {
      let rowHtml = "<div class=\"row\">";
      for (let i = 0; i < this.cells.length; i++) {
        let cell = this.cells[j][i];
        rowHtml += cell.div();
      }
      rowHtml += "</div>";
      gridHtml += rowHtml;
    }
    document.querySelector('.grid').innerHTML = gridHtml;
  }

  placeQueen(cell) {
    cell.element().innerHTML = "<p>Q</p>";
    this.markDiag(cell);
    this.markCell(cell);
    this.markCol(cell);
    this.markRow(cell);
    let [row, col] = cell.cellCoordsInt();
    this.queenCoords = this.queenCoords.concat([[row, col]]);
  }

  markCell(cell) {
    if (!cell.element().className.includes("selected")) {
      cell.element().className += " selected";
      cell.className += " selected";
    }
  }

  markCol(cell) {
    let [row, col] = cell.cellCoordsInt();
    for (let i = 0; i < this.cells.length; i++) {
      let thisCell = this.cells[i][col];
      this.markCell(thisCell);
    }
  }

  markRow(cell) {
    let [row, col] = cell.cellCoordsInt();
    for (let i = 0; i < this.cells.length; i++) {
      let thisCell = this.cells[row][i];
      this.markCell(thisCell);
    }
  }

  markDiag(cell) {
    let [row, col] = cell.cellCoordsInt();
    let i, j;
    for (i = row, j = col; i >= 0 && j < this.cells.length; i--, j++) {
      let thisCell = this.cells[i][j];
      this.markCell(thisCell);
    }
    for (i = row, j = col; i < this.cells.length && j < this.cells.length; i++, j++) {
      let thisCell = this.cells[i][j];
      this.markCell(thisCell);
    }
  }

  clear(cell) {
    this.clearRow(cell);
    this.clearCol(cell);
    this.clearDiag(cell);
  }

  clearCell(cell) {
    if (cell.className.includes("selected")) {
      cell.className = cell.className.slice(0,(-"selected".length) - 1);
      cell.element().className = cell.className;
    }
  }

  clearRow(cell) {
    let [row, col] = cell.cellCoordsInt();
    for (let i = 0; i < this.cells.length; i++) {
      let thisCell = this.cells[row][i];
      this.clearCell(thisCell);
    }
  }

  clearCol(cell) {
    let [row, col] = cell.cellCoordsInt();
    for (let i = 0; i < this.cells.length; i++) {
      let thisCell = this.cells[i][col];
      this.clearCell(thisCell);
    }
  }

  clearDiag(cell) {
    let [row, col] = cell.cellCoordsInt();
    for (let i = row, j = col; i >= 0 && j < this.cells.length; i--, j++) {
      let thisCell = this.cells[i][j];
      this.clearCell(thisCell);
    }
    for (let i = row, j = col; i < this.cells.length && j < this.cells.length; i++, j++) {
      let thisCell = this.cells[i][j];
      this.clearCell(thisCell);
    }
  }

  markAll(cell){
    this.markRow(cell);
    this.markCol(cell);
    this.markDiag(cell);
  }

  removeQueen(cell) {
    let [row, col] = cell.cellCoordsInt();
    cell.element().innerHTML = "";
    this.queenCoords = this.queenCoords.filter(coords => !this.sameVal(coords, [row, col]));
    this.clear(cell);
    this.queenCoords.map(coords => this.markAll(this.cells[coords[0]][coords[1]]));
  }

  sameVal(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
}

module.exports = Board;

},{"./cell.js":2}],2:[function(require,module,exports){
class Cell {
  constructor(coords) {
    this.row = coords[0];
    this.col = coords[1];
    this.coords = coords;
    this.queenCoords = [];
    this.className = `square cell-${this.row}-${this.col}`
  }

  div() {
    return `<div class="square cell-${this.row}-${this.col}"></div>`;
  }

  element() {
    return document.getElementsByClassName(this.className)[0];
  }

  isSafe() {
    return !this.className.includes("selected");
  }

  evaluate() {
    if (this.isSafe()) {
      this.placeQueen();
    }
  }

  cellCoordsInt() {
    let coords = this.className.match(/\d+/g);
    return [parseInt(coords[0]), parseInt(coords[1])];
  }
}

module.exports = Cell;

},{}],3:[function(require,module,exports){
class Instructions {
  constructor(n) {
    this.n = n;
    this.instr = []
  }

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

  recurseNQ(board, col){
    if (col >= this.n){
      return true;
    }

    for (let i = 0; i < this.n; i++){
      this.instr.push(["evaluate", [i, col]]);
      if (this.isSafe(board, i, col)){
        board[i][col] = 1;
        this.instr.push(["place", [i, col]]);
        if (this.recurseNQ(board, col + 1)===true)
          return true;
        board[i][col] = 0;
        this.instr.push(["remove", [i, col]]);
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

},{}],4:[function(require,module,exports){
let Instructions = require('./instructions.js');
let Board = require('./board.js');
let instructions = new Instructions(8);
instructions.solveNQ();
let dir = instructions.instr;

let board = new Board(8);

let actions = dir.filter(x => x[0] !== "evaluate");

function execute(board, coords, action){
  let [row, col] = coords;
  let cell = board.cells[row][col];
  if (action === "place") {
    board.placeQueen(cell);
  } else if (action === "remove") {
    board.removeQueen(cell);
  }
}

function solve() {
  let i = 0;
  let evalInterval = setInterval(() => {
      if (i < actions.length) {
        let [action, coords] = [actions[i][0], actions[i][1]];
        execute(board, coords, action);
        i += 1;
  } else {
      clearInterval(evalInterval);
    }
  }, 200);
}

solve();

},{"./board.js":1,"./instructions.js":3}]},{},[4]);
