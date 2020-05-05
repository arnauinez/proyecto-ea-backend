  
var mongoose = require('mongoose');


//Schema

const PlaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: { 
        type:  {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        }, 
        coordinates: {
            type: [Number],
            required: true
        } 
     }
});
// Turn the schema into a model
module.exports = mongoose.model('Places', PlaceSchema);