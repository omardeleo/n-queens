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
