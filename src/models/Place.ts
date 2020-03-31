// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//Schema

const PlaceSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    N: {
        type: mongoose.Decimal128,
        required: true
    },
    E: {
        type: mongoose.Decimal128,
        required: true
    }
});
// Turn the schema into a model
module.exports = mongoose.model('Places', PlaceSchema);