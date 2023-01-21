const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const Users = require('../models/user.model');

exports.getMessages = async (req, res) => {
    try {
        const {id} = req.params;
        const chat = await Chat.findOne({ id });
        const messages = await Message.find({chat});

        res.status(200).send({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}