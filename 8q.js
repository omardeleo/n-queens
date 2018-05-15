var n = 8;
// let textField = document.querySelector()
function isSafe(cell) {
  return !cell.className.includes("selected");
}

let queenCoords = [];

function generateBoard(n) {
  let board = [];
  for (let i=0; i<n; i++) {
    board[i] = [];
    for (let j=0; j<n; j++){
      board[i][j] = 0;
    }
  }
  return board;
}

function cellCoords(cell) {
  return cell.className.match(/\d+/g);
}

function cellCoordsInt(cell) {
  let coords = cell.className.match(/\d+/g);
  return [parseInt(coords[0]), parseInt(coords[1])];
}

function cellAt(coords) {
  const className = "cell-" + String(coords[0]) + "-" + String(coords[1]);
  return document.getElementsByClassName(className)[0];
}

function markCell(cell) {
  if (!cell.className.includes("selected")) {
    cell.className += " selected";
  }
}

function selectRow(cell) {
  let [row, col] = cellCoordsInt(cell);
  for (i = 0; i < n; i++) {
    let thisCell = cellAt([row, i]);
    markCell(thisCell);
  }
}

function selectCol(cell) {
  let [row, col] = cellCoordsInt(cell);
  for (i = 0; i < n; i++) {
    let thisCell = cellAt([i, col]);
    markCell(thisCell);
  }
}

function selectDiag(cell) {
  let [row, col] = cellCoordsInt(cell);
  for (i = row, j = col; i >= 0 && j < n; i--, j++) {
    let thisCell = cellAt([i,j]);
    markCell(thisCell);
  }
  for (i = row, j = col; i < n && j < n; i++, j++) {
    let thisCell = cellAt([i,j]);
    markCell(thisCell);
  }
}



function sameVal(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function clear(cell) {
  if (cell.className.includes("selected")) {
    cell.className = cell.className.slice(0,(-"selected".length) - 1);
  }
}

function clearRow(cell) {
  let [row, col] = cellCoordsInt(cell);
  for (i = 0; i < n; i++) {
    let thisCell = cellAt([row, i]);
    clear(thisCell);
  }
}

function clearCol(cell) {
  let [row, col] = cellCoordsInt(cell);
  for (i = 0; i < n; i++) {
    let thisCell = cellAt([i, col]);
    clear(thisCell);
  }
}

function clearDiag(cell) {
  let [row, col] = cellCoordsInt(cell);
  for (i = row, j = col; i >= 0 && j < n; i--, j++) {
    let thisCell = cellAt([i,j]);
    clear(thisCell);
  }
  for (i = row, j = col; i < n && j < n; i++, j++) {
    let thisCell = cellAt([i,j]);
    clear(thisCell);
  }
}

function selectAll(cell){
  selectRow(cell);
  selectCol(cell);
  selectDiag(cell);
}

function removeQueen(cell) {
  let [row, col] = cellCoordsInt(cell);
  cell.innerHTML = "";
  queenCoords = queenCoords.filter(coords => !sameVal(coords, [row, col]));
  clear(cell);
  clearRow(cell);
  clearCol(cell);
  clearDiag(cell);
  queenCoords.map(coords => selectAll(cellAt(coords)));
}

function generateBoardHTML(n) {
  let gridHtml ="";
  for (let j = 0; j < n; j++) {
    let rowHtml = "<div class=\"row\">";
    for (let i = 0; i < n; i++) {
      rowHtml += "<div class=\"square cell-" + j + "-" + i +"\"></div>";
    }
    rowHtml += "</div>";
    gridHtml += rowHtml;
  }
  document.body.innerHTML = gridHtml;
}

function setUp(n) {
  generateBoardHTML(n);
  let cells = Array.from(document.getElementsByClassName("square"));
  cells.map( a => a.addEventListener("click", clickCell));
}


function clickCell() {
  if (this.innerHTML.includes("Q")) {
    removeQueen(this);
  } else {
    placeQueen(this);
  }
  toggleSelect(this);
}

function autoSolveNQ() {
  setUp(n);
  let cell = cellAt([0,0]);
  let toggle = toggleSelect.bind(cell);
  let cellFlash = setInterval(toggle, 750);
}

// setUp(n);

// let contLoop = false;

// document.addEventListener('keydown', (event) => {
//   const keyName = event.key;
//   if (keyName === 'Enter') {
//     contLoop = true;
//   }
// });

function placeQueen() {
  if (isSafe(this)) {
    this.innerHTML = "<p>Q</p>";
    markCell(this);
    let [row, col] = cellCoordsInt(this);
    selectRow(this);
    selectCol(this);
    selectDiag(this);
    queenCoords = queenCoords.concat([[row, col]]);
  }
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




function solveNQUtil(col) {
  if (col >= n) return true;
  for (let i = 0; i < n; i++) {
    let cell = cellAt([i, col]);
    // console.log(cell);
    evaluateCell(cell);
    // if (isSafe(cell)) {
    //   placeQueen.call(cell);
    //   if (solveNQUtil(col+1) === true)
    //     return true;
    //   removeQueen(cell);
    // }
  }
  return false;

  // let cell = cellAt([0, col]);
  //  evaluateCell(cell);
}

function solveNQ() {
  setUp(n);
  if (solveNQUtil(0) === false) {
    console.log("Solution does not exist");
    return false;
  }
}
//
// function evaluateCell(cell) {
//   console.log(cell);
//   toggleSelect(cell);
//   let flashInterval = setInterval(() => toggleSelect(cell), 200);
//   let flashTimeout = setTimeout(() => {
//     clearInterval(flashInterval);
//     if (isSafe(cell)) {
//       placeQueen.call(cell);
//       x = 0;
//       y += 1;
//     } else if (x === n) {
//       y += 1;
//       x = 0;
//     } else {
//       x += 1;
//     }
//
//   }, 1000);
//   // toggleSelect(cell);
// }
let flashInterval;
let flashTimeout;
function stopBlink() {
  clearInterval(flashInterval);

}

function cellFx(cell) {
  toggleSelect(cell);
  flashInterval = setInterval(() => toggleSelect(cell), 200);
  flashTimeout = setTimeout(stopBlink, 1000);
}
//
function evaluateCell(cell) {
  cellFx(cell);
  // callback();
}

function nextCell() {
  console.log("exec?");
  cellFx(cellAt([x + 1, colNum]), nextCell);
}

n = 2;
setUp(n);
let x;
// let col = 0;
let colNum;
// next1 = () => x += 1;
function evalCol(col) {
  colNum = col;
  x = 0;
  let cell = cellAt([x,col]);
  if (x < n) {
    console.log("1");
    cellFx(cell, nextCell);
  }

}

// evalCol(0);
// cellFx(cellAt([0,0]));
// evalCol(0);

// evaluateCell(cellAt([0,0]), thing);
