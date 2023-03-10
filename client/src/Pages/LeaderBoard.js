import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LeaderBoard = () => {
    const theme = useTheme();
    const [topAllTime, setTopAllTime] = useState([]);
    const [topToday, setTopToday] = useState([]);
    const [topLocal, setTopLocal] = useState([]);

    const fetchScores = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchScores('api/scores/top')
            .then((data) => {
                const formatedScores = data.scores.map((score) => {
                    const time = score.time;
                    let minutes = Math.floor(time / 60);
                    if (minutes < 10) {
                        minutes = `0${minutes}`;
                    }
                    let secondsLeft = time % 60;
                    if (secondsLeft < 10) {
                        secondsLeft = `0${secondsLeft}`;
                    }
                    const cellOutput = `${minutes}:${secondsLeft}`;
                    return { time: cellOutput };
                });
                setTopAllTime(formatedScores);
            });
        fetchScores('api/scores/todaysTop')
            .then((data) => {
                const formatedScores = data.scores.map((score) => {
                    const time = score.time;
                    let minutes = Math.floor(time / 60);
                    if (minutes < 10) {
                        minutes = `0${minutes}`;
                    }
                    let secondsLeft = time % 60;
                    if (secondsLeft < 10) {
                        secondsLeft = `0${secondsLeft}`;
                    }
                    const cellOutput = `${minutes}:${secondsLeft}`;
                    return { time: cellOutput };
                });
                setTopToday(formatedScores);
            });
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('scores')) {
            return;
        }
        const scores = JSON.parse(localStorage.getItem('scores'));
        const formatedScores = scores.map((score) => {
            console.log(score);
            score = parseInt(score.time);
            let minutes = Math.floor(score / 60);
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            let secondsLeft = score % 60;
            if (secondsLeft < 10) {
                secondsLeft = `0${secondsLeft}`;
            }
            const cellOutput = `${minutes}:${secondsLeft}`;
            return { time: cellOutput };
        });
        setTopLocal(formatedScores);
    }, []);


    return (
        (topAllTime.length > 0 || topToday.length > 0 || topLocal.length > 0) ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                <Typography variant="h4" style={{ marginBottom: '1rem' }}>The Leaderboard:</Typography>
                <Paper style={{ padding: '1rem', backgroundColor: theme.palette.mode === 'light' ? '#e8eced' : theme.palette.background.default }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">Best of All Time</Typography></TableCell>
                                <TableCell><Typography variant="h6">Best of Today</Typography></TableCell>
                                <TableCell><Typography variant="h6">Your best times</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(10)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Typography variant="body2">{topAllTime[index] ? topAllTime[index].time : ''}</Typography></TableCell>
                                    <TableCell><Typography variant="body2">{topToday[index] ? topToday[index].time : ''}</Typography></TableCell>
                                    <TableCell><Typography variant="body2">{topLocal[index] ? topLocal[index].time : ''}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        ) : null
    );
};


export default LeaderBoard;