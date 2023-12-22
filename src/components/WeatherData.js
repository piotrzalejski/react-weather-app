import PropTypes from "prop-types";

// fetch weather data from OpenWeatherMapAPI
const WeatherData = async (locationData) => {
  if (
    locationData === undefined ||
    locationData === null ||
    Object.keys(locationData).length === 0 ||
    locationData.cod === "404" ||
    !locationData.locationString
  ) {
    console.log("WeatherData OPWM: Skipping API Call. Did not recive location");
    console.log("Issue with locationData: ", locationData);
    return locationData;
  }
  try {
    console.log("received location data");
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationData.locationString}&appid=${process.env.REACT_APP_OWM_API}`
    );
    const weatherData = await res.json();
    return weatherData;
  } catch (error) {
    console.log("Error:", error);
    return await Promise.reject("unable to fetch weather data");
  }
};

WeatherData.propTypes = {
  locationData: PropTypes.string.isRequired,
};

export default WeatherData;
