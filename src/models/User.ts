var mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema

const UserSchema = Schema({
    Username: {
        type: String,
        required: true, 
        max: 255, 
        min: 6
    },
    Email: {
        type: String,
        required: true,
        max: 255, 
        min: 6
    },
    Password: {
        type: String,
        required: true,
        max: 1024, 
        min: 6
    },
    // Photo: {
    //     type: String,
    // },
    // Rithm: {
    //     type: mongoose.Decimal128,
    //     required: true
    // },
    History: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Race"
    }]
});
// Turn the schema into a model
module.exports = mongoose.model('Users', UserSchema);