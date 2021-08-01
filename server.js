// SET UP STEPS 1-5 (WHAT IS NEEDED TO SET UP AN EXPRESS SERVER)
// STEP 1
'use strict';

console.log('Hello World');

//STEP 2
// in our servers, we must use 'require' instead of 'import'.  
// require is the precursor to import. 
const express = require('express');

//STEP 3
//Below is how it's done per the documentation
const app = express();

//STEP 4
//this allows frontend to access data from the backend. 
const cors = require('cors');
app.use(cors());

//STEP 5  
// use a dotenv to access our .env file -- must be done BEFORE defining PORT
//Creating a port for ENV file
require('dotenv').config();

const PORT = process.env.PORT;

// BRING IN NEW DATA (i.e., WEATHER DATA)
let weatherData = require('./data/weather.json')

//>>>>>>>>>>>>>>>>>>>>ROUTING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// specify what routes our server should be listening for
app.get('/', (request, response) => {
  //when we get that request, we send  back the following results;
  response.send('Hello, from the server!');
});

// specify what routes our server should be listening for
app.get('/weather', (request, response) => {
  //when we get that request, we send  back the following results;
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  response.send(weatherData);
});

//query parameters allow us to send extra information to the backend
//we access query parameters using request.query
app.get('/sayHello', (request, response) => {
  let name = request.query.name
  response.send(`Hello, ${name}`);
});

//if i am going to catch all other requests.  that catch all MUST be the LAST ROUTE
app.get('/*', (request, response) => {
  response.status(404).send('Oh No!  Something went wrong');
});



//LISTENING FOR ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
