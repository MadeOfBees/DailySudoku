import GitHubIcon from '@mui/icons-material/GitHub';

function greetings() {
  if (new Date().getHours() < 12) { return 'morning'; }
  else if (new Date().getHours() < 18) { return 'afternoon'; }
  else { return 'evening'; };
};

function AboutUs() {
  return (
    <div className="AboutUs">
      <h1>Good {greetings()}!</h1>
      <h3>The rules of Sudoku:</h3>
      <ul>
        <li>A Sudoku puzzle consists of a 9x9 grid, with some of the squares already filled in with numbers. The goal is to fill in the remaining squares with numbers from 1 to 9 in a way that satisfies the following rules:</li>
        <li>Each row and or column must contain all of the numbers from 1 to 9, with no repetitions.</li>
        <li>Each of the 9 3x3 sub-grids must ALSO contain all of the numbers from 1 to 9, with no repetitions.</li>
        <li>When you click on a number a Modal will pop up with a keypad. Click on the keypad to fill in the number or press the number on your keyboard, you can buffer these inputs (like in a fighting game) to get even faster scores.</li>
        <li>Press the R key or click the Reset button durring the game to reset the puzzle.</li>
        <li>Press the M key or click the Pencil button to toggle between filling in numbers as anwsers with pen mode (marked as blue) or notes with the pencil (marked in orange).</li>
        <li>Press the E key or click the eraser button to use the Eraser. </li>
        <li>Notes are only visible to you and will NOT be checked by the game.</li>
        <li>When you are done filling in the puzzle the game will automatically check if you have won or lost.</li>
        <li>Every day a new puzzle will be generated for you to solve.</li>
        <li>Everyone in the world has the same puzzle at the same time so have fun competing with your friends!</li>
      </ul>
      <p>This is a website made by: <a href="https://github.com/MadeOfBees">MadeOfBees </a><GitHubIcon /></p>
      <p>Check out the source code on <a href="https://github.com/MadeOfBees/DailySudoku">GitHub</a></p>
      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default AboutUs;