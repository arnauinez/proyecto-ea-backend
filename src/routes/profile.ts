import express from 'express';
const router = express.Router();
const User = require('../models/User');
import { GeolibInputCoordinates } from 'geolib/es/types';
const Race = require('../models/Race');
const Place = require('../models/Place');
import getDistance from 'geolib/es/getDistance';
const verify = require('../helpers/tokenVerification');

router.get('/',verify,(req: any, res: any)=>{
    try {
        User.findById(req.params.userid, '-password', function (err: any, user: any) {
            //user.password = null;//para asegurar
            res.send(user);
        });
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
                if(sp != null){
                    console.log(sp);
                    const sp2: GeolibInputCoordinates = {lat: sp.N, lng: sp.E};
                    console.log(getDistance(place, sp2));
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
