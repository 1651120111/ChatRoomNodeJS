// socket.emit() single client
// socket.broadcast.emit() all clients except clien that's connecting
// io.emit() send all clientss
// io check tu server

const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const socket = require('socket.io');

// ten cua bot server
const BOT_SERVER = 'BOT_SERVER';
const formatMessage = require('./message/message');
const {getCurrentUser, userJoin, userLeave, getRoomUsers} = require('./message/user');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, 'public')));

// Khi client ket noi
io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        const roomName = user.room;
        socket.join(user.room);

        // CHi nguoi dang nhap moi thay
        socket.emit('message', formatMessage(BOT_SERVER, 'Chao mung den voi Room chat'));
        socket.broadcast.to(user.room).emit('message', formatMessage(BOT_SERVER, user.username + ' come to Room chat'));

        const userRoom = getRoomUsers(user.room);
        io.to(user.room).emit('getRoomUser',{roomName,userRoom});
    });

// lang nghe va lay du lieu chat
    socket.on('chatMessage', msg => {
       const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg.msg));
    });


    socket.on('disconnect', () => {
        const  user = userLeave(socket.id);
        if (user){
            io.to(user.room).emit('message', formatMessage(BOT_SERVER, 'User '+user.username+' vua roi khoi'));
        }
        console.log('disconnect');
    });


});

const PORT = 4444;

server.listen(PORT, () => console.log('Server running on port ' + PORT));
