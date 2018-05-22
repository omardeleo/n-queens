let Cell = require('./cell.js');

class Board {
  constructor(n) {
    this.cells = this.generateBoard(n);
    this.print();
    this.queenCoords = [];
    this.n = n;
    this.colorize();
    this.queens = 0;
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
    this.queens += 1;
    if (this.queens === parseInt(this.n)) {
      this.victory();
    }
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

    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      let thisCell = this.cells[i][j];
      this.markCell(thisCell);
    }

    for (i = row, j = col; i < this.cells.length && j >= 0; i++, j--) {
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
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      let thisCell = this.cells[i][j];
      this.clearCell(thisCell);
    }
    for (let i = row, j = col; i < this.cells.length && j >= 0; i++, j--) {
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
    cell.element().innerHTML = "<p></p>";
    this.queenCoords = this.queenCoords.filter(coords => !this.sameVal(coords, [row, col]));
    this.clear(cell);
    this.queenCoords.map(coords => this.markAll(this.cells[coords[0]][coords[1]]));
    this.queens -= 1;
  }

  sameVal(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  queenAction(cell) {
    if (cell.isSafe()) {
      this.placeQueen(cell);
    } else {
      if (cell.hasQueen()) {
        this.removeQueen(cell);
      }
    }
  }

  clickFunction(cell) {
    cell.element().addEventListener("click", () => this.queenAction(cell))
  }

  addListeners() {
    this.cells.forEach(row => row.map(cell => cell.addListeners()));
    this.cells.forEach(row => row.map(cell => this.clickFunction(cell)));
  }

  victory() {
    this.cells.forEach(row => row.map(cell => cell.removeListeners()));
    this.cells.forEach(row => row.map(cell => cell.green()));
  }
}

module.exports = Board;
