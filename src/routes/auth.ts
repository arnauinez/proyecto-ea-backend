import express from 'express';
const router = express.Router();
const User = require('../models/User');
import Validators from '../helpers/validators';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const registerValidator = require('../controllers/validations');
// const loginValidation = require('../controllers/validations');
// import registerValidation from '../controllers/validations';

// Register
 router.post('/register', async (req, res) => {
    // User Validation
   const { error } = Validators.registerValidator(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   
   //Check if user exists
   const usernameExist = await User.findOne({ Username: req.body.Username });
   const emailExist = await User.findOne({ Email: req.body.Email });
   if (usernameExist || emailExist) return res.status(400).send('Username OR Email already exists');

   //Password Hash
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(req.body.Password, salt);
   // Create User
     const user = new User({
         Username: req.body.Username,
         Email: req.body.Email,
         Password: hashedPass,
         // Photo: req.body.Photo,
         // Rithm: req.body.Rithm
     });
    try {
        const savedUser = await user.save();
        res.send({ _id: user._id });
    }catch(err){
         res.status(400).send(err);
     }
 });

 router.post('/login', async (req, res) => {
  // User Validation
  const { error } = Validators.loginValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
   
  //Check if user exists
  const user = await User.findOne({ Username: req.body.Username });
  if (!user) return res.status(400).send('Username or password is wrong');

  const validPass = await bcrypt.compare(req.body.Password, user.Password);
  if (!validPass) return res.status(400).send('Invalid password');
  
  const token = jwt.sign({ id: user._id }, String(process.env.TOKEN_SECRET));
  res.header('auth-token', token).send(token);
 });

module.exports = router;
