import express from 'express';
const router = express.Router();
const User = require('../models/User');
import { GeolibInputCoordinates } from 'geolib/es/types';
const Race = require('../models/Race');
const Place = require('../models/Place');
import getDistance from 'geolib/es/getDistance';
const verify = require('../helpers/tokenVerification');

router.get('/',verify, async (req: any, res: any)=>{
    try {
        const user = await User.findById(req.params.userid, '-password')//, function (err: any, user: any) {
            //user.password = null;//para asegurar
        await user.populate('history').execPopulate();
        //await user.history[].populate('subscribers').execPopulate();
        res.send(user);
        
    }catch(err) {
        console.log(err);
        res.json({message: err});
    }
});

 //para ver los places guardados, solo para pruebas
 router.get('/places', verify, async (req: any, res: any) => {
    try{
        const places = await Place.find();
        res.json(places);
    }catch(err) {
        res.json({message: err});
    }
 });

//clear race history
router.post('/clearhistory', verify, async (req: any, res: any) => {
    try{
        const user = await User.find({_id: req.params.userid});
        user[0].history = [];
        await User.where({_id: user[0]._id}).update(user[0]);
        res.json(user[0].history);
    }catch(err) {
        res.json({message: err});
    }
 });

//get races a como mucho distance (en metros) a la redonda (aun no funciona)
 router.get('/nearRaces/:distance', verify, async(req: any, res: any) => {
    try{
        const races = await Race.find();
        const place: GeolibInputCoordinates = {lat: req.body.N, lng: req.body.E};
        const maxdistance = req.params.distance;
        
        races.forEach(async function (race: any) {
            if(race.StartingPoint != null){
                const sp = await Place.findById(race.StartingPoint);
                if(sp != null){
                    const sp2: GeolibInputCoordinates = {lat: sp.N, lng: sp.E};
                }
                else{
                    console.log("null");
                }
            }
        });
        
        res.json(races);
    }catch(err) {
        res.json({message: err});
    }
 })
module.exports = router;
