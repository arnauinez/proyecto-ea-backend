import { Socket } from 'socket.io';
import { SocketUser } from '../models/ISocketUser';
const moment = require('moment');
// const SocketTools = require('../helpers/SocketTools');

const users: SocketUser[] = [];

const getCurrentUser = (id: string) => {
    return users.find(usr => usr.id == id);
}

const userJoin = (id: any, username: string, room: any) => {
    const usr: SocketUser = {id, username, room};
    users.push(usr);
    return usr;
}

const formater = (user: any, msg: any) => {
    return `${moment().format('hh:mm')} ${user}: ${msg}`;
}



exports.socket = (io: SocketIO.Server) => {
    io
        .of('/races')
            .on('connection', (socket: Socket) => {
                // Verify
                socket.emit('notify', 'Welcome to /races namespace');
                socket.on('joinRoom', (room, user) => {
                    console.log(`joining room ${room}`);
                    socket.join(room);
                    userJoin(socket.id, user, room);
                    socket.emit('notify', `Joined Room: ${room}`);
                    io
                        .of('/races')
                        .in(room)
                        .emit('notify', `${user} has joined this room`);
                    
                });
                
                socket.on('leaveRoom', (room) => {
                    const user = getCurrentUser(socket.id);
                    socket.leave(room);
                    io.emit('notify', `A ${user?.username} disconnected`);
                });

                socket.on('chatMessage', (msg) => {
                    const user = getCurrentUser(socket.id);
                    console.log(`msg: ${msg}`);
                    const message = formater(user?.username, msg);
                    console.log(`${user?.room} ${message}`);
                    // io.to(user?.room).emit('message', message);
                    socket.broadcast.to(user?.room).emit('message', message);
                });

                socket.on('disconnect', () => {
                    const user = getCurrentUser(socket.id);
                    io.emit('notify', `A ${user?.username} disconnected`);
                });
            });
}