import { SocketUser } from "../models/ISocketUser";
import { Room } from "socket.io";
const moment = require('moment');

module SocketTools {
    var rooms = ['default'];
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
}

export default SocketTools;