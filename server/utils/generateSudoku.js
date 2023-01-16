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
    puzzle = puzzle.replace(/(.)/g, '$1 ');
    puzzle = puzzle.slice(0, -1);
    return (genPuzzle(puzzle, creatPuzzWBlanks(puzzle, 10)));
}

function creatPuzzWBlanks(puzzle, blankCount) {
    let puzzleNoBlank = puzzle.replace(/\s/g, '');
    for (let i = 0; i < blankCount; i++) {
        let rand = Math.floor(Math.random() * puzzleNoBlank.length);
        while (puzzleNoBlank[rand] === 'X') {
            rand = Math.floor(Math.random() * puzzleNoBlank.length);
        }
        puzzleNoBlank = puzzleNoBlank.slice(0, rand) + 'X' + puzzleNoBlank.slice(rand + 1);
    }
    puzzleNoBlank = puzzleNoBlank.replace(/(.{9})/g, '$1\n');
    puzzleNoBlank = puzzleNoBlank.replace(/(.)/g, '$1 ');
    puzzleNoBlank = puzzleNoBlank.slice(0, -1);
    console.log(puzzleNoBlank);
    return puzzleNoBlank;
}

function isValid(puzzle, row, col, num) {
    puzzle = puzzle.replace(/(.)/g, '$1 ');
    let puzzleArr = puzzle.split("\n");
    puzzleArr = puzzleArr.map((row) => row.split(" "));
    const computeRow = puzzleArr[row]
    if (computeRow.includes(num.toString())) {
        return false;
    }
    // Check column
    // Check box
    return true;
}

function updatePuzzle(puzzle, row, col, num) {
    let newPuzzle = puzzle.split('');
    newPuzzle[row * 10 + col] = num;
    return newPuzzle.join('');
}

function genPuzzle(solved, unsolved) {
    let solvedArr = solved.split("\n");
    let unsolvedArr = unsolved.split("\n");
    solvedArr = solvedArr.map((row) => row.split(" "));
    unsolvedArr = unsolvedArr.map((row) => row.split(" "));
    solvedArr = solvedArr.map((row) => row.filter((val) => val !== ""));
    unsolvedArr = unsolvedArr.map((row) => row.filter((val) => val !== ""));
    solvedArr = solvedArr.map((row) => row.map((val) => parseInt(val)));
    unsolvedArr = unsolvedArr.map((row) => row.map((val) => val));
    let finalArr = [];
    for (let i = 0; i < 9; i++) {
        let innerArr = [];
        for (let j = 0; j < 9; j++) {
            innerArr.push({
                value: solvedArr[i][j],
                isBlank: (unsolvedArr[i][j] === 'X')
            });
        }
        finalArr.push(innerArr);
    }
    return finalArr;
}
// Uncomment to generate new puzzle by hand
generateSudoku().then(console.log);

module.exports = { generateSudoku };