class Cell {
  constructor(coords) {
    this.row = coords[0];
    this.col = coords[1];
  }

  cell() {
    return "cell-" + String(this.row) + "-" + String(this.col);
  }

  className() {
    return `cell-${this.row}-${this.col}`;
  }

  div() {
    return `<div class="square cell-${this.row}-${this.col}"></div>`;
  }

  cellAt() {
    return document.getElementsByClassName(this.className())[0];
  }
}

cell = new Cell([0,0]);

// console.log(cell.div());


// console.log(typeof cell.dive);


document.body.innerHTML = cell.div();

Cell.prototype.blink = function() {
  // console.log(this.cellAt());
  this.cellAt()
}
cell.blink();
