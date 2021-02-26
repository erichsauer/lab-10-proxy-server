const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
const data = [
  {
    'place_id': '282983082',
    'licence': 'https://locationiq.com/attribution',
    'osm_type': 'relation',
    'osm_id': '186579',
    'boundingbox': [
      '45.432536',
      '45.6528812',
      '-122.8367489',
      '-122.4720252'
    ],
    'lat': '45.5202471',
    'lon': '-122.6741949',
    'display_name': 'Portland, Multnomah, Oregon, USA',
    'class': 'place',
    'type': 'city',
    'importance': 0.753565717433768,
    'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
  },
  {
    'place_id': '236025890',
    'licence': 'https://locationiq.com/attribution',
    'osm_type': 'relation',
    'osm_id': '132500',
    'boundingbox': [
      '43.5443477',
      '43.7276965',
      '-70.3473997',
      '-69.9758509'
    ],
    'lat': '43.6610277',
    'lon': '-70.2548596',
    'display_name': 'Portland, Cumberland County, Maine, USA',
    'class': 'place',
    'type': 'city',
    'importance': 0.65297101392868,
    'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
  },
];


// import munging and API functions here
const { mungeLocation, mungeWeather } = require('./munge-functions');
const { getLocation, getWeather } = require('./api-functions');

// TEST goes from here
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

// TEST goes from here
app.get('/weather', async(req, res) => {
  try {
    const lat = 500;
    const lon = 500;
    const weather = await getWeather(lat, lon);
    const mungedWeather = mungeWeather(weather, 5);
      
    res.json(mungedWeather);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

// TEST goes from here
app.get('/reviews', async(req, res) => {
  try {
    const data =  [
      {
        'name': 'Pike Place Chowder',
        'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
        'price': '$$   ',
        'rating': '4.5',
        'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      },
      {
        'name': 'Umi Sake House',
        'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
        'price': '$$   ',
        'rating': '4.0',
        'url': 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      },
    ];
      
    res.json(data);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

// TEST goes from here
app.get('/trails', async(req, res) => {
  try {
    const data =  [
      {
        'name': 'Rattlesnake Ledge',
        'location': 'Riverbend, Washington',
        'length': '4.3',
        'stars': '4.4',
        'star_votes': '84',
        'summary': 'An extremely popular out-and-back hike to the viewpoint on Rattlesnake Ledge.',
        'trail_url': 'https://www.hikingproject.com/trail/7021679/rattlesnake-ledge',
        'conditions': 'Dry: The trail is clearly marked and well maintained.',
        'condition_date': '2018-07-21',
        'condition_time': '0:00:00 '
      },
      {
        'name': 'Mt. Si',
        'location': 'Tanner, Washington',
        'length': '6.6',
        'stars': '4.4',
        'star_votes': '72',
        'summary': 'A steep, well-maintained trail takes you atop Mt. Si with outrageous views of Puget Sound.',
        'trail_url': 'https://www.hikingproject.com/trail/7001016/mt-si',
        'conditions': 'Dry',
        'condition_date': '2018-07-22',
        'condition_time': '0:17:22 '
      },
    ];
      
    res.json(data);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
// ALL THE WAY TO HERE

app.use(require('./middleware/error'));

module.exports = app;
