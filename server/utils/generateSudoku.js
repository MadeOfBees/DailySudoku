function generateSudoku(blankCount) {
    let board = new Array(9).fill().map(() => new Array(9).fill(0));
    if (backtrack(board)) {
      let cells = [].concat(...board);
      cells.sort(() => Math.random() - 0.5);
      return formatStringsToObjects(board, blankCount);
    }
    return false;
  }

  function formatStringsToObjects(board, blankCount) {
    // takes in a 2d array of strings and returns a 2d array of objects with a value and a boolean for whether or not the cell is shown to the user or not, pick those cells randomly
    let cells = [].concat(...board);
    cells.sort(() => Math.random() - 0.5);
    let blankCells = cells.slice(0, blankCount);
    let formattedBoard = board.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
            return { value: cell, isShown: !blankCells.includes(cell) };
        });
    });
    return formattedBoard;
    }
  
  function backtrack(board) {
    let emptyCell = findEmptyCell(board);
    if (!emptyCell) {
      return true;
    }
    let row = emptyCell.row;
    let col = emptyCell.col;
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (backtrack(board)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  }
  
  function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return {row, col};
        }
      }
    }
    return false;
  }
  
  function isValid(board, row, col, num) {
    return !usedInRow(board, row, num) && !usedInCol(board, col, num) && !usedInBox(board, row - row % 3, col - col % 3, num);
  }
  
  function usedInRow(board, row, num) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInCol(board, col, num) {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] == num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInBox(board, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row + boxStartRow][col + boxStartCol] == num) {
          return true;
        }
      }
    }
    return false;
  }
  
  
// Uncomment to generate new puzzle by hand
console.log(generateSudoku(10));

module.exports = { generateSudoku };