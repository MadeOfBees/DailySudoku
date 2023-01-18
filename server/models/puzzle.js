const {Schema, model} = require('mongoose');

const puzzleSchema = new Schema({
    puzzleData: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Puzzle = model('Puzzle', puzzleSchema);

module.exports = {Puzzle};

