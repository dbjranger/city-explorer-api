'use strict';

console.log('Hello world');

//Express App
const express = require('express');
const app = express();

//Cors so data can be read across files/folders
const cors = require('cors');
app.use(cors());

//Require an ENV file for API Keys
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;


//Proof of life on main URL
app.get('/', (request, response) => {
  response.send('Hello, from the server!');
});

// Weather, Movies, Catch All, and Listener
const weather = require('./modules/weather.js');
app.get('/weather', weather);

const movies = require('./modules/movies.js');
app.get('/movies', movies);

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));