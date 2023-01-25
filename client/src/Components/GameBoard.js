import * as React from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GameBoard = (dataCrate) => {
    const theme = useTheme();
    const style = dataCrate.style;
    const toBeSquare = { ...style, width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '37%', position: 'absolute' };
    const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown, notes: "" }; }); });
    const [currentPuzzle, setCurrentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentCell, setCurrentCell] = React.useState('');
    const [currentCellNotes, setCurrentCellNotes] = React.useState(' ');
    const handleModalClose = () => { setModalOpen(false); };
    const [gradeModal, setGradeModal] = React.useState(false);
    const [gradeOutput, setGradeOutput] = React.useState('');
    const handleGradeModalClose = () => { setGradeModal(false); };
    const [resetModal, setResetModal] = React.useState(false);
    const handleResetModalClose = () => { setResetModal(false); };
    const [writeMode, setWriteMode] = React.useState(1);
    const [gameHasStarted, setGameHasStarted] = React.useState(false);
    const [gameTimer, setGameTimer] = React.useState(0);

    const handleReset = () => {
        const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown, notes: "" }; }); });
        setCurrentPuzzle(puzzleWithShownVal);
        setResetModal(false);
        setGameHasStarted(false);
        setGameTimer(0);
    };

    const cycleWriteMode = React.useCallback(() => {
        if (writeMode < 3) {
            setWriteMode(writeMode + 1);
        } else {
            setWriteMode(1);
        }
    }, [writeMode]);


    const drawCell = (cell, cellIndex, rowIndex, textSize, textColor) => {
        const noteTextSize = (window.innerWidth > 900) ? '.9rem' : (window.innerWidth > 550) ? '.7REM' : (window.innerWidth > 375) ? '.5REM' : '.37REM';
        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
        const playerCellColor = cell.notes ? theme.palette.secondary.main : theme.palette.primary.main;
        const color = !cell.isShown ? playerCellColor : cell.color ? cell.color : textColor;
        const notesArray = cell.notes ? parseInt(cell.notes).toString().split('') : [];
        if (notesArray.length === 0) {
            return (
                <div key={cellName} style={{ color: color, fontSize: textSize, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {cell.shownValue}
                </div>
            );
        }
        return (
            <div key={cellName} style={{ color: color, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gridColumnGap: 0, gridRowGap: 0 }}>
                {notesArray.map((note) => {
                    return (
                        <div key={note} style={{ color: color, fontSize: noteTextSize, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {note}
                        </div>
                    );
                })}
            </div>
        );

    };

    const drawBoard = (currentPuzzle) => {
        const divsize = (window.innerWidth > 900) ? '650px' : (window.innerWidth > 550) ? '500px' : (window.innerWidth > 375) ? '350px' : '275px';
        const textSize = (window.innerWidth > 900) ? '2.8em' : (window.innerWidth > 550) ? '2em' : (window.innerWidth > 375) ? '1.3em' : '1.1em';
        const boardCrayon = theme.palette.mode === 'dark' ? "DarkGray" : "black";
        const thinBorder = `thin solid ${boardCrayon}`
        const thickBorder = `thick solid ${boardCrayon}`
        const noteButtonColor = writeMode === 1 ? theme.palette.primary.main : writeMode === 2 ? theme.palette.secondary.main : theme.palette.error.main;
        return (
            <main>
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
                <div style={{ display: 'flex', justifyContent: 'space-around', width: divsize, marginTop: '3.75%' }}>
                    <Button variant="contained" color="primary" style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.mode === 'dark' ? 'black':'white', width: '150px' }} onClick={() => { setResetModal(true); }}>Reset</Button>
                    <div style={{ width: '2%' }} />
                    <Button style={{ backgroundColor: noteButtonColor, color: theme.palette.mode === 'dark' ? 'black' : 'white', width: '150px' }} onClick={() => { cycleWriteMode(); }}>{writeMode === 1 ? 'Using Pen' : writeMode === 2 ? 'Using Pencil' : 'Using Eraser'}</Button>
                </div>
            </main>
        );
    };

    const cellChangeModal = (cellName) => {
        if (currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].shownValue === '⠀' || !currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].isShown) {
            if (writeMode !== 3) {
                setCurrentCell(cellName);
                const cellNotes = currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].notes;
                setCurrentCellNotes(cellNotes);
                setModalOpen(true);
            }
            else {
                const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => {
                        if (cellName === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) { return { shownValue: '⠀', trueValue: cell.trueValue, notes: "" }; } return cell;
                    });
                });
                setCurrentPuzzle(updatedPuzzle);
            }
        };
    };

    const handleModalSubmit = (val) => {
        setGameHasStarted(true);
        if (writeMode === 1) {
            const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
                return row.map((cell, cellIndex) => {
                    if (currentCell === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) { return { shownValue: val, trueValue: cell.trueValue, notes: "" }; } return cell;
                });
            });
            setCurrentPuzzle(updatedPuzzle);
            handleModalClose();
            setCurrentCell('');
            setCurrentCellNotes(' ');
            checkBoardState(updatedPuzzle);
        } else if (writeMode === 2) {
            const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
                return row.map((cell, cellIndex) => {
                    const cellAlreadyHasNote = cell.notes.toString().includes(val.toString());
                    if (currentCell === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) {
                        if (cellAlreadyHasNote) {
                            const updatedNotes = cell.notes.toString().replace(val.toString(), '');
                            return { shownValue: cell.shownValue, trueValue: cell.trueValue, notes: updatedNotes };
                        }
                        const updatedNotes = cell.notes.toString() + val.toString();
                        return { shownValue: cell.shownValue, trueValue: cell.trueValue, notes: updatedNotes };
                    } return cell;
                });
            });
            setCurrentPuzzle(updatedPuzzle);
            handleModalClose();
            setCurrentCell('');
        } else if (writeMode === 3) {
            console.log("how did you get here?")
        }
    };

    const handleWin = (gameStatus, puzzle) => {
        const timeAtWin = new Date(gameTimer * 1000).toISOString().substr(11, 8);
        if (gameStatus) {
            handleWinGame(puzzle);
            setGradeOutput(`You Win! Your time was ${timeAtWin}`);
            setGradeModal(true);
        } else {
            handleLoseGame(puzzle);
            setGradeOutput(`You Lose! Your time was ${timeAtWin}`);
            setGradeModal(true);
        }
        submitTime(gameStatus);
    };

    const submitTime = (gameStatus) => {
        fetch('/api/scores/new/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ didSolve: gameStatus, time: gameTimer }),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
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
            if (updatedPuzzle.flat().every((cell) => { return cell.notes === ''; })) {
                const allCellsHaveCorrectValues = updatedPuzzle.every((row) => { return row.every((cell) => { return cell.shownValue === cell.trueValue; }); });
                handleWin(allCellsHaveCorrectValues, updatedPuzzle);
            }
        }
    };

    React.useEffect(() => {
        if (!modalOpen) {
            const handleKeyDown = (event) => {
                if (event.key === 'r') {
                    setResetModal(!resetModal);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        };
    }, [resetModal, modalOpen]);

    React.useEffect(() => {
        if (!modalOpen) {
            const handleKeyDown = (event) => {
                if (event.key === 'm') {
                    cycleWriteMode();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [writeMode, cycleWriteMode, modalOpen]);

    React.useEffect(() => {
        if (modalOpen) {
            const handleKeyPress = (event) => {
                if (event.key >= 1 && event.key <= 9) {
                    handleModalSubmit(parseInt(event.key));
                }
            };
            document.addEventListener('keydown', handleKeyPress);
            return () => {
                document.removeEventListener('keydown', handleKeyPress);
            };
        }
    });

    React.useEffect(() => {
        if (resetModal) {
            const handleKeyPress = (event) => {
                if (event.key === 'Enter') {
                    handleReset();
                }
            };
            document.addEventListener('keydown', handleKeyPress);
            return () => {
                document.removeEventListener('keydown', handleKeyPress);
            };
        }
    });

    React.useEffect(() => {
        if (gameHasStarted) {
            const timer = setInterval(() => {
                setGameTimer((timer) => timer + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameHasStarted, gameTimer]);


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
            {drawBoard(currentPuzzle)}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={toBeSquare}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gridGap: '5px' }}>
                        {Array.from({ length: 9 }, (_, i) => (<Button style={{ width: "75px", height: "75px" }} key={i} variant="contained" color={writeMode && currentCellNotes.toString().includes((i + 1).toString()) ? 'grey' : 'primary'} onClick={() => handleModalSubmit(i + 1)}>{i + 1}</Button>))}
                    </div>
                </Box >
            </Modal >
            <Modal open={gradeModal} onClose={handleGradeModalClose}>
                <Box sx={style}>
                    <h3>{gradeOutput}</h3>
                </Box >
            </Modal >
            <Modal open={resetModal} onClose={handleResetModalClose}>
                <Box sx={style} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h3>Are you sure you want to reset?</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                        <Button style={{ width: "100px", height: "50px" }} variant="contained" onClick={handleResetModalClose}>No</Button>
                        <Button style={{ width: "100px", height: "50px" }} variant="contained" onClick={handleReset}>Yes</Button>
                    </div>
                </Box >
            </Modal >
        </div>
    );
};

export default GameBoard;