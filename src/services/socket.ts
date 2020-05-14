import { Socket, Room, Rooms } from 'socket.io';
const moment = require('moment');
exports.socket = (io: SocketIO.Server) => {


    var rooms = ['default'];
    const usrs: Usr[] = [];
    const getCurrentUsr = (id: string) => {
        return usrs.find(usr => usr.id == id);
    }
    const usrJoin = (id: any, username: string, room: any) => {
        const usr: Usr = {id, username, room};
        usrs.push(usr);
        return usr;
    }

    const formater = (user: any, msg: any) => {
        return `${moment().format('hh:mm')} ${user}: ${msg}`;
    }

    io
        .of('/races')
            .on('connection', (socket: Socket) => {
                socket.emit('notify', 'Welcome to /races namespace');
                socket.on('joinRoom', (room, user) => {
                    if(rooms.includes(room)) {
                        socket.join(room);
                        usrJoin(socket.id, user, room);
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
                    const user = getCurrentUsr(socket.id);
                    socket.leave(room);
                    io.emit('notify', `A ${user?.username} disconnected`);
                });

                socket.on('chatMessage', (msg) => {
                    const user = getCurrentUsr(socket.id);
                    const message = formater(user?.username, msg);
                    console.log(`${user?.room} ${message}`);
                    // io.to(user?.room).emit('message', message);
                    socket.broadcast.to(user?.room).emit('message', message);
                });

                socket.on('disconnect', () => {
                    const user = getCurrentUsr(socket.id);
                    io.emit('notify', `A ${user?.username} disconnected`);
                });
            });
}
export interface Usr {
    id: any;    
    username: string;
    room: any
}