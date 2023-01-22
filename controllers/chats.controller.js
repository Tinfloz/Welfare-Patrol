const Chat = require('../models/chat.model');
const Users = require('../models/user.model');
const Message = require('../models/message.model');
const Welfare = require('../models/welfare.model');

exports.getChats = async (req, res) => {
    try {
        const {email} = req.user;
        const user = await Users.findOne({ email });
        if (!user) {
            throw "User doesn't exist";
        }
        const chats = await Chat.find({ $or: [{ sender: user }, { receiver: user }] })
        .populate("sender")
        .populate("receiver");
        const currentUserId = req.user.id;
        const filteredChats = await Promise.all(chats.map(async (chat)=>{
            let messages = await Message.find({chat: chat.id}, null,  { sort: { createdAt: 1 } });
            if (chat.sender === currentUserId){
                let temp = chat.sender;
                chat.sender = chat.receiver;
                chat.receiver = temp;
            }
            return {chat, lastMessage: messages[messages.length - 1], messages};
        }));
        res.status(200).send({ chats: filteredChats, userId: currentUserId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}