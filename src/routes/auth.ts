import express from 'express';
const router = express.Router();
const User = require('../models/User');

 router.post('/register', (req, res) => {
     const user = new User({
         Username: req.body.Username,
         Email: req.body.Email,
         Password: req.body.Password,
         Photo: req.body.Photo,
         Rithm: req.body.Rithm
     });
 })