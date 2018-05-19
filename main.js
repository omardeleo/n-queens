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
