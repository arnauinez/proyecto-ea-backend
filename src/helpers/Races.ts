const Race = require('../models/Race');

module Races {
    //desde aqui no va, el mismo codigo desde /src/routes/races.ts si que va, asi que ahi se queda
    /*export const getSubscribed = async (raceid: string) => {
        try{
            const race = await Race.findById(raceid);
            
            console.log(race);
            return race;

        }catch(err) {
            console.log({message: err});
        }
    }*/
}
export default Races;
