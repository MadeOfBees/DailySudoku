
const {Puzzle} = require('../models/Puzzle.js');
const {generateSudoku} = require('../utils/generateSudoku.js');

module.exports = {
    newPuzzle: async (req, res) => {
        const puzzle = new Puzzle({ puzzleData: generateSudoku(20) });
        await puzzle.save();
        res.json(puzzle);
    },
    currentPuzzle: async (req, res) => {
        const puzzle = await Puzzle.findOne().sort({ _id: -1 });
        res.json(puzzle);
    },
    getPuzzleByID: async (req, res) => {
        const puzzle = await Puzzle.findById(req.params.id);
        res.json(puzzle);
    },
    getAllPuzzles: async (req, res) => {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    },
    deletePuzzleByID: async (req, res) => {
        const puzzle = await Puzzle.findByIdAndDelete(req.params.id);
        res.json(puzzle);
    }
}
