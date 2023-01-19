import * as React from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './GameBoard.css'

const GameBoard = (dataCrate) => {
    const theme = useTheme();
    const style = dataCrate.style;
    const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown }; }); });
    const [currentPuzzle, setCurrentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentCell, setCurrentCell] = React.useState('');
    const handleModalClose = () => { setModalOpen(false); };
    const [gradeModal, setGradeModal] = React.useState(false);
    const [gradeOutput, setGradeOutput] = React.useState('');
    const handleGradeModalClose = () => { setGradeModal(false); };

    const drawCell = (cell, cellIndex, rowIndex) => {
        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
        let color = theme.palette.text.secondary;
        if (!cell.isShown) color = theme.palette.primary.main;
        if (cell.color) color = cell.color;
        return (
            <div key={cellIndex} id={cellName} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5REM', height: "REM", color: color }} onClick={() => { cellChangeModal(cellName); }}>
                {cell.shownValue}
            </div>
        );
    };

    const drawBoard = (currentPuzzle) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(9, 1fr)', gridColumnGap: 0, gridRowGap: 0 }}>
                {currentPuzzle.flat().map((cell, index) => { 
                    const rowIndex = Math.floor(index / 9);
                    const cellIndex = index % 9;
                    const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
                    return (
                        <div key={index} id={cellName} style={{border: 'thin solid black', borderRight: (cellIndex === 2 || cellIndex === 5) ? 'thick solid black' : 'thin solid black', borderBottom: (rowIndex === 2 || rowIndex === 5) ? 'thick solid black' : 'thin solid black'}} onClick={() => { cellChangeModal(cellName); }}>
                            {drawCell(cell, cellIndex, rowIndex)}
                        </div>
                    );
                })}
            </div>
        );
    };
    
    const cellChangeModal = (cellName) => {
        if (currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].shownValue === '⠀' || !currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].isShown) {
            setCurrentCell(cellName);
            setModalOpen(true);
        };
    };

    const handleModalSubmit = (val) => {
        const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
                if (currentCell === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) { return { shownValue: val, trueValue: cell.trueValue }; } return cell;
            });
        });
        setCurrentPuzzle(updatedPuzzle);
        handleModalClose();
        setCurrentCell('');
        checkBoardState(updatedPuzzle);
    };

    const handleWin = (gameStatus, puzzle) => {
        if (gameStatus) {
            handleWinGame(puzzle);
            setGradeOutput('You Win!');
            setGradeModal(true);
        } else {
            handleLoseGame(puzzle);
            setGradeOutput('You Lose!');
            setGradeModal(true);
        }
    };

    const handleWinGame = (puzzle) => {
        const newPuzzle = puzzle.map((row) => { return row.map((cell) => { return { ...cell, color: 'green', isShown: true }; }); });
        setCurrentPuzzle(newPuzzle);
    };

    const handleLoseGame = (puzzle) => {
        const newPuzzle = puzzle.map((row) => {
            return row.map((cell) => {
                if (!cell.isShown) return { ...cell, color: cell.trueValue === cell.shownValue ? 'green' : 'red', isShown: true };
                else return cell;
            });
        });
        setCurrentPuzzle(newPuzzle);
    };


    const checkBoardState = (updatedPuzzle) => {
        const allCellsHaveShownValues = updatedPuzzle.every((row) => { return row.every((cell) => { return cell.shownValue !== '⠀'; }); });
        if (allCellsHaveShownValues) {
            const allCellsHaveCorrectValues = updatedPuzzle.every((row) => { return row.every((cell) => { return cell.shownValue === cell.trueValue; }); });
            handleWin(allCellsHaveCorrectValues, updatedPuzzle);
        }
    };

    return (
        <div>
            {drawBoard(currentPuzzle)}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={style}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gridGap: '5px' }}>
                        {Array.from({ length: 9 }, (_, i) => (<Button key={i} variant="contained" onClick={() => handleModalSubmit(i + 1)}>{i + 1}</Button>))}
                    </div>
                </Box >
            </Modal >
            <Modal open={gradeModal} onClose={handleGradeModalClose}>
                <Box sx={style}>
                    <p>{gradeOutput}</p>
                </Box >
            </Modal >
        </div>
    );
};

export default GameBoard;