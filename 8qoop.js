class Cell {
  constructor(coords) {
    this.row = coords[0];
    this.col = coords[1];
    this.queenCoords = [];
    this.className = `square cell-${this.row}-${this.col}`
  }


  div() {
    return `<div class="square cell-${this.row}-${this.col}"></div>`;
  }

  element() {
    return document.getElementsByClassName(this.className)[0];
  }

  markCell() {
    if (!this.element().className.includes("selected")) {
      this.element().className += " selected";
      this.className += " selected";
    }
    // console.log(this.className);
  }



  markCol() {
    let [row, col] = this.cellCoordsInt();
    for (let i = 0; i < cellArr.length; i++) {
      let thisCell = cellArr[i][col];
      thisCell.markCell();
    }
  }

  isSafe() {
    return !this.className.includes("selected");
  }


  evaluate() {
    // console.log(this.cellAt());
    // console.log(this.isSafe());
    console.log(this.element());
    console.log(this.isSafe());
    if (this.isSafe()) {
      this.placeQueen();
    }
  }

  placeQueen() {
    this.element().innerHTML = "<p>Q</p>";
    this.markCell();
    this.markCol();
  }



  cellCoordsInt() {
    let coords = this.className.match(/\d+/g);
    return [parseInt(coords[0]), parseInt(coords[1])];
  }
}

cell = new Cell([0,0]);
cell2 = new Cell([1,0]);

// let flashInterval;
// let flashTimeout;
function stopBlink() {
  clearInterval(flashInterval);
}

function toggleSelect(cell) {

  let classes = cell.className;
  classes = classes.split(" ");
  if (!classes.includes("hilite")) {
    cell.className += " hilite";
  } else {
    classes = classes.filter(thisClass => thisClass !== "hilite");
    cell.className = classes.join(" ");
  }
}



// document.body.innerHTML += cell.div();
// document.body.innerHTML += cell2.div();

Cell.prototype.blink = function() {
  function cellFx(cell) {
    toggleSelect(cell);
    let flashInterval = setInterval(() => toggleSelect(cell), 200);
    let flashTimeout = setTimeout(() => clearInterval(flashInterval), 2000);
    toggleSelect(cell);
  }
  cellFx(this.cellAt());
  // console.log(this);
}



let cellArr = [], rowArr = [];
function generateBoardHTML(n) {
  let gridHtml ="";
  for (let j = 0; j < n; j++) {
    let rowHtml = "<div class=\"row\">";
    rowArr = [];
    for (let i = 0; i < n; i++) {
      let cell = new Cell([j, i]);
      rowArr.push(cell);
      rowHtml += cell.div();
    }
    cellArr.push(rowArr);
    rowHtml += "</div>";
    gridHtml += rowHtml;
  }
  document.body.innerHTML = gridHtml;
}

generateBoardHTML(4);

function evalCol(col) {
  let cell;
  let x = 0;
  let y = col;
  let blinkInterval = setInterval(() => {
    if (x < cellArr.length) {
      cell = cellArr[x][y];
      console.log(cell);
      cell.evaluate();
      x += 1;
  } else {
      clearInterval(blinkInterval);
      console.log("end");
    }
  }, 2000);
}

evalCol(0);
