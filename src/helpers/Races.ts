const Race = require('../models/Race');

module Races {
    export const getSubscribed = async (raceid: string) => {
        try{
            let race = await Race.findById(raceid);
            console.log(race);
            return race.subscribed;

        }catch(err) {
            console.log({message: err});
        }
    }
}
export default Races;
