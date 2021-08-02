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

//How to create a Class
function Forecast (day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}  


// BRING IN NEW DATA (i.e., WEATHER DATA)
let weatherData = require('./data/weather.json')

//>>>>>>>>>>>>>>>>>>>>ROUTING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// specify what routes our server should be listening for
app.get('/', (request, response) => {
  //when we get that request, we send  back the following results;
  response.send('Hello, from the server this is Port 3001!');
});

// specify what routes our server should be listening for
app.get('/weather', (request, response) => {
  //when we get that request, we send  back the following results
  let cityName = request.query.cityName
  // response.send(weatherData);
  //NEED TO FILTER THE DATA BASED ON IT MATCHING CITY NAME
  let filteredWeatherData = weatherData.filter(city => city.city_name === cityName);
  let userWeatherChoice = filteredWeatherData[0].data.map(forecast => new Forecast(forecast));
  response.send(userWeatherChoice);

});

//if i am going to catch all other requests.  that catch all MUST be the LAST ROUTE
app.get('/*', (request, response) => {
  response.status(404).send('Oh No!  Something went wrong');
});



//LISTENING FOR ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
