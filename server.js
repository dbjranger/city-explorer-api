'use strict';

console.log('Hello world');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;

//---------------------------------------------------------------------//

app.get('/', (request, response) => {
  response.send('Hello, from the server!');
});

//-------------------------Weather-------------------------------------//

const weather = require('./weather.js');
app.get('/weather', weather);

//-------------------------Movies--------------------------------------//

const movies = require('./movies.js');
app.get('/movies', movies);

//-------------------------catch all, listen---------------------------//

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));