const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;