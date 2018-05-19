let Instructions = require('./instructions.js');
let Board = require('./board.js');

function execute(board, coords, action){
  let [row, col] = coords;
  let cell = board.cells[row][col];
  if (action === "place") {
    board.placeQueen(cell);
  } else if (action === "remove") {
    board.removeQueen(cell);
  }
}


let board;
let numSquares;
let instructions;
let dir;
let actions;
let select = document.querySelector('.num-squares');
let evalInterval;
function solve() {
  // animate.removeEventListener("click");
  let i = 0;
  evalInterval = setInterval(() => {
      if (i < actions.length) {
        let [action, coords] = [actions[i][0], actions[i][1]];
        execute(board, coords, action);
        i += 1;
  } else {
      animate.removeAttribute("disabled");
      clearInterval(evalInterval);
    }
  }, 200);

}
function setup() {
  numSquares = select.value;
  instructions = new Instructions(numSquares);
  instructions.solveNQ();
  dir = instructions.instr;
  actions = dir.filter(x => x[0] !== "evaluate");
  board = new Board(numSquares);
}


setup();
select.addEventListener("change", () => {
    setup()
});

let animate = document.querySelector('.animate');
animate.addEventListener("click", () => {
  animate.setAttribute("disabled", "disabled");
  solve();
});
let reset = document.querySelector('.reset');

reset.addEventListener("click", () => {
  clearInterval(evalInterval);
  board = new Board(numSquares);
  animate.removeAttribute("disabled");
});
