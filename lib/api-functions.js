const request = require('superagent');

async function getLocation(city) {
  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION}&q=${city}&format=json`);
  return data.body;
} 

async function getWeather(lat, lon) {
  const data = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER}&lat=${lat}&lon=${lon}`);
  return data.body.data;
} 

async function getReviews() {
  const data = await request.get('');
  return data.body;
} 

async function getTrails() {
  const data = await request.get('');
  return data.body;
} 

module.exports = {
  getLocation,
  getWeather,
  getReviews,
  getTrails
};