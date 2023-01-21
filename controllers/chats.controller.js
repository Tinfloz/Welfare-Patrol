const Chat = require('../models/chat.model');
const Users = require('../models/user.model');
const Welfare = require('../models/welfare.model');

exports.getChats = async (req, res) => {
    try {
        const {email} = req.user;
        const user = await Users.findOne({ email });
        if (!user) {
            throw "User doesn't exist";
        }
        const chats = await Chat.find({ $or: [{ sender: user }, { receiver: user }] });

        res.status(200).send({ chats });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}