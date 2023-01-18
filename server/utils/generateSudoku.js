const generateSudoku = (blankSpaces) => {
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
        // yates shuffle (like the Harlem Shuffle but more CS)
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
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        puzzle[i][j] = { value: puzzle[i][j] || 'X', isShown: true }
      }
    }
    for (let i = 0; i < blankSpaces; i++) {
      let x = Math.floor(Math.random() * 9);
      let y = Math.floor(Math.random() * 9);
      puzzle[x][y].isShown = false;
    }
    return puzzle;
  }
  

console.log(generateSudoku(20));
module.exports = {generateSudoku}