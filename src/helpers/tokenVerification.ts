import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

module.exports = (req: any, res: any, next: any) => {
    const token = req.header('auth-token');
    if (!token){ 
        console.log("No hay token");
        return res.status(401).send('Access Denied');
    }

    try {
        const verifiedUser = jwt.verify(token, String(process.env.TOKEN_SECRET));
        // console.log(Object(verifiedUser));//es un objeto raro tipo { id: '5e97686b5044170019f48615', iat: 1589392974 }
        req.user = verifiedUser;
        console.log('VERIFIED USER ', verifiedUser);
        // req.params.userid = Object(verifiedUser).id;
        next();
    } catch (err) {
        
        console.log("token ko", err);

        res.status(400).send('Invalid Token');
    }
}
