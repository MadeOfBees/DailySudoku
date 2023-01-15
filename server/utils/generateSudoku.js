async function generateSudoku() {
    let puzzle = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            puzzle += ".";
        }
        puzzle += "\n";
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let num = Math.floor(Math.random() * 9) + 1;
            while (!isValid(puzzle, i, j, num)) {
                num = Math.floor(Math.random() * 9) + 1;
            }
            puzzle = updatePuzzle(puzzle, i, j, num);
        }
    }
    return(genPuzzle(puzzle, creatPuzzWBlanks(puzzle, 10)));
}

function creatPuzzWBlanks(puzzle, blankCount) {
    let puzzWBlanks = puzzle;
    let count = 0;
    while (count < blankCount) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (puzzWBlanks[row * 10 + col] !== 'X') {
            puzzWBlanks = updatePuzzle(puzzWBlanks, row, col, 'X');
            count++;
        }
    }
    return puzzWBlanks;
}

function isValid(puzzle, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (puzzle[row * 10 + i] === num || puzzle[col + 10 * i] === num) {
            return false;
        }
    }
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (puzzle[i * 10 + j] === num) {
                return false;
            }
        }
    }
    return true;
}
function updatePuzzle(puzzle, row, col, num) {
    let newPuzzle = puzzle.split('');
    newPuzzle[row * 10 + col] = num;
    return newPuzzle.join('');
}

function genPuzzle(solved, unsolved) {
    let puzzle = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let obj = { value: solved[i * 9 + j], isShown: solved[i * 9 + j] === unsolved[i * 9 + j] };
            row.push(obj);
        }
        puzzle.push(row);
    }
    const stringPuzzle = JSON.stringify(puzzle);
    const finalFormattedPuzzle = stringPuzzle.replace(/(\r\n|\n|\r)/gm, "");
    return finalFormattedPuzzle;
}

return generateSudoku();