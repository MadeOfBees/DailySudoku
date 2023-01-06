import * as React from 'react';
import { Grid, Stack, Button, Modal, Box, Input } from '@mui/material';

const GameBoard = (props) => {
    const style = props.style;
    const puzzleWithShownVal = props.puzzle.map((chunk) => { return chunk.map((cell) => { return { ...cell, shownAs: cell.value }; }); });
    const [currentPuzzle, setCurrentPuzzle] = React.useState({ puzzle: puzzleWithShownVal });
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalValue, setModalValue] = React.useState('');
    const [currentCell, setCurrentCell] = React.useState({ chunk: 0, number: 0 });
    React.useEffect(() => { drawBoard(currentPuzzle); }, [currentPuzzle]);

    const DrawCell = ({ number, chunk }) => {
        const shownPuzzle = currentPuzzle.puzzle;
        const currentChunk = shownPuzzle[chunk - 1];
        const cell = currentChunk[number - 1];
        console.log(cell);
        if (cell.isCovered) {
            return (
                <div>
                    <Button style={{ padding: '30%' }} onClick={() => {
                        handleButtonClick(number - 1, chunk - 1);
                    }}>⠀</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <Button style={{ padding: '30%' }}>{cell.shownAs}</Button>
                </div>
            );
        }
    };

    const DrawChunk = ({ number }) => {
        const grids = [];
        for (let i = 0; i < 3; i++) {
            grids.push(
                <Grid key={i} container spacing={1}>
                    <Grid item xs={4}>
                        <DrawCell number={number} chunk={i * 3 + 1} />
                    </Grid>
                    <Grid item xs={4}>
                        <DrawCell number={number} chunk={i * 3 + 2} />
                    </Grid>
                    <Grid item xs={4}>
                        <DrawCell number={number} chunk={i * 3 + 3} />
                    </Grid>
                </Grid>
            );
        }
        return <Stack key={number}>{grids}</Stack>;
    };

    const drawBoard = () => {
        const chunks = [];
        for (let i = 0; i < 3; i++) {
            chunks.push(
                <Grid key={i} container spacing={1}>
                    <Grid item xs={4}>
                        <DrawChunk number={i * 3 + 1} />
                    </Grid>
                    <Grid item xs={4}>
                        <DrawChunk number={i * 3 + 2} />
                    </Grid>
                    <Grid item xs={4}>
                        <DrawChunk number={i * 3 + 3} />
                    </Grid>
                </Grid>
            );
        }
        return <Stack>{chunks}</Stack>;
    };

    const handleModalSubmit = () => {
        const currentCellNumber = currentCell.number;
        const currentCellChunk = currentCell.chunk;
        const newPuzzle = currentPuzzle.puzzle;
        newPuzzle[currentCellChunk][currentCellNumber].shownAs = modalValue;
        setCurrentPuzzle({ puzzle: newPuzzle });
        setModalValue("");
        setModalOpen(false);
    };

    const handleModalClose = () => {
        setModalValue("");
        setModalOpen(false);
    };


    const handleButtonClick = (number, chunk) => {
        setModalOpen(true);
        setCurrentCell({ number: number, chunk: chunk });
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