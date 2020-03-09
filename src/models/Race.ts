const mongoose = require('mongoose');

//Schema

const RaceSchema = mongoose.Schema({
    Author: {
        type: String,
        required: true
    },
    StartingPoint: {
        type: String,
        required: true
    },
    Route: {
        type: String,
        required: true
    },
    Distance: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Races', RaceSchema);