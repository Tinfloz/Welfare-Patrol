const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    content: {type: String},
    chat: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;