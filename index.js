const express = require('express')
const app = express()
require('./startup/connection')();
const cors = require('cors');
const postrout = require('./routs/postrout');
const userrout = require('./routs/userrout');
const msgrout = require('./routs/messagerout');
const Message = require('./models/message');
const server = require('http').Server(app)
const port = process.env.PORT || 8000
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})
app.use(cors());
app.use(express.json());
app.use('/user', userrout);
app.use('/post', postrout);
app.use('/msg', msgrout);
io.on('connection', socket => {
    // socket.on('room', (username, chatroom) => {
    //     let arr = username + chatroom;
    //     arr = arr.split('');
    //     arr = arr.sort().toString();
    //     socket.join(arr);
    //     socket.to(arr).emit('user-joined', username)
    // })
    socket.on('message', async(username) => {
        let arr = username.sender + username.chatroom;
        let msg = new Message({
            message: username.message,
            sender: username.sender,
            receiver: username.chatroom
        })
        await msg.save();
        arr = arr.split('');
        arr = arr.sort().toString();
        socket.join(arr);
        socket.to(arr).emit('recieve', username.message)
    })
})
server.listen(port, () => console.log(`Example app listening on port ${port}!`))