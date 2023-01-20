const { generateSudoku } = require('../utils/generateSudoku');
const { Puzzle } = require('../models/puzzle');

module.exports = {
    newPuzzle: async (req, res) => {
        try {
            const puzzleArray = generateSudoku();
            const puzzleData = JSON.stringify(puzzleArray);
            const newPuzzle = new Puzzle({ puzzleData });
            await newPuzzle.save();
            res.status(201).json({ message: 'Puzzle created successfully', puzzle: newPuzzle });
        } catch (error) {
            res.status(500).json({ message: 'Error creating puzzle', error });
        }
    },
    currentPuzzle: async (req, res) => {
        try {
            const puzzle = await Puzzle.findOne().sort({ _id: -1 });
            const puzzleCount = await Puzzle.countDocuments();
            if (puzzleCount > 5) {
                await Puzzle.deleteMany().sort({ _id: 1 }).limit(3);
            }
            if (!puzzle) {
                const puzzleArray = generateSudoku();
                const puzzleData = JSON.stringify(puzzleArray);
                const newPuzzle = new Puzzle({ puzzleData });
                await newPuzzle.save();
                res.status(201).json({ message: 'Puzzle created successfully', puzzle: newPuzzle });
            }
            else {
                const hourOfLastPuzzle = new Date(puzzle.createdAt).getUTCHours();
                const timeForANewPuzzle = hourOfLastPuzzle < 12;
                if (!timeForANewPuzzle) {
                    const puzzleArray = JSON.parse(puzzle.puzzleData);
                    res.status(200).json({ message: 'Puzzle retrieved successfully', puzzle: puzzleArray });
                }
                else {
                    const puzzleArray = generateSudoku();
                    const puzzleData = JSON.stringify(puzzleArray);
                    const newPuzzle = new Puzzle({ puzzleData });
                    await newPuzzle.save();
                    res.status(201).json({ message: 'Puzzle created successfully', puzzle: newPuzzle });
                }
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving puzzle', error });
        }
    }
}