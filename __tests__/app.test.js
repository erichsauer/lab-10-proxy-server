const { mungeLocation, mungeWeather, mungeReviews, mungeTrails } = require('../lib/munge-functions');

test('returns required location model', async () => {

  const data = 
    {
      'lat': '45.5202471',
      'lon': '-122.6741949',
      'display_name': 'Portland, Multnomah, Oregon, USA'
    };
  
  const expectedData = {
    'formatted_query': 'Portland, Multnomah, Oregon, USA',
    'latitude': '45.5202471',
    'longitude': '-122.6741949'
  };
  const mungedData = mungeLocation(data);

  expect(mungedData).toEqual(expectedData);
});

test('returns required weather model for one day', async () => {

  const data = [
    {
      'ts': 1614326460,
      'weather': {
        'icon': 'c03d',
        'code': 803,
        'description': 'Broken clouds'
      },
    }
  ];
  
  const expectedData = [
    {
      'forecast': 'Broken clouds',
      'time': 'Fri Feb 26 2021'
    }
  ];
  const mungedData = mungeWeather(data, 1);

  expect(mungedData).toEqual(expectedData);
});

test('returns required reviews model for one restaurant', async () => {

  const data = 
  {
    'businesses': [
      {
        'name': 'Salt & Straw',
        'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/tlm_JobdYI6EQoaMGumUYA/o.jpg',
        'url': 'https://www.yelp.com/biz/salt-and-straw-portland-4?adjust_creative=qEKMmLhLvBStedzNWFk2lA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qEKMmLhLvBStedzNWFk2lA',
        'rating': 4.5,
        'price': '$',
      }
    ]
  };

  const expectedData = [
    {
      'name': 'Salt & Straw',
      'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/tlm_JobdYI6EQoaMGumUYA/o.jpg',
      'price': '$',
      'rating': 4.5,
      'url': 'https://www.yelp.com/biz/salt-and-straw-portland-4?adjust_creative=qEKMmLhLvBStedzNWFk2lA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qEKMmLhLvBStedzNWFk2lA'
    }
  ];
  
  const mungedData = mungeReviews(data);

  expect(mungedData).toEqual(expectedData);
});

test('returns required trails model for one state park', async () => {

  const data = [
    {
      'id': '0DC0CB30-D89B-4232-92A5-CC55425D0EDF',
      'url': 'https://www.nps.gov/places/bradford-island-visitor-center-at-bonneville-lock-and-dam.htm',
      'title': 'Bradford Island Visitor Center at Bonneville Lock and Dam',
      'listingDescription': 'The Bonneville dam was completed in 1943 and was the first dam built on the Columbia River. The Bradford Island Visitor Center, located adjacent to the dam on the Oregon side of the river, displays exhibits on local history, hydropower, and fish life cycles. The Lewis and Clark Expedition camped on Bradford Island on April 9, 1806 upon their return journey.',
      'latLong': '45.641558,-121.943594',
      'amenities': [
        'Fire Extinguisher',
        'Gifts/Souvenirs/Books',
        'Historical/Interpretive Information/Exhibits',
        'Information',
        'Information - Maps Available',
        'Information - Park Newspaper Available',
        'Information - Ranger/Staff Member Present',
        'Information Kiosk/Bulletin Board',
        'Parking - Auto',
        'Restroom',
        'Scenic View/Photo Spot',
        'Telephone',
        'Toilet - Flush'
      ],
      'managedByOrg': 'U.S. Army Corps of Engineers',
    }
  ];

  const expectedData = [
    {
      'name': 'Bradford Island Visitor Center at Bonneville Lock and Dam',
      'location': '45.641558,-121.943594',
      'length': 'Fire Extinguisher',
      'stars': 'Gifts/Souvenirs/Books',
      'star_votes': 'Historical/Interpretive Information/Exhibits',
      'summary': 'The Bonneville dam was completed in 1943 and was the first dam built on the Columbia River. The Bradford Island Visitor Center, located adjacent to the dam on the Oregon side of the river, displays exhibits on local history, hydropower, and fish life cycles. The Lewis and Clark Expedition camped on Bradford Island on April 9, 1806 upon their return journey.',
      'trail_url': 'https://www.nps.gov/places/bradford-island-visitor-center-at-bonneville-lock-and-dam.htm',
      'conditions': 'Information',
      'condition_date': 'U.S. Army Corps of Engineers',
      'condition_time': 'Information - Maps Available'
    },
  ];
  const mungedData = mungeTrails(data);

  expect(mungedData).toEqual(expectedData);
});
