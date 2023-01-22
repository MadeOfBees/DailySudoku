const { generateSudoku } = require('../utils/generateSudoku');
const { Puzzle } = require('../models/puzzle');
require('dotenv').config();

module.exports = {
    newPuzzle: async (req, res) => {
        try {
            if (req.body.password === process.env.SPASSWORD) {
            const puzzleArray = generateSudoku();
            const puzzleData = JSON.stringify(puzzleArray);
            const newPuzzle = new Puzzle({ puzzleData });
            await newPuzzle.save();
            res.status(201).json({ message: 'Puzzle created successfully', puzzle: newPuzzle });
            }
            else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating puzzle', error });
        }
    },

    currentPuzzle: async (req, res) => {
        try {
            const puzzle = await Puzzle.findOne().sort({ _id: -1 });
            if (!puzzle) {
                const puzzleArray = generateSudoku();
                const puzzleData = JSON.stringify(puzzleArray);
                const newPuzzle = new Puzzle({ puzzleData });
                await newPuzzle.save();
                res.status(201).json({ message: 'Puzzle created successfully', puzzle: newPuzzle });
            }
            else {
                    const puzzleArray = JSON.parse(puzzle.puzzleData);
                    res.status(200).json({ message: 'Puzzle retrieved successfully', puzzle: puzzleArray });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving puzzle', error });
        }
    },

    getPuzzleByID: async (req, res) => {
        try {
            const puzzle = await Puzzle.findById(req.params.id);
            const puzzleArray = JSON.parse(puzzle.puzzleData);
            res.status(200).json({ message: 'Puzzle retrieved successfully', puzzle: puzzleArray });
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving puzzle', error });
        }
    },

    getAllPuzzles: async (req, res) => {
        try {
            const puzzles = await Puzzle.find();
            res.status(200).json({ message: 'Puzzles retrieved successfully', puzzles });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving puzzles', error });
        }
    },
    
    deletePuzzleByID: async (req, res) => {
        try {
            if (req.body.password === process.env.SPASSWORD) {
            await Puzzle.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Puzzle deleted successfully' });
            }
            else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting puzzle', error });
        }
    },
    deleteAllPuzzles: async (req, res) => {
        try {
            if (req.body.password === process.env.SPASSWORD) {
            await Puzzle.deleteMany();
            res.status(200).json({ message: 'All puzzles deleted successfully' });
            }
            else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting puzzles', error });
        }
    }
}