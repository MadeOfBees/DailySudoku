import * as React from 'react';
import GameBoard from '../Components/GameBoard';
const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
const api = "http://localhost:3001/api/puzzles/current";

export default function MainApp() {
  // try to fetch the current puzzle from the server (api/puzzles/current), if it is successful, render the gameboard with the puzzle as a prop and the style as a prop, otherwise console.log the error
  const [puzzle, setPuzzle] = React.useState([]);
  React.useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.puzzle);
        setPuzzle(data.puzzle);
      })
      .catch((err) => console.log(err));
  }
  , []);

  return (
    <div>
      {puzzle.length > 0 ? <GameBoard puzzle={puzzle} style={style} /> : null}
    </div>
  );
}
