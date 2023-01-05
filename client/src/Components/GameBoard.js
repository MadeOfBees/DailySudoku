import * as React from 'react';
import { Grid, Stack } from '@mui/material';

const GameBoard = (puzzle) => {
    const [currentPuzzle] = React.useState(puzzle);
    const DrawCell = ({number,chunk}) => {
        const { puzzle } = currentPuzzle;
        const currentChunk = (puzzle[chunk-1]);
        const cell = currentChunk[number-1];
        if (cell.isCovered) {
        return (
          <div>
            <h4>⠀</h4>
          </div>
        );}else{
        return (
          <div>
            <h4>{cell.value}</h4>
          </div>
        );
        }
    }

    const DrawChunk = ({number}) => {
        const grids = [];
        for (let i = 0; i < 3; i++) {
          grids.push(
            <Grid key={i} container spacing={1}>
              <Grid item xs={4}>
                <DrawCell number={number} chunk={(i*3)+1}/>
              </Grid>
              <Grid item xs={4}>
                <DrawCell number={number} chunk={(i*3)+2}/>
              </Grid>
              <Grid item xs={4}>
                <DrawCell number={number} chunk={(i*3)+3}/>
              </Grid>
            </Grid>
          );
        }
        return (
          <Stack key={number}>
            {grids}
          </Stack>
        );
      }      
    
      const drawBoard = () => {
        const chunks = [];
        for (let i = 0; i < 3; i++) {
          chunks.push(
            <Grid key={i} container spacing={1}>
              <Grid item xs={4}>
                <DrawChunk number={(i*3)+1}/>
              </Grid>
              <Grid item xs={4}>
                <DrawChunk number={(i*3)+2}/>
              </Grid>
              <Grid item xs={4}>
                <DrawChunk number={(i*3)+3}/>
              </Grid>
            </Grid>
          );
        }
        return (
          <Stack>
            {chunks}
          </Stack>
        );
      }         

    return (
        <Stack>
            {drawBoard(currentPuzzle)}
        </Stack>
    )
}

export default GameBoard;