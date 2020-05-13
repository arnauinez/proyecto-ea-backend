var mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema

const UserSchema = Schema({
    username: {
        type: String,
        required: true, 
        max: 255, 
        min: 6
    },
    email: {
        type: String,
        // required: true,
        max: 255, 
        min: 6
    },
    password: {
        type: String,
        // required: true,
        max: 1024, 
        min: 6
    },
    photo: {
        type: String,
    },
    rithm: {
        type: mongoose.Decimal128,
        // required: true
    },
    history: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Race"
    }]
});
// Turn the schema into a model
module.exports = mongoose.model('Users', UserSchema);