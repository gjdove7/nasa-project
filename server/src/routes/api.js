const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router();

api.use('/planets', planetsRouter); // mounts planetsRouter to the app so that the function only reacts to requests with the /planets url
api.use('/launches', launchesRouter); // mounts launchesRouter to the app so that the function only reacts to requests with the /launches url

module.exports = api;