import express from 'express';
//import { verify } from 'crypto';
const router = express.Router();
const Race = require('../models/Race');
const Place = require('../models/Place');
const app = require('../app');
const verify = require('../helpers/tokenVerification');

app

// Get all races
router.get('/', async (req, res) => {
    try{
        const races = await Race.find(); // mongoose method
        res.json(races);
    } catch (err) {
        res.json({race: err});
    }
});

//POST RACE
router.post('/', verify, async (req, res) => {
    const StartingPoint_temp = new Place ({
        Name: req.body.StartingPoint.Name,
        N: req.body.StartingPoint.N,
        E: req.body.StartingPoint.E
    });
    const EndPoint_temp = new Place ({
        Name: req.body.EndPoint.Name,
        N: req.body.EndPoint.N,
        E: req.body.EndPoint.E
    });
    const race = new Race({
        Title: req.body.Title,
        Author: req.body.Author,
        Description: req.body.Description,
        Route: req.body.Route,
        Distance: req.body.Distance
    });
    race.StartingPoint = StartingPoint_temp;
    race.EndPoint = EndPoint_temp;
    try {
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

module.exports = router;