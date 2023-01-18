import * as React from 'react';
import GameBoard from '../Components/GameBoard';
const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
export default function MainApp() {
    // get the most
    const puzzle = [
        [
          { value: 9, isShown: true },
          { value: 2, isShown: true },
          { value: 8, isShown: true },
          { value: 6, isShown: true },
          { value: 1, isShown: false },
          { value: 3, isShown: false },
          { value: 7, isShown: false },
          { value: 4, isShown: true },
          { value: 5, isShown: true }
        ],
        [
          { value: 4, isShown: true },
          { value: 3, isShown: true },
          { value: 6, isShown: true },
          { value: 8, isShown: true },
          { value: 7, isShown: true },
          { value: 5, isShown: false },
          { value: 2, isShown: true },
          { value: 1, isShown: true },
          { value: 9, isShown: true }
        ],
        [
          { value: 5, isShown: true },
          { value: 1, isShown: true },
          { value: 7, isShown: false },
          { value: 9, isShown: true },
          { value: 4, isShown: true },
          { value: 2, isShown: true },
          { value: 8, isShown: true },
          { value: 3, isShown: true },
          { value: 6, isShown: true }
        ],
        [
          { value: 6, isShown: false },
          { value: 9, isShown: true },
          { value: 1, isShown: true },
          { value: 2, isShown: true },
          { value: 5, isShown: true },
          { value: 7, isShown: true },
          { value: 3, isShown: false },
          { value: 8, isShown: true },
          { value: 4, isShown: true }
        ],
        [
          { value: 3, isShown: true },
          { value: 4, isShown: false },
          { value: 5, isShown: false },
          { value: 1, isShown: false },
          { value: 9, isShown: true },
          { value: 8, isShown: true },
          { value: 6, isShown: true },
          { value: 2, isShown: true },
          { value: 7, isShown: true }
        ],
        [
          { value: 7, isShown: true },
          { value: 8, isShown: true },
          { value: 2, isShown: false },
          { value: 4, isShown: true },
          { value: 3, isShown: true },
          { value: 6, isShown: true },
          { value: 5, isShown: true },
          { value: 9, isShown: true },
          { value: 1, isShown: true }
        ],
        [
          { value: 2, isShown: true },
          { value: 5, isShown: true },
          { value: 4, isShown: false },
          { value: 7, isShown: true },
          { value: 8, isShown: true },
          { value: 1, isShown: false },
          { value: 9, isShown: true },
          { value: 6, isShown: true },
          { value: 3, isShown: true }
        ],
        [
          { value: 8, isShown: false },
          { value: 7, isShown: false },
          { value: 9, isShown: false },
          { value: 3, isShown: true },
          { value: 6, isShown: true },
          { value: 4, isShown: false },
          { value: 1, isShown: true },
          { value: 5, isShown: true },
          { value: 2, isShown: false }
        ],
        [
          { value: 1, isShown: false },
          { value: 6, isShown: true },
          { value: 3, isShown: true },
          { value: 5, isShown: true },
          { value: 2, isShown: false },
          { value: 9, isShown: true },
          { value: 4, isShown: true },
          { value: 7, isShown: true },
          { value: 8, isShown: true }
        ]
      ]
    return (
        <div >
            <GameBoard style={style} puzzle={puzzle} />
        </div>
    );
}
