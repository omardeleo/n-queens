class Cell {
  constructor(coords) {
    this.row = coords[0];
    this.col = coords[1];
    this.coords = coords;
    this.queenCoords = [];
    this.className = `square cell-${this.row}-${this.col}`;
    this.cellClass = `cell-${this.row}-${this.col}`
  }

  div() {
    return `<div class="square">
              <div class="cell-${this.row}-${this.col}"><p></p></div>
              <div class="overlay"></div>
            </div>`;
  }

  element() {
    return document.querySelector(`.square .${this.cellClass}`);
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

  mouseOver() {
    let color = this.isSafe() ? "green" : "red";
    let overlay = document.querySelector(`.${this.cellClass} + .overlay`);
    overlay.style.cssText = `top: 0px; background-color: ${color}`;
  }

  mouseOut() {
    let overlay = document.querySelector(`.${this.cellClass} + .overlay`);
    overlay.style.cssText = "top: 50px";
  }

  addListeners() {
    this.element().addEventListener("mouseover", () => this.mouseOver());
    this.element().addEventListener("mouseout", () => this.mouseOut());
  }

  green() {
    let overlay = document.querySelector(`.${this.cellClass} + .overlay`);
    overlay.style.cssText = `top: 0px; background-color: green`;
  }

  hasQueen() {
    return this.element().innerHTML.includes("Q");
  }

}

module.exports = Cell;
