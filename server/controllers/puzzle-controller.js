const {Puzzle} = require('../models/Puzzle');
const {generateSudoku} = require('../utils/generateSudoku');

const getAllPuzzles = async (req, res) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createPuzzle = async (req, res) => {
    try {
        const puzzle = await generateSudoku();
        const newPuzzle = await Puzzle.create(puzzle);
        res.json(newPuzzle);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deletePuzzle = async (req, res) => {
    try {
        const puzzle = await Puzzle.findByIdAndDelete(req.params.id);
        res.json(puzzle);
    } catch (err) {
        res.status(500).json(err);
    }
}

const findPuzzleById = async (req, res) => {
    try {
        const puzzle = await Puzzle.findById(req.params.id);
        res.json(puzzle);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllPuzzles,
    createPuzzle,
    deletePuzzle,
    findPuzzleById
}
