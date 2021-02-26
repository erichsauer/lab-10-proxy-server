const request = require('superagent');

async function getLocation(city) {
  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION}&q=${city}&format=json`);
  return data.body;
} 

async function getWeather() {
  const data = await request.get('');
  return data.body;
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