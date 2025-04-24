const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

app.use(cors({ // we allow the following origin so that CORS doesn't block requets
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined')); // provides logs, this log middleware should be done before things like security or the code below

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);


app.get('/*client', (req, res) => { // this wildcard (*) will pass on routes that the node server doesn't recognize to the client, for example, /history
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;