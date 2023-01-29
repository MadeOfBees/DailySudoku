const generateSudoku = (blankSpaces) => {
  if (!blankSpaces) blankSpaces = 42;
  const puzzle = Array(9).fill(null).map(() => Array(9).fill(null));
  const isValid = (row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i] === num || puzzle[i][col] === num || puzzle[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
        return false;
      }
    }
    return true;
  }

  const shuffle = (array) => {
      let currentIndex = array.length,  randomIndex;
      while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
  }

  const fill = (row = 0, col = 0) => {
    if (row === 9) return true;
    if (puzzle[row][col]) return fill(col === 8 ? row + 1 : row, (col + 1) % 9);
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let num of nums) {
      if (isValid(row, col, num)) {
        puzzle[row][col] = num;
        if (fill(col === 8 ? row + 1 : row, (col + 1) % 9)) return true;
        puzzle[row][col] = null;
      }
    }
    return false;
  }
  fill();
  const puzzleWithShown = puzzle.map((row) => {
      return row.map((cell) => {
          return { value:cell, isShown: true };
      });
  });
  for (let i = 0; i < blankSpaces; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      puzzleWithShown[row][col].isShown = false;
  }
  const hasOnlyOneSolution = (puzzle) => {
    const isValid = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (puzzle[row][i].value === num || puzzle[i][col].value === num || puzzle[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3].value === num) {
          return false;
        }
      }
      return true;
    }
    const fill = (row = 0, col = 0) => {
      if (row === 9) return true;
      if (puzzle[row][col].value) return fill(col === 8 ? row + 1 : row, (col + 1) % 9);
      for (let num = 1; num < 10; num++) {
        if (isValid(row, col, num)) {
          puzzle[row][col].value = num;
          if (fill(col === 8 ? row + 1 : row, (col + 1) % 9)) return true;
          puzzle[row][col].value = null;
        }
      }
      return false;
    }
    let count = 0;
    const countSolutions = (row = 0, col = 0) => {
      if (row === 9) return count++;
      if (puzzle[row][col].value) return countSolutions(col === 8 ? row + 1 : row, (col + 1) % 9);
      for (let num = 1; num < 10; num++) {
        if (isValid(row, col, num)) {
          puzzle[row][col].value = num;
          countSolutions(col === 8 ? row + 1 : row, (col + 1) % 9);
          puzzle[row][col].value = null;
        }
      }
    }
    countSolutions();
    return count === 1;
  }
  if (hasOnlyOneSolution(puzzleWithShown)) return puzzleWithShown;
  else return generateSudoku(blankSpaces);
}

module.exports = {generateSudoku}
