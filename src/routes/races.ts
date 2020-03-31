import express from 'express';
const router = express.Router();
const Race = require('../models/Race');
const Place = require('../models/Place');

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
router.post('/', async (req, res) => {
    const race = new Race({
        title: req.body.title,
        // Author: req.body.Author,
        description: req.body.description,
        // StartingPoint: req.body.Place,
        // EndPoint: req.body.Place,
        // Route: req.body.Route,
        // Distance: req.body.Distance
    });
    // res.json(race);
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
router.delete('/:raceId', async (req, res) => {
    try {
        const removedRace = await Race.remove({_id: req.params.raceId})
        res.json(removedRace);
    } catch(err) {
        res.json({race: err});
    }
});

module.exports = router;