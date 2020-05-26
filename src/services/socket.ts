import { Socket, Room, Rooms } from 'socket.io';
const SocketTools = require('../helpers/SocketTools');
exports.socket = (io: SocketIO.Server) => {
    io
        .of('/races')
            .on('connection', (socket: Socket) => {
                // Verify
                socket.emit('notify', 'Welcome to /races namespace');
                socket.on('joinRoom', (room, user) => {
                    if(SocketTools.rooms.includes(room)) {
                        socket.join(room);
                        SocketTools.userJoin(socket.id, user, room);
                        socket.emit('notify', `Joined Room: ${room}`);
                        io
                            .of('/races')
                            .in(room)
                            .emit('notify', `${user} has joined ${room}`);
                    } else {
                        return socket.emit('notify', `No room named: ${room}`);
                    }
                });
                
                socket.on('leaveRoom', (room) => {
                    const user = SocketTools.getCurrentUsr(socket.id);
                    socket.leave(room);
                    io.emit('notify', `A ${user?.username} disconnected`);
                });

                socket.on('chatMessage', (msg) => {
                    const user = SocketTools.getCurrentUsr(socket.id);
                    const message = SocketTools.formater(user?.username, msg);
                    console.log(`${user?.room} ${message}`);
                    // io.to(user?.room).emit('message', message);
                    socket.broadcast.to(user?.room).emit('message', message);
                });

                socket.on('disconnect', () => {
                    const user = SocketTools.getCurrentUsr(socket.id);
                    io.emit('notify', `A ${user?.username} disconnected`);
                });
            });
}