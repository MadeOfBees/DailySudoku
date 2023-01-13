import * as React from 'react';
import {Button, Modal, Box, Input } from '@mui/material';

const GameBoard = (props) => {
    const style = props.style;
    const puzzleWithShownVal = props.puzzle.map((row) => {return row.map((cell) => {return {shownValue: cell.isShown ? cell.value : '%',trueValue: cell.value,};});});
    const [currentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalValue, setModalValue] = React.useState('');
    const handleModalClose = () => {
        setModalValue("");
        setModalOpen(false);
    };
    const drawCell = (cell, cellIndex) => {
        return (
            <Button
                key={cellIndex}
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                {cell.shownValue}
            </Button>
        );
    };
    const drawBoard = (currentPuzzle) => {
        return currentPuzzle.map((row, rowIndex) => {
            return (
                <div key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                        return drawCell(cell, cellIndex);
                    })}
                </div>
            );
        });
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