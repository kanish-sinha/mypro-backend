const express = require('express')
const app = express()
require('./startup/connection')();
const cors = require('cors');
const postrout = require('./routs/postrout');
const userrout = require('./routs/userrout');
const msgrout = require('./routs/messagerout');
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
    socket.on('message', (username, chatroom, message) => {
        let arr = username + chatroom;
        arr = arr.split('');
        arr = arr.sort().toString();
        socket.join(arr);
        socket.to(arr).emit('recieve', message)
    })
})
server.listen(port, () => console.log(`Example app listening on port ${port}!`))