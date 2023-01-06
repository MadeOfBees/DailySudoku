import * as React from 'react';
import GameBoard from '../Components/GameBoard';
const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };


export default function MainApp() {
    const puzzle = [
        [{isCovered:false, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 6 }, {isCovered:false, value: 7 }, {isCovered:false, value: 8 }, {isCovered:false, value: 9 }, {isCovered:false, value: 1 }, {isCovered:false, value: 2 }],
        [{isCovered:false, value: 6 }, {isCovered:false, value: 7 }, {isCovered:false, value: 2 }, {isCovered:false, value: 1 }, {isCovered:false, value: 9 }, {isCovered:false, value: 5 }, {isCovered:true, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 8 }],
        [{isCovered:false, value: 1 }, {isCovered:false, value: 9 }, {isCovered:false, value: 8 }, {isCovered:true, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 2 }, {isCovered:false, value: 5 }, {isCovered:false, value: 6 }, {isCovered:false, value: 7 }],
        [{isCovered:false, value: 8 }, {isCovered:false, value: 5 }, {isCovered:false, value: 9 }, {isCovered:false, value: 7 }, {isCovered:false, value: 6 }, {isCovered:false, value: 1 }, {isCovered:false, value: 4 }, {isCovered:false, value: 2 }, {isCovered:false, value: 3 }],
        [{isCovered:false, value: 4 }, {isCovered:false, value: 2 }, {isCovered:false, value: 6 }, {isCovered:false, value: 8 }, {isCovered:true, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 7 }, {isCovered:false, value: 9 }, {isCovered:false, value: 1 }],
        [{isCovered:false, value: 7 }, {isCovered:false, value: 1 }, {isCovered:false, value: 3 }, {isCovered:false, value: 9 }, {isCovered:false, value: 2 }, {isCovered:false, value: 4 }, {isCovered:false, value: 8 }, {isCovered:false, value: 5 }, {isCovered:false, value: 6 }],
        [{isCovered:true, value: 9 }, {isCovered:false, value: 6 }, {isCovered:false, value: 1 }, {isCovered:true, value: 5 }, {isCovered:false, value: 3 }, {isCovered:false, value: 7 }, {isCovered:false, value: 2 }, {isCovered:false, value: 8 }, {isCovered:false, value: 4 }],
        [{isCovered:false, value: 2 }, {isCovered:false, value: 8 }, {isCovered:false, value: 7 }, {isCovered:false, value: 4 }, {isCovered:false, value: 1 }, {isCovered:false, value: 9 }, {isCovered:false, value: 6 }, {isCovered:false, value: 3 }, {isCovered:false, value: 5 }],
        [{isCovered:false, value: 3 }, {isCovered:false, value: 4 }, {isCovered:false, value: 5 }, {isCovered:false, value: 2 }, {isCovered:false, value: 8 }, {isCovered:false, value: 6 }, {isCovered:false, value: 1 }, {isCovered:false, value: 7 }, {isCovered:false, value: 9 }]
        ]
    return (
        <div >
            <GameBoard style={style} puzzle={puzzle} />
        </div>
    );
}
