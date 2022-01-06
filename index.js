const express = require('express')
const app = express()
require('./startup/connection')();
const cors = require('cors');
const postrout = require('./routs/postrout');
const userrout = require('./routs/userrout');
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
io.on('connection', socket => {
    socket.on('room', (username, chatroom) => {
        socket.join(chatroom);
        socket.to(chatroom).emit('user-joined', username)
    })
})
server.listen(port, () => console.log(`Example app listening on port ${port}!`))