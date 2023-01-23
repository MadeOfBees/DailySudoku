import * as React from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GameBoard = (dataCrate) => {
    const theme = useTheme();
    const style = dataCrate.style;
    const toBeSquare = { ...style, width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '37%', position: 'absolute' };
    const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown }; }); });
    const [currentPuzzle, setCurrentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentCell, setCurrentCell] = React.useState('');
    const handleModalClose = () => { setModalOpen(false); };
    const [gradeModal, setGradeModal] = React.useState(false);
    const [gradeOutput, setGradeOutput] = React.useState('');
    const handleGradeModalClose = () => { setGradeModal(false); };
    const [resetModal, setResetModal] = React.useState(false);
    const handleResetModalClose = () => { setResetModal(false); };
    
    const handleReset = () => {
        const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown }; }); });
        setCurrentPuzzle(puzzleWithShownVal);
        setResetModal(false);
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'r') {
                setResetModal(!resetModal);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [resetModal]);

    const drawCell = (cell, cellIndex, rowIndex, textSize, textColor) => {
        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
        const color = !cell.isShown ? theme.palette.primary.main : cell.color ? cell.color : textColor;
        return (
            <div key={cellIndex} id={cellName} style={{ display: 'flex', justifyContent: 'center', color: color, fontSize: textSize }} onClick={() => { cellChangeModal(cellName); }}>
                {cell.shownValue}
            </div>
        );
    };

    const drawBoard = (currentPuzzle) => {
        const divsize = (window.innerWidth > 900) ? '650px' : (window.innerWidth > 550) ? '500px' : '376px';
        const textSize = (window.innerWidth > 900) ? '2.8em' : (window.innerWidth > 550) ? '2.1em' : '1.4em';
        const boardCrayon = theme.palette.mode === 'dark' ? "DarkGray" : "black";
        const thinBorder = `thin solid ${boardCrayon}`
        const thickBorder = `thick solid ${boardCrayon}`
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(9, 1fr)', gridColumnGap: 0, gridRowGap: 0, width: divsize, height: divsize, border: thickBorder }}>
                {currentPuzzle.flat().map((cell, index) => {
                    const rowIndex = Math.floor(index / 9);
                    const cellIndex = index % 9;
                    const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
                    return (
                        <div key={index} id={cellName} style={{ border: thinBorder, borderRight: (cellIndex === 2 || cellIndex === 5) ? thickBorder : thinBorder, borderBottom: (rowIndex === 2 || rowIndex === 5) ? thickBorder : thinBorder }} onClick={() => { cellChangeModal(cellName); }}>
                            {drawCell(cell, cellIndex, rowIndex, textSize, boardCrayon)}
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
        const newPuzzle = puzzle.map((row) => { return row.map((cell) => { return { ...cell, color: 'Chartreuse', isShown: true }; }); });
        setCurrentPuzzle(newPuzzle);
    };

    const handleLoseGame = (puzzle) => {
        const newPuzzle = puzzle.map((row) => {
            return row.map((cell) => {
                if (!cell.isShown) return { ...cell, color: cell.trueValue === cell.shownValue ? 'Chartreuse' : 'red', isShown: true };
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
        <div style={{ top: '5%', position: 'absolute' }}>
            {drawBoard(currentPuzzle)}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={toBeSquare}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gridGap: '5px' }}>
                        {Array.from({ length: 9 }, (_, i) => (<Button style={{ width: "75px", height: "75px" }} key={i} variant="contained" onClick={() => handleModalSubmit(i + 1)}>{i + 1}</Button>))}
                    </div>
                </Box >
            </Modal >
            <Modal open={gradeModal} onClose={handleGradeModalClose}>
                <Box sx={style}>
                    <h1>{gradeOutput}</h1>
                </Box >
            </Modal >
            <Modal open={resetModal} onClose={handleResetModalClose}>
                <Box sx={style} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h3>Are you sure you want to reset?</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                        <Button style={{ width: "100px", height: "50px" }} variant="contained" onClick={handleReset}>Yes</Button>
                        <Button style={{ width: "100px", height: "50px" }} variant="contained" onClick={handleResetModalClose}>No</Button>
                    </div>
                </Box >
            </Modal >
        </div>
    );
};

export default GameBoard;