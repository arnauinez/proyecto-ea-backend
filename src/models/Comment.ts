var mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Comments', CommentSchema);