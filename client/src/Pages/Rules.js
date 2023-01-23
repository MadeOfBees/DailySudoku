import GitHubIcon from '@mui/icons-material/GitHub';

function greetings() {
  if (new Date().getHours() < 12) { return 'morning'; }
  else if (new Date().getHours() < 18) { return 'afternoon'; }
  else { return 'evening'; };
};

function AboutUs() {
  return (
    // div className="AboutUs" is scrollable if the content is too long
    <div className="AboutUs">
      <h1>Good {greetings()}!</h1>
      <h3>Welcome to our site's closed Alpha!</h3>
      <h3>The rules of Sudoku:</h3>
      <ul>
        <li>A Sudoku puzzle consists of a 9x9 grid, with some of the squares already filled in with numbers. The goal is to fill in the remaining squares with numbers from 1 to 9 in a way that satisfies the following rules:</li>
        <li>Each row and or column must contain all of the numbers from 1 to 9, with no repetitions.</li>
        <li>Each of the 9 3x3 sub-grids must ALSO contain all of the numbers from 1 to 9, with no repetitions.</li>
        <li>When you click on a number a Modal will pop up with a keypad. Click on the keypad to fill in the number.</li>
        <li>Press the R key durring the game to reset the puzzle.</li>
        <li>When you are done filling in the puzzle the game will automatically check if you have won or lost.</li>
        <li>Every day a new puzzle will be generated for you to solve.</li>
        <li>Everyone in the world has the same puzzle at the same time so have fun competing with your friends!</li>
      </ul>
      <p>This is a website made by: <a href="https://github.com/MadeOfBees">MadeOfBees </a><GitHubIcon /></p>
      <p>Check out the source code on <a href="https://github.com/MadeOfBees/DailySudoku">GitHub</a></p>
    </div>
  );
}

export default AboutUs;