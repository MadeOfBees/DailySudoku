import * as React from 'react';
import GameBoard from '../Components/GameBoard';

export default function MainApp() {
    const puzzle = [
        [{isCovered:false, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 6 }, {isCovered:false, value: 7 }, {isCovered:false, value: 8 }, {isCovered:false, value: 9 }, {isCovered:false, value: 1 }, {isCovered:false, value: 2 }],
        [{isCovered:false, value: 6 }, {isCovered:false, value: 7 }, {isCovered:false, value: 2 }, {isCovered:false, value: 1 }, {isCovered:false, value: 9 }, {isCovered:false, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 8 }],
        [{isCovered:false, value: 1 }, {isCovered:false, value: 9 }, {isCovered:false, value: 8 }, {isCovered:false, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 2 }, {isCovered:false, value: 5 }, {isCovered:false, value: 6 }, {isCovered:false, value: 7 }],
        [{isCovered:false, value: 8 }, {isCovered:false, value: 5 }, {isCovered:false, value: 9 }, {isCovered:false, value: 7 }, {isCovered:false, value: 6 }, {isCovered:false, value: 1 }, {isCovered:false, value: 4 }, {isCovered:false, value: 2 }, {isCovered:false, value: 3 }],
        [{isCovered:false, value: 4 }, {isCovered:false, value: 2 }, {isCovered:false, value: 6 }, {isCovered:false, value: 8 }, {isCovered:true, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 7 }, {isCovered:false, value: 9 }, {isCovered:false, value: 1 }],
        [{isCovered:false, value: 7 }, {isCovered:false, value: 1 }, {isCovered:false, value: 3 }, {isCovered:false, value: 9 }, {isCovered:false, value: 2 }, {isCovered:false, value: 4 }, {isCovered:false, value: 8 }, {isCovered:false, value: 5 }, {isCovered:false, value: 6 }],
        [{isCovered:false, value: 9 }, {isCovered:false, value: 6 }, {isCovered:false, value: 1 }, {isCovered:false, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 7 }, {isCovered:false, value: 2 }, {isCovered:false, value: 8 }, {isCovered:false, value: 4 }],
        [{isCovered:false, value: 2 }, {isCovered:false, value: 8 }, {isCovered:false, value: 7 }, {isCovered:false, value: 4 }, {isCovered:false, value: 1 }, {isCovered:false, value: 9 }, {isCovered:false, value: 6 }, {isCovered:false, value: 3 }, {isCovered:false, value: 5 }],
        [{isCovered:false, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 5 }, {isCovered:false, value: 2 }, {isCovered:false, value: 8 }, {isCovered:false, value: 6 }, {isCovered:false, value: 1 }, {isCovered:false, value: 7 }, {isCovered:false, value: 9 }]
        ]
    return (
        <div >
            <GameBoard puzzle={puzzle} />
        </div>
    );
}
