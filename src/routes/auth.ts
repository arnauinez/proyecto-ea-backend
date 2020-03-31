import express from 'express';
const router = express.Router();
const User = require('../models/User');

// Validation
import Joi from '@hapi/joi';

// Register
 router.post('/register', async (req, res) => {
     const user = new User({
         Username: req.body.Username,
         Email: req.body.Email,
         Password: req.body.Password,
         Photo: req.body.Photo,
         Rithm: req.body.Rithm
     });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
         res.status(400).send(err);
     }
 });

