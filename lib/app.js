const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// import munging and API functions here
const { mungeLocation, mungeWeather, mungeReviews, mungeTrails } = require('./munge-functions');
const { getLocation, getWeather, getReviews, getTrails } = require('./api-functions');

// ENDPOINT goes from here
app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;
    const location = await getLocation(city);
    const mungedLocation =  mungeLocation(location);
      
    res.json(mungedLocation);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

// ENDPOINT goes from here
app.get('/weather', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const weather = await getWeather(lat, lon);
    const numberOfResults = 5;
    const mungedWeather = mungeWeather(weather, numberOfResults);
      
    res.json(mungedWeather);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

// ENDPOINT goes from here
app.get('/reviews', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const numberOfResults = 5;
    const reviewData = await getReviews(lat, lon, numberOfResults);
    const mungedReviews = mungeReviews(reviewData);

    res.json(mungedReviews);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

// ENDPOINT goes from here
app.get('/trails', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const numberOfResults = 5;
    const trailsData = await getTrails(lat, lon, numberOfResults);
    const mungedTrails = mungeTrails(trailsData);

    res.json(mungedTrails);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

app.use(require('./middleware/error'));

module.exports = app;
