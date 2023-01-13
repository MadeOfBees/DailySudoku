import * as React from 'react';
import {Button, Modal, Box, Input } from '@mui/material';

const GameBoard = (props) => {
    const style = props.style;
    const puzzleWithShownVal = props.puzzle.map((row) => {return row.map((cell) => {return {shownValue: cell.isShown ? cell.value : '⠀',trueValue: cell.value,};});});
    const [currentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalValue, setModalValue] = React.useState('');
    document.body.style.overflow = 'hidden';
    const handleModalClose = () => {
        setModalValue("");
        setModalOpen(false);
    };
    const drawCell = (cell, cellIndex, rowIndex) => {
        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex+1}`;
        return (
            <div key={cellIndex} className={cellName} style={{border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5REM', height : "5REM"}} onClick={() => {setModalOpen(true);}}>
                {cell.shownValue}
            </div>
        );
    };
    const drawBoard = (currentPuzzle) => {
        return (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                {currentPuzzle.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => {
                        return (
                            drawCell(cell, cellIndex, rowIndex)
                        );
                    });
                })}
            </div>
        );
    };
    
    const handleModalSubmit = () => {

    };

    return (
        <div>
            {drawBoard(currentPuzzle)}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={style}>
                    <Input value={modalValue} onChange={(event) => setModalValue(event.target.value)} />
                    <Button onClick={handleModalSubmit}>Submit</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default GameBoard;