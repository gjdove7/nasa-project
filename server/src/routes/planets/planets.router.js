const express = require('express');

const { httpGetAllPlanets } = require('./planets.controller');

const planetsRouter = express.Router();

// /planets/
planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;