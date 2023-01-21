let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

let userRoutes = require('./routes/users.route');
let welfareRoutes = require('./routes/welfare.route');
let chatRoutes = require('./routes/chats.route');
let messageRoutes = require('./routes/messages.route');

const Message = require('./models/message.model');
const Chat = require('./models/chat.model');
const Users = require('./models/user.model');

require("dotenv").config();
const PORT = 5000;
app.use(bodyParser({ limit: '50mb' }));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.connect(process.env.MONGODBSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("Connected to the database.");
}).catch(err => {
    console.error(err);
});

mongoose.set('strictQuery', true);

app.use('/api', userRoutes);
app.use('/api/welfare', welfareRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', async (socket) => {
    console.log('a user is connected', socket.handshake.query.token);
    const token = socket.handshake.query.token;
    const chatId = socket.handshake.query.chatId;
    const {email} = jwt.verify(token, process.env.SECRET);
    const user = await Users.findOne({ email });
    const chat = await Chat.findOne({ id: chatId });
    console.log("Connected", email);
    socket.on('message', async (message) => {
        if (chat !== undefined){
            await Message.create({chat, content: message, sender: user });
        }
        io.emit('message', `server: ${user.email}$${message}`);
    });
});


http.listen(process.env.PORT || PORT, () => console.log('Server running on port ' + PORT));
module.exports = app;
