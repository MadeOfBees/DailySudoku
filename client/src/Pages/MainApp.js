import * as React from 'react';
import GameBoard from '../Components/GameBoard';
const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
export default function MainApp() {
  const [puzzle, setPuzzle] = React.useState();
  React.useEffect(() => {
    fetch("api/puzzles/current/")
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Puzzle retrieved successfully") {
          setPuzzle(data.puzzle);
        }
        else {
          setPuzzle(JSON.parse(data.puzzle.puzzleData));
        }
      }
      );
  }, []);

  return (
    <div>
      {puzzle ? <GameBoard puzzle={puzzle} style={style} /> : null}
    </div>
  );
}