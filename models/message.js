const mongoose = require('mongoose');
const User = require('./user');
const messageSchema = new mongoose.Schema({
    message: {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
})
const Message = mongoose.model('message', messageSchema);
module.exports = Message;