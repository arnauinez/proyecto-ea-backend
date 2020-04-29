  
var mongoose = require('mongoose');


//Schema

const PlaceSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    N: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    E: {
        type: mongoose.Types.Decimal128,
        required: true
    }
});
// Turn the schema into a model
module.exports = mongoose.model('Places', PlaceSchema);