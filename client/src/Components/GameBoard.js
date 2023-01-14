import * as React from 'react';
import { Button, Modal, Box } from '@mui/material';
document.body.style.overflow = 'hidden';

const GameBoard = (dataCrate) => {
    const style = dataCrate.style;
    const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown }; }); });
    const [currentPuzzle, setCurrentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentCell, setCurrentCell] = React.useState('');
    const handleModalClose = () => {setModalOpen(false);};
    const drawCell = (cell, cellIndex, rowIndex) => {
        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
        return (
            <div key={cellIndex} id={cellName} style={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5REM', height: "5REM" }} onClick={() => { cellChangeModal(cellName); }}>
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
        </div>
    );
};

export default GameBoard;