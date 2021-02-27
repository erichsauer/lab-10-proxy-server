function mungeLocation(data) {
  return {
    formatted_query: data.display_name,
    latitude: data.lat,
    longitude: data.lon
  };
} 

function mungeWeather(data, qty) {
  const mappedData =  data.map((day) => {
    const time = new Date(day.ts * 1000).toDateString();
    return {
      forecast: day.weather.description,
      time: time 
    };
  });
  return mappedData.slice(0, qty);
}

function mungeReviews({ businesses }) {
  return businesses.map(({ name, image_url, price, rating, url }) =>
    ({
      name,
      image_url,
      price,
      rating,
      url
    })
  );
} 

function mungeTrails(data) {
  return data.map(park =>
    ({
      'name': park.title,
      'location': park.latLong,
      'length': park.amenities[0],
      'stars': park.amenities[1],
      'star_votes': park.amenities[2],
      'summary': park.listingDescription,
      'trail_url': park.url,
      'conditions': park.amenities[3],
      'condition_date': park.managedByOrg,
      'condition_time': park.amenities[4]
    })
  );
} 

module.exports = {
  mungeLocation,
  mungeWeather,
  mungeReviews,
  mungeTrails
};
