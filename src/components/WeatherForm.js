import PropTypes from "prop-types";
import { useState } from "react";
import "./WeatherForm.css";
//import WeatherData from "./WeatherData.js";

function WeatherForm({ onSubmit }) {
  const [inputLoc, setInputLoc] = useState("");
  const [weatherResult, setWeatherResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(inputLoc);
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
        USA enter: "city, state"
        <br />
        Other enter: "city,country"
      </p>
    </form>
  );
}

WeatherForm.prototypes = {
  onSubmit: PropTypes.func,
};

export default WeatherForm;
