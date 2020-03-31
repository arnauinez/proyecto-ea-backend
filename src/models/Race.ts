 const mongoose = require('mongoose');

//Schema

const RaceSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    Title: {
        type: String,
        required: true,
        max: 255, 
        min: 6
    },
    Author: {
        type: String,
        required: true,
        max: 25, 
        min: 6
    },
    Description: {
        type: String,
        required: true,
        max: 2550, 
        min: 6
    },
    DateTime: {
        type: Date,
        default: Date
    },
    StartingPoint: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    },
    EndPoint: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    },
    Route: {
        type: String,
    },
    Distance: {
        type: mongoose.Decimal128
    },
});

module.exports = mongoose.model('Races', RaceSchema);