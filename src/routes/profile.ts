import express from 'express';
import getDistance from 'geolib/es/getDistance';
import { GeolibInputCoordinates } from 'geolib/es/types';
const router = express.Router();
const verify = require('../helpers/tokenVerification');
const User = require('../models/User');
const Race = require('../models/Race');
const Place = require('../models/Place');
//const geolib = require('geolib');

router.get('/', verify, async (req: any, res: any) => {
    try{
        const user = await User.findById(req.user.id);
        user.Password = null;
        res.json(user);
    }catch(err) {
        res.json({message: err});
    }
 });
 //solo para ver los places guardados
 router.get('/places', verify, async (req: any, res: any) => {
    try{
        const places = await Place.find();
        res.json(places);
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
        

        console.log(place);
        console.log(req.body);
        races.forEach(async function (race: any) {
            if(race.StartingPoint != null){
                const sp = await Place.findById(race.StartingPoint);
                if(true){
                    console.log(sp);
                    const sp2: GeolibInputCoordinates = {lat: sp.N, lng: sp.E};
                    console.log(getDistance(place, sp2));
                }
            }
        });
        
        res.json(races);
    }catch(err) {
        res.json({message: err});
    }
 })
module.exports = router;