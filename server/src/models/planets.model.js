const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

/*
const promise = new Promise((resolve, reject) => {
    resolve(42);
});
promise.then((result) => {

});
const result = await promise;
console.log(result);
*/

function loadPlanetsData() {
    return new Promise ((resolve, reject) => { 
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        /* pattern here is readable.pipe(writable) */
        /* The pipe function connects the parse function to the read stream (connects the two streams together);
        the pipe function is meant to connect a readable stream (source) to a writable stream (destination);
        a stream that takes in data instead of giving data */
        /* Keplar file is the source, and the parse function is the destination */
        /* `comment: '#'` means parse will treat any line beginning with # as a comment;
        `columns: true` will return each row in the csv file as a JS object with KVP instead of an array of values */
        .on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                savePlanet(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        });
    });
}

async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0,
        '__v': 0, // the 0 will cause fields to get excluded
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({ // finds documents with this property
            keplerName: planet.kepler_name,
        }, { // by default this will only update; if this planet doesn't exist, it won't do anything
            keplerName: planet.kepler_name,
        }, { // now, if the planet doesn't exist, it will be added
            upsert: true,
        });
    } catch(err) {
        console.error(`Could not save planet ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}