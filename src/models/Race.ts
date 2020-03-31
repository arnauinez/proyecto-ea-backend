var mongoose = require('mongoose');

//Schema

const RaceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // Author: {
    //     type: String,
    //     required: true,
    //     max: 25, 
    //     min: 6
    // },
    description: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now
    }
    // StartingPoint: { 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Place"
    // },
    // EndPoint: { 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Place"
    // },
    // Route: {
    //     type: String,
    // },
    // Distance: {
    //     type: mongoose.Decimal128
    // },
});

module.exports = mongoose.model('Races', RaceSchema);