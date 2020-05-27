var mongoose = require('mongoose');

//Schema

const RaceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        max: 25, 
        min: 3
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    startingPoint: { 
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "Place"
        type:  {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        }, 
        coordinates: {
            type: [Number],
            required: true
        } 
    },
    /*EndPoint: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    },
    Route: {
        type: String,
    },*/
    distance: {
        type: Number
    },
    subscribers: [{
        type: String
        //type: mongoose.Schema.ObjectId,
        //ref: "User"
    }]
});

module.exports = mongoose.model('Races', RaceSchema);