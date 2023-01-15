const { Schema } = require('mongoose');

const puzzleSchema = new Schema({
    puzzle: {
        type: Object,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});
