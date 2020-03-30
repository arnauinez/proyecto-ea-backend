// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//Schema

const RaceSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    DateTime: {
        type: String,
        required: true
    },
    StartingPoint: {
        type: Schema.Types.ObjectId,
        ref: "Place", 
        require: true
    },
    EndPoint: {
        type: Schema.Types.ObjectId,
        ref: "Place", 
        require: true
    },
    Route: {
        type: String,
        required: true
    },
    Distance: {
        type: Float32Array,
        required: true
    },
    ElapsedTime: {
        type: Float32Array,
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Races', RaceSchema);