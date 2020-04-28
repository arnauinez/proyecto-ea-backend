'use strict';

let PalceSchema = require ('../models/Place');

async function getPlaces(){
    let place = await PlaceSchema.find().select('Name');
    console.log(place);
    
}

module.exports = {getPlaces};