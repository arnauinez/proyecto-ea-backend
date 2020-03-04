// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema

const UserSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Races: {
        type: Schema.Types.ObjectId,
        ref: "Race"
    },
    Date: {
        type: Date,
        default: Date.now
    }
});
// Turn the schema into a model
module.exports = mongoose.model('User', UserSchema);