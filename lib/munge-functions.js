function mungeLocation(data) {
  const firstEntry = data[0];
  return {
    formatted_query: firstEntry.display_name,
    latitude: firstEntry.lat,
    longitude: firstEntry.lon
  };
} 

function mungeWeather() {

} 

function mungeReviews() {

} 

function mungeTrails() {

} 

module.exports = {
  mungeLocation,
  mungeWeather,
  mungeReviews,
  mungeTrails
};
