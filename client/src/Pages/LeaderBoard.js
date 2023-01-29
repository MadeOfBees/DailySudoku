import React, { useState, useEffect } from 'react';


const LeaderBoard = () => {
    const [topAllTime, setTopAllTime] = useState([]);
    const [topToday, setTopToday] = useState([]);
    const [topLocal, setTopLocal] = useState([]);
    const [error, setError] = useState(null);

    const fetchScores = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchScores('api/scores/top')
            .then((data) => {
                const formatedScores = data.scores.map((score) => {
                    const time = (score.time / 60).toFixed(0) + ':' + ((score.time % 60) < 10 ? '0' + (score.time % 60) : (score.time % 60));
                    return { ...score, time };
                });
                setTopAllTime(formatedScores);
            });
        fetchScores('api/scores/todaysTop')
            .then((data) => {
                const formatedScores = data.scores.map((score) => {
                    const time = (score.time / 60).toFixed(0) + ':' + ((score.time % 60) < 10 ? '0' + (score.time % 60) : (score.time % 60));
                    return { ...score, time };
                });
                setTopToday(formatedScores);
            });
    }, []);

    useEffect(() => {
        const scores = JSON.parse(localStorage.getItem('scores'));
        const formatedScores = scores.map((score) => {
            const time = (score.time / 60).toFixed(0) + ':' + ((score.time % 60) < 10 ? '0' + (score.time % 60) : (score.time % 60));
            return { ...score, time };
        });
        setTopLocal(formatedScores);
    }, []);

    return (
        (topToday.length > 0) ?
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px', justifyContent: 'center' }} className="leaderBoard">
                    {error && <p>{error.message}</p>}
                    <div>
                        <h2>Top 10 All Time</h2>
                        <ul>
                            {topAllTime.map((score, index) => {
                                return <li key={index}>{score.time}</li>
                            }
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2>Top 10 Today</h2>
                        <ul>
                            {topToday.map((score, index) => {
                                return <li key={index}>{score.time}</li>
                            }
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2>Top 10 Local</h2>
                        <ul>
                            {topLocal.map((score, index) => {
                                return <li key={index}>{score.time}</li>
                            }
                            )}
                        </ul>
                    </div>
                </div>
            : null
    );
};

export default LeaderBoard;