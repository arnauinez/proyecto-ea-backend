import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

module.exports = (req: any, res: any, next: any) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verifiedUser = jwt.verify(token, String(process.env.TOKEN_SECRET));
        req.user = verifiedUser;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
