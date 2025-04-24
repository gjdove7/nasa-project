const http = require('http');

require('dotenv').config(); // this populates the process.env object with the values in the .env file; 
// this is called above local imports is because we want the environment to be populated not just in our server.js, but also in all of these other files when we import them

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });    
}

startServer();
// building the server this way (using express and the built in node http server) allows us to respond to HTTP requests and use web sockets