const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = model('User', userSchema);

module.exports = {User};