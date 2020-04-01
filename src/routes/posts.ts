import express from 'express';
const router = express.Router();
const verify = require('../helpers/tokenVerification');

router.get('/', verify,(req: any, res: any)=>{
    // res.json({posts: {title: 'my first post', description: 'random data'}})
    res.send(req.user);
    // UserSchema.findbyOne({_id: req.user});
});
module.exports = router;
