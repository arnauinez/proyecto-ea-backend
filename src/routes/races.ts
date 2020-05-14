import express from 'express';
//import { verify } from 'crypto';
const router = express.Router();
const Race = require('../models/Race');
const Place = require('../models/Place');
const User = require('../models/User');
//const Place2 = require ('../models/Place2');
const app = require('../app');
const verify = require('../helpers/tokenVerification');
const RacesHelper = require('../helpers/Races');
let placesControl = require ("../controllers/placeControl");

app

// Get all races
router.get('/races', async (req, res) => {
    try{
        const races = await Race.find(); // mongoose method
        res.json(races);
    } catch (err) {
        res.json({race: err});
    }
});

// Get all places
//router.get('/', placesControl.getPlaces);
router.get('/places', async (req, res) => {
    try{
        const places = await Place.find();// mongoose method   
        res.json(places);
        console.log(places);
    } catch (err) {
        res.json({place: err});
    }
    
});


//GET PLACES BY DISTANCE
router.get('/places/nearest/:distance/:latitude/:longitude', async (req, res) => {
    try{
        let distance = req.params.distance;
        let lat = req.params.latitude;
        let long = req.params.longitude;
        console.log(req.params.distance);
        let query =  {
            location:
              { $near:
                 {
                   $geometry: { type: "Point",  coordinates: [ long, lat ] },
                   $minDistance: 100,
                   $maxDistance: distance
                 }
              }
          }
        const places = await Place.find(query);// mongoose method   
        res.json(places);
        console.log(places);
    } catch (err) {
        res.json({place: err});
    }    
});


//GET RACES BY DISTANCE
router.get('/races/nearest/:distance/:latitude/:longitude', async (req, res) => {
    try{
        let distance = req.params.distance;
        let lat = req.params.latitude;
        let lng = req.params.longitude;
        console.log(req.params.distance);
        let query =  {
            startingPoint:
              { $near:
                 {
                   $geometry: { type: "Point",  coordinates: [ lng, lat ] },
                   $minDistance: 100,
                   $maxDistance: distance
                 }
              }
          }
        const races = await Race.find(query);// mongoose method   
        res.json(races);
        console.log(races);
    } catch (err) {
        res.json({race: err});
    }    
});


//POST RACE
router.post('/', verify, async (req, res) => {
    const race = new Race({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        description: req.body.description,
        distance: req.body.distance,
        startingPoint: {
          coordinates: req.body.coordinates,
          type: req.body.type
        }
    });
    try {
        console.log(req.body);
        console.log(race);
        const savedRace = await race.save();
        res.json(savedRace);
        console.log(savedRace);
    }
    catch(err) {
        res.json({race: err});
    }
});

//SPECIFIC RACE
router.get('/:postId', async (req, res) => {
    try{
        const post = await Race.findById(req.params.postId);
        res.json(post);
    }catch(err) {
        res.json({message: err});
    }
});

//DELETE RACE
router.delete('/:raceId', verify, async (req, res) => {
    try {
        const removedRace = await Race.remove({_id: req.params.raceId})
        res.json(removedRace);
    } catch(err) {
        res.json({race: err});
    }
});

//SUBSCRIBE
router.post('/subscribe/:raceId', verify, async (req, res) => {
    try {
        const race = await Race.find({_id: req.params.raceId});
        console.log(req.params.userid);
        if(race[0].subscribers.indexOf(req.params.userid) < 0){
            race[0].subscribers.push(req.params.userid);
            await Race.where({_id: race[0]._id}).update(race[0]);
            res.json(race[0]);
        }
        else{
            res.status(409).send("Alredy subscribed");
        }
    } catch(err) {
        res.json({race: err});
    }
});

//UNSUBSCRIBE
router.post('/unsubscribe/:raceId', verify, async (req, res) => {
    try {
        const race = await Race.find({_id: req.params.raceId});
        console.log(race[0].subscribers);
        const index = race[0].subscribers.indexOf(req.params.userid, 0);
        console.log(index);
        if(index > -1){
            race[0].subscribers.splice(index, 1);
            await Race.where({_id: race[0]._id}).update(race[0]);
            res.json(race[0]);
        }
        else{
            res.status(400).send('user not subscribed to that race');
        }
    } catch(err) {
        res.json({race: err});
    }
});

//GET SUBS

router.get('/getsubs/:raceId', verify, async (req, res) => {
    try {
        console.log(req.params.raceId);
        const race = await Race.find({_id: req.params.raceId});
        console.log(race);
        const subs = race[0].subscribers;
        const subs2 = await User.find({_id: subs});
        console.log(subs2);
        subs2.forEach(async (element: any) => {
            element.password = null;
        });
        console.log(subs2);
        res.json(subs2);
    } catch(err) {
        res.json({race: err});
    }
});

module.exports = router;