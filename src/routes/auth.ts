import express from 'express';
const router = express.Router();
const User = require('../models/User');
import Validators from '../helpers/validators';
import bcrypt from 'bcryptjs';

// const registerValidator = require('../controllers/validations');
// const loginValidation = require('../controllers/validations');
// import registerValidation from '../controllers/validations';

// Register
 router.post('/register', async (req, res) => {
    // User Validation
   const { error } = Validators.loginValidator(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   
   //Check if user exists
   const usernameExist = await User.findOne({ Username: req.body.Username });
   if (usernameExist) return res.status(400).send('Username already exists');

   //Password Hash
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(req.body.Password, salt);
   // Create User
     const user = new User({
         Username: req.body.Username,
         // Email: req.body.Email,
         Password: hashedPass,
         // Photo: req.body.Photo,
         // Rithm: req.body.Rithm
     });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
         res.status(400).send(err);
     }
 });

module.exports = router;
