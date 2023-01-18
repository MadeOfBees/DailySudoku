import * as React from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './GameBoard.css'
document.body.style.overflow = 'hidden';

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
        return (
            <div key={cellIndex} id={cellName} style={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5REM', height: "5REM", color: !cell.isShown ? theme.palette.primary.main : theme.palette.text.secondary }} onClick={() => { cellChangeModal(cellName); }}>
                {cell.shownValue}
            </div>
        );
    };

    const drawBoard = (currentPuzzle) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                {currentPuzzle.map((row, rowIndex) => { return row.map((cell, cellIndex) => { return (drawCell(cell, cellIndex, rowIndex)); }); })}
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

    const handleWin = (GameStatus, puzzle) => {
        handleEndGame(puzzle);
        setGradeOutput(GameStatus ? 'You Win!' : 'You Lose!');
        setGradeModal(true);
    };

    const handleEndGame = (updatedPuzzle) => {
        const updatedPuzzleWithShownVal = updatedPuzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.shownValue, trueValue: cell.trueValue, isShown: true }; }); });
        setCurrentPuzzle(updatedPuzzleWithShownVal);
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