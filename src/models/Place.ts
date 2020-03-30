// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//Schema

const PlaceSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    N: {
        type: Float32Array,
        required: true
    },
    E: {
        type: Float32Array,
        required: true
    }
});
// Turn the schema into a model
module.exports = mongoose.model('Place', PlaceSchema);