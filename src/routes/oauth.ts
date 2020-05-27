import express from 'express';
require('dotenv').config();
const router = express.Router();
const passport = require("passport")
const User = require('../models/User');
import jwt from 'jsonwebtoken';


// Strategies
const FacebookStrategy = require("passport-facebook").Strategy

router.use(passport.initialize());
// router.use(passport.session())

passport.serializeUser((user: any, done: any) => {
  console.log(`Serialized User`);
  console.log(user);
  done(null, user);
})
passport.deserializeUser((user: any, done: any) => {
  console.log(`Deserialized User`);
  console.log(user);
  done(null, user);
})

const fbOpts = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  profileFields: ["name", "email", "link", "locale"],
  passReqToCallback: true
}

const fbCallback = async (accessToken: any, refreshToken: any, profile: any, req: any, done: any) => {
  console.log('FB CALLBACK')
  try {
    await User.findOne({ Username: req.id },
      async (err: Error, user: any) => {
        if(err) {
          console.log(err);  // handle errors!
        }
        if(user) {
          console.log('> Logged In');
        //Login if User already exists
        } else {
        // Register user in Local db
          console.log('> Registered', req.id);
          const user = new User({
            Username: req.id
          });
        const savedUser = await user.save();
        }
      });

    done(null, req);
  } catch(err){
    done(err, false, err.message);
  }
}
passport.use(new FacebookStrategy(fbOpts, fbCallback));

router.get('/', (req, res) => {
  res.send('Got here');
});

router.get('/facebook', passport.authenticate('facebook', { session: false }))
router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    // successRedirect: '/oauth',
    failureRedirect: '/' })

    ,(req: any, res: any) => {
      console.log('req', req.user.id);
      const token = jwt.sign({ id: req.user.id }, String(process.env.TOKEN_SECRET));
      // res.header('auth-token', token).send({ 'auth-token': token });
      res.send({ 'auth-token': token });
    }
)

module.exports = router;
