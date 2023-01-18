
const { Schema, model } = require('mongoose');

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
module.exports = model('Puzzle', puzzleSchema);
