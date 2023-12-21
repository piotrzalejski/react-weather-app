import { useEffect, useState } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm.js";
import PromptToLocation from "./components/PromptToLocation.js";
import WeatherData from "./components/WeatherData.js";
import WeatherCard from "./components/WeatherCard.js";

function App() {
  const [prompt, setPrompt] = useState("");
  const [promptData, setPromptData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [units, setUnits] = useState("metric");

  const handleSubmit = async (location) => {
    setPrompt(location);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!prompt) return;

      const promptRes = await PromptToLocation(prompt);
      setPromptData(promptRes);
    };
    fetchData();
  }, [prompt]);

  useEffect(() => {
    console.log("promptData: ", promptData);
    setUnits(promptData.units);
  }, [promptData]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!prompt) return;
      console.log("units: ", units);

      const weatherRes = await WeatherData(promptData);
      setWeatherData(weatherRes);
    };
    fetchWeather();
  }, [promptData, units]);

  useEffect(() => {
    console.log("updated weatherData: ", weatherData);
  }, [weatherData]);

  return (
    <div className="container">
      <section className="weather-form">
        <h1 className="page-title">Current Weather</h1>
        <WeatherForm onSubmit={handleSubmit} />
      </section>
      <section className="main-content">
        {Object.keys(promptData).length > 0 && weatherData ? (
          <WeatherCard
            data={weatherData}
            units={units}
            country={promptData.country}
            state={promptData.state}
            setUnits={setUnits}
          />
        ) : (
          <WeatherCard />
        )}
      </section>
    </div>
  );
}

export default App;
