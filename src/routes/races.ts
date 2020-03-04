import express from 'express';
const router = express.Router();
const Race = require('../models/Race');

router.get('/', async (req, res) => {
    try{
        const races = await Race.find(); // mongoose method
        res.json(races);
    } catch (err) {
        res.json({race: err});
    }
});

router.post('/', async (req, res) => {
    const race = new Race({
        Author: req.body.Author,
        StartingPoint: req.body.StartingPoint,
        Route: req.body.Route,
        Distance: req.body.Distance

    });
    res.json(race);
    try {
        const savedRace = await race.save();
        res.json(savedRace);
    }
    catch(err) {
        res.json({race: err});
    }
});

module.exports = router;