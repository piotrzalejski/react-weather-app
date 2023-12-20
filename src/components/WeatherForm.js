import PropTypes from "prop-types";
import { useState } from "react";
import "./WeatherForm.css";
import WeatherData from "./WeatherData.js";

function WeatherForm({ onSubmit }) {
  const [inputLoc, setInputLoc] = useState("");
  const [weatherResult, setWeatherResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await WeatherData(inputLoc);
      setWeatherResult(data);
      console.log(JSON.stringify(weatherResult));
    } catch (err) {
      console.error("Error fetching weather data: ", err);
      setWeatherResult(null);
    }
  };

  return (
    <form className="locationForm" onSubmit={handleSubmit}>
      <div className="locationform-elements">
        <label htmlFor="location">Enter location:</label>
        <input
          id="location"
          type="text"
          value={inputLoc}
          onChange={(e) => setInputLoc(e.target.value)}
          placeholder="City,sate/country code"
        />
        <input type="submit" value="Submit" />
      </div>
      <p className="instructions">
        USA: enter "city,2-letter state code"
        <br />
        Other: enter" city,2-letter country code"
      </p>
    </form>
  );
}

WeatherForm.prototypes = {
  onSubmit: PropTypes.func,
};

export default WeatherForm;
