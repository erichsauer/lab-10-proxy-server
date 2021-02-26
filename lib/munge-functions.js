function mungeLocation(data) {
  const firstEntry = data[0];
  return {
    formatted_query: firstEntry.display_name,
    latitude: firstEntry.lat,
    longitude: firstEntry.lon
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
