import PropTypes from "prop-types";

// festch weather data from OpenWeatherMapAPI
const WeatherData = async (locationData) => {
  try {
    // update to eventually take city, state, country code
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationData}&appid=${process.env.REACT_APP_OWM_API}`
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
