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
    return `<div class="square cell-${this.row}-${this.col}">
              <div class="overlay"></div>
            </div>`;
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

  bah() {
    let selector = `.${this.className.split(" ").join(".")} .overlay`;
    // console.log(selector);
    let overlay = document.querySelector(selector);
    let color = this.isSafe() ? "green" : "red";
    overlay.style.cssText = `margin-top: 0px; background-color: ${color}`;
  }

  hah() {
    let selector = `.${this.cellClass} .overlay`

    // console.log(this);
    let overlay = document.querySelector(selector);
    // console.lo
    overlay.style.cssText = "margin-top: 100px";
  }

  test() {
    this.element().addEventListener("mouseenter", () => this.bah());
    this.element().addEventListener("mouseleave", () => this.hah());
  }
}

module.exports = Cell;
