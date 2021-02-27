const request = require('superagent');

async function getLocation(city) {
  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION}&q=${city}&format=json`);
  return data.body[0];
} 

async function getWeather(lat, lon) {
  const data = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER}&lat=${lat}&lon=${lon}`);
  return data.body.data;
} 

async function getReviews(lat, lon, qty) {
  const data = await request
    .get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&limit=${qty}`)
    .set('Authorization', `Bearer ${process.env.REVIEWS}`)
    .set('Accept', 'application/json');
  return data.body;
} 

async function getTrails(lat, lon, qty) {
  const stateData = await request
    .get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.LOCATION}&lat=${lat}&lon=${lon}&format=json&statecode=1`);
  const stateCode = stateData.body.address.state_code;
  const parksData = await request
    .get(`https://developer.nps.gov/api/v1/places?stateCode=${stateCode}&limit=${qty}`)
    .set('X-Api-Key', process.env.TRAILS)
    .set('Accept', 'application/json');
  return parksData.body.data;
} 

module.exports = {
  getLocation,
  getWeather,
  getReviews,
  getTrails
};