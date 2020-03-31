import express from 'express';
const router = express.Router();
const User = require('../models/User');

// Validation
import Joi from '@hapi/joi';

// const schema = {
//     Username: Joi.string()
//         .min(6).required(),
//     Password: Joi.string()
//         .min(6).required()
// };

// Register
 router.post('/register', async (req, res) => {

    // User Validation
    // const validation = Joi.valid(req.body, schema);
    // res.send(validation);

    //  const user = new User({
    //      Username: req.body.Username,
    //      Email: req.body.Email,
    //      Password: req.body.Password,
    //      Photo: req.body.Photo,
    //      Rithm: req.body.Rithm
    //  });
    // try {
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // }catch(err){
    //      res.status(400).send(err);
    //  }
 });

module.exports = router;
