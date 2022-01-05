const express = require('express')
const app = express()
require('./startup/connection')();
const cors = require('cors');
const server = require('http').createServer(app)
const port = process.env.PORT || 8000
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origin: '*',
    }
})
app.use(cors());
io.on('connection', socket => {
    socket.emit('message', 'welcome to room');
    socket.broadcast.emit('message', 'joined');
    socket.on('disconnect', () => {
        io.emit('discon', 'user-disconnected');
    })
})
app.get('/', (req, res) => res.send('Hello World!'))
server.listen(port, () => console.log(`Example app listening on port ${port}!`))