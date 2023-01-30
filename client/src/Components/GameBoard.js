import * as React from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import EraserIcon from '@mui/icons-material/HighlightOff';

const GameBoard = (dataCrate) => {
    const theme = useTheme();
    const style = dataCrate.style;
    const toBeSquare = { ...style, width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '37%', position: 'absolute' };
    const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown, notes: "" }; }); });
    const [currentPuzzle, setCurrentPuzzle] = React.useState(puzzleWithShownVal);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentCell, setCurrentCell] = React.useState('');
    const [currentCellNotes, setCurrentCellNotes] = React.useState(' ');
    const handleModalClose = (React.useCallback(() => { setModalOpen(false); setCurrentCell(' '); }, []));
    const [gradeModal, setGradeModal] = React.useState(false);
    const [gradeOutput, setGradeOutput] = React.useState('');
    const handleGradeModalClose = () => { setGradeModal(false); };
    const [resetModal, setResetModal] = React.useState(false);
    const handleResetModalClose = () => { setResetModal(false); };
    const [writeMode, setWriteMode] = React.useState(1);
    const [gameHasStarted, setGameHasStarted] = React.useState(false);
    const [gameTimer, setGameTimer] = React.useState(0);
    const [currentCellShownValue, setCurrentCellShownValue] = React.useState('⠀');

    const handleReset = () => {
        setResetModal(false);
        const puzzleWithShownVal = dataCrate.puzzle.map((row) => { return row.map((cell) => { return { shownValue: cell.isShown ? cell.value : '⠀', trueValue: cell.value, isShown: cell.isShown, notes: "" }; }); });
        setCurrentPuzzle(puzzleWithShownVal);
        setGameHasStarted(false);
        setGameTimer(0);
    };

    const shiftWriteModes = React.useCallback((i) => { if (writeMode !== i) { setWriteMode(i); } else { setWriteMode(1); } }, [writeMode]);

    const drawCell = (cell, cellIndex, rowIndex, textSize, textColor) => {
        const noteTextSize = (window.innerWidth > 900) ? '.9rem' : (window.innerWidth > 550) ? '.7REM' : (window.innerWidth > 375) ? '.5REM' : '.27REM';
        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
        const color = cell.notes ? theme.palette.warning.main : !cell.isShown ? theme.palette.primary.main : cell.color ? cell.color : textColor;
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
        return (
            <main>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(9, 1fr)', gridColumnGap: 0, gridRowGap: 0, width: divsize, height: divsize, border: `thick solid ${boardCrayon}` }}>
                    {currentPuzzle.flat().map((cell, index) => {
                        const rowIndex = Math.floor(index / 9);
                        const cellIndex = index % 9;
                        const cellName = `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`;
                        return (
                            <div key={index} id={cellName} style={{ border: `thin solid ${boardCrayon}`, borderRight: (cellIndex === 2 || cellIndex === 5) ? `thick solid ${boardCrayon}` : `thin solid ${boardCrayon}`, borderBottom: (rowIndex === 2 || rowIndex === 5) ? `thick solid ${boardCrayon}` : `thin solid ${boardCrayon}` }} onClick={() => { cellChangeModal(cellName); }}>
                                {drawCell(cell, cellIndex, rowIndex, textSize, boardCrayon)}
                            </div>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', width: divsize, marginTop: '3.75%' }}>
                    <div style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.mode === 'dark' ? 'black' : 'white', width: '100px' }} onClick={() => { setResetModal(true); }}>Reset</Button>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button style={{ backgroundColor: (writeMode === 2) ? theme.palette.warning.main : 'grey', color: (writeMode === 2) ? theme.palette.mode === 'dark' ? 'black' : 'white' : theme.palette.mode === 'dark' ? 'white' : 'black' }} onClick={() => { shiftWriteModes(2) }}><CreateIcon /></Button>
                        <div style={{ width: '20%' }} />
                        <Button style={{ backgroundColor: (writeMode === 3) ? theme.palette.mode === 'dark' ? '#FFC0DB' : '#ff80ab' : 'grey', color: (writeMode === 3) ? theme.palette.mode === 'dark' ? 'black' : 'white' : theme.palette.mode === 'dark' ? 'white' : 'black' }} onClick={() => { shiftWriteModes(3); }}><EraserIcon /></Button>
                    </div>
                </div>
            </main>
        );
    };

    const cellChangeModal = (cellName) => {
        if (currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].shownValue === '⠀' || !currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].isShown) {
            if (writeMode !== 3) {
                setCurrentCellShownValue(currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].shownValue);
                setCurrentCellNotes(currentPuzzle[cellName.charCodeAt(0) - 65][cellName[1] - 1].notes);
                setCurrentCell(cellName);
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
    const setCell = React.useCallback((val, updatedPuzzle) => {
        setCurrentPuzzle(updatedPuzzle);
        if (writeMode === 1) {
            handleModalClose();
        } else if (writeMode === 2) {
            if (currentCellNotes.toString().includes(val.toString())) {
                setCurrentCellNotes(currentCellNotes.toString().replace(val.toString(), ''));
            }
            else {
                setCurrentCellNotes(currentCellNotes.toString() + val.toString());
            }
        };
    }, [currentCellNotes, handleModalClose, writeMode]);

    const IDTheUser = React.useCallback(() => {
        if (!localStorage.getItem('userID')) {
            const fetchUserID = async () => {
                const response = await fetch('/api/users/new/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                localStorage.setItem('userID', data.newUser._id);
                return Promise.resolve(data.newUser._id);
            };
            return fetchUserID();
        } else {
            const userID = localStorage.getItem('userID');
            const fetchUserID = async () => {
                const response = await fetch(`/api/users/isValid/${userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.valid) {
                    return Promise.resolve(userID);
                } else {
                    const response = await fetch('/api/users/new/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    localStorage.setItem('userID', data.newUser._id);
                    return Promise.resolve(data.newUser._id);
                }
            };
            return fetchUserID();
        }
    }, []);

    const handleEndGame = React.useCallback((win, puzzle) => {
        if (!win) {
            setCurrentPuzzle(puzzle.map((row) => { return row.map((cell) => { if (!cell.isShown) return { ...cell, color: cell.trueValue === cell.shownValue ? 'Chartreuse' : 'red', isShown: true }; else return cell; }); }));
        } else {
            setCurrentPuzzle(puzzle.map((row) => { return row.map((cell) => { return { ...cell, color: 'Chartreuse', isShown: true }; }); }));
        }
        const timeAtWin = new Date(gameTimer * 1000).toISOString().substr(11, 8);
        setGradeOutput(win ? `You Win! Your time was ${timeAtWin}` : `You Lose! Your time was ${timeAtWin}`);
        setGradeModal(true);
        IDTheUser().then((userID) => {
            fetch('/api/scores/new/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ didSolve: win, time: gameTimer, userID: userID }),
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.log(`Error: ${error}`);
                });
        });
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        if (win) {
            if (scores.length < 10) {
                scores.push({ time: gameTimer, date: new Date() });
                scores.sort((a, b) => { return a.time - b.time; });
            } else {
                if (gameTimer < scores[9].time) {
                    scores[9] = { time: gameTimer, date: new Date() };
                    scores.sort((a, b) => { return a.time - b.time; });
                };
            };
            localStorage.setItem('scores', JSON.stringify(scores));
        };
    }, [gameTimer, IDTheUser]);

    const checkBoard = React.useCallback((puzzle) => {
        if (puzzle.some((row) => { return row.some((cell) => { return !parseInt(cell.shownValue) > 0 }); })) { return };
        const puzzleArrayMatrix = puzzle.map((row) => { return row.map((cell) => { return cell.shownValue; }); });
        if (puzzleArrayMatrix.every((row) => { return row.every((cell) => { return cell !== '⠀'; }); })) {
            const rowCheck = puzzleArrayMatrix.every((row) => {
                return row.every((cell) => {
                    return row.filter((value) => { return value === cell; }).length === 1;
                });
            }
            );
            const columnCheck = puzzleArrayMatrix.every((row, rowIndex) => {
                return row.every((cell, cellIndex) => {
                    return puzzleArrayMatrix.filter((value) => { return value[cellIndex] === cell; }).length === 1;
                });
            }
            );
            const boxCheck = puzzleArrayMatrix.every((row, rowIndex) => {
                return row.every((cell, cellIndex) => {
                    const boxValues = [];
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            boxValues.push(puzzleArrayMatrix[(Math.floor(rowIndex / 3) * 3) + i][(Math.floor(cellIndex / 3) * 3) + j]);
                        };
                    };
                    return boxValues.every((value) => {
                        return boxValues.filter((boxValue) => { return boxValue === value; }).length === 1;
                    });
                }
                );
            }
            );
            if (rowCheck && columnCheck && boxCheck) {
                handleEndGame(true, puzzle);
            } else {
                handleEndGame(false, puzzle);
            };
        };
    }, [handleEndGame]);

    const handleModalSubmit = React.useCallback((val) => {
        setGameHasStarted(true);
        if (writeMode === 1) {
            if (currentPuzzle[currentCell.charCodeAt(0) - 65][currentCell[1] - 1].shownValue !== val) {
                const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => {
                        if (currentCell === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) { return { shownValue: val, trueValue: cell.trueValue, notes: "" }; } return cell;
                    });
                });
                setCell(val, updatedPuzzle);
                setCurrentCellNotes(' ');
                checkBoard(updatedPuzzle);
            } else {
                const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => {
                        if (currentCell === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) { return { shownValue: '⠀', trueValue: cell.trueValue, notes: "" }; } return cell;
                    });
                });
                setCell(val, updatedPuzzle);
            }
        } else if (writeMode === 2) {
            const updatedPuzzle = currentPuzzle.map((row, rowIndex) => {
                return row.map((cell, cellIndex) => {
                    const cellAlreadyHasNote = cell.notes.toString().includes(val.toString());
                    if (currentCell === `${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}`) {
                        if (cellAlreadyHasNote) {
                            const updatedNotes = cell.notes.toString().replace(val.toString(), '');
                            return { shownValue: " ", trueValue: cell.trueValue, notes: updatedNotes };
                        }
                        const updatedNotes = cell.notes.toString() + val.toString();
                        return { shownValue: " ", trueValue: cell.trueValue, notes: updatedNotes };
                    } return cell;
                });
            });
            setCell(val, updatedPuzzle);
        } else if (writeMode === 3) {
            console.log("how did you get here?")
        }
    }, [currentCell, currentPuzzle, writeMode, setCell, checkBoard]);

    React.useEffect(() => {
        if (!modalOpen) {
            const handleKeyDown = (event) => {
                if (event.key === 'm') {
                    shiftWriteModes(2);
                }
                if (event.key === 'e') {
                    shiftWriteModes(3);
                }
                if (event.key === 'r') {
                    setResetModal(!resetModal);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
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
    }, [modalOpen, shiftWriteModes, resetModal, handleModalSubmit]);

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
                        {Array.from({ length: 9 }, (_, i) => (<Button style={{ width: "75px", height: "75px" }} key={i} variant="contained"
                            color={(currentCellNotes.toString().includes((i + 1).toString())) ? 'warning' : (currentCellShownValue.toString() === (i + 1).toString()) ? 'grey' : 'primary'}
                            onClick={() => handleModalSubmit(i + 1)}>{i + 1}</Button>))}
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