//TODO: Make this a iffe or class

/* #region Variables */
// User Data
const defaultTick = "";
const boardSize = 3;
// Possibility to make generic nxn game in future.
let board = Array.apply(null, Array(boardSize)).map((x, e) =>
  Array.apply(null, Array(boardSize)).map((x, i) => `${defaultTick}`)
);

/* #endregion */

/* #region Events start */

function updateBoard(rowIndex, colIndex, type) {
  // Update board
  board[rowIndex][colIndex] = type;
  // Check game completion
  return getGameStatus(rowIndex, colIndex);
}

// Check if the values are same and are not equal to the default value.
function areSuccessValues(valuesList) {
  // console.log(valuesList.join(" / "));
  return new Set(valuesList).size === 1 && valuesList[0] !== defaultTick;
}

/* #endregion */

/* #region Utilities */

function isDiagonalElement(rowIndex, colIndex) {
  return rowIndex === colIndex;
}

function isAntiDiagonalElement(rowIndex, colIndex) {
  return rowIndex + colIndex === boardSize - 1;
}

/* #endregion */

function getGameStatus(rowIndex, colIndex) {
  // Game status object
  let res = {
    won: false,
    winRow: null,
    winCol: null,
    diagonalWin: false,
    antiDiagonalWin: false,
    emptyValueExists: true,
  };

  // Row check
  if (!res.won) {
    // console.log("row check");
    areSuccessValues(board[rowIndex]) &&
      (res.won = true) &&
      (res.winRow = rowIndex);
  }

  // Col check
  if (!res.won) {
    // console.log("col check");

    areSuccessValues(board.map((r, i) => r[colIndex])) &&
      (res.won = true) &&
      (res.winCol = colIndex);
  }

  // Diagonal check
  if (!res.won && isDiagonalElement(rowIndex, colIndex)) {
    // console.log("diag check");

    areSuccessValues(
      board.map((r, i) => {
        return r[i];
      })
    ) && (res.diagonalWin = res.won = true);
  }

  // Anti diagonal check
  if (!res.won && isAntiDiagonalElement(rowIndex, colIndex)) {
    // console.log("anti diag check");

    areSuccessValues(board.map((r, i) => r[Math.abs(2 - i)])) &&
      (res.antiDiagonalWin = res.won = true);
  }

  // Check if all cells are filled?
  res.emptyValueExists = board
    .reduce((acc, curr) => acc.concat(curr), [])
    .some((v) => v === "");

  // console.log(JSON.stringify(res, null, 4));
  return res;
}

/* #region On Win UI Highlighters.. TODO:Need work. */

function onRowWin(rowIndex) {}
function onColWin(colIndex) {}
function onDiagonalWin() {}
function onAntiDiagonalWin() {}

function updateSuccessCells() {}

/* #endregion */

export { updateBoard };
