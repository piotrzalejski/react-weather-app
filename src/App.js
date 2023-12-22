import { useEffect, useState, useRef } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm.js";
import PromptToLocation from "./components/PromptToLocation.js";
import WeatherData from "./components/WeatherData.js";
import WeatherCard from "./components/WeatherCard.js";
import WeatherDescription from "./components/WeatherDescription.js";
import Descrtiption from "./components/Description.js";

function App() {
  const [prompt, setPrompt] = useState("");
  const [promptData, setPromptData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [weatherDesc, setWeatherDesc] = useState("");
  const [units, setUnits] = useState("metric");
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);
  const [weatherDescLoading, setWeatherDescLoading] = useState(false);

  const initialMount = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!prompt || initialMount.current) {
        return;
      }

      try {
        setWeatherDataLoading(true);

        const promptRes = await PromptToLocation(prompt);
        setPromptData(promptRes);

        const weatherRes = await WeatherData(promptRes);
        setWeatherData(weatherRes);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setWeatherDataLoading(false);
      }
    };
    fetchData();
  }, [prompt]);

  useEffect(() => {
    if (promptData && promptData.units) {
      setUnits(promptData.units);
    }
  }, [promptData]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    const fetchDesc = async () => {
      if (
        !weatherData ||
        Object.keys(weatherData).length === 0 ||
        weatherDataLoading
      ) {
        return;
      } else {
        console.log("Weather Data: ", weatherData);

        setWeatherDescLoading(true);
        const weatherDescRes = await WeatherDescription(weatherData);
        setWeatherDesc(weatherDescRes);

        setWeatherDescLoading(false);
      }
    };
    fetchDesc();
  }, [weatherData, weatherDataLoading]);

  useEffect(() => {
    if (weatherDesc && !weatherDescLoading) {
      setWeatherDescLoading(false);
    }
  }, [weatherDesc, weatherDescLoading]);

  const handleSubmit = async (location) => {
    setPrompt(location);
    setWeatherDataLoading(true);
    setWeatherDescLoading(true);
  };

  return (
    <div className="container">
      <section className="weather-form">
        <h1 className="page-title">Current Weather</h1>
        <WeatherForm onSubmit={handleSubmit} />
        {weatherDesc && !weatherDataLoading && !weatherDescLoading ? (
          <Descrtiption
            isLoading={weatherDataLoading}
            weatherDescription={weatherDesc}
          />
        ) : (
          <Descrtiption />
        )}
      </section>
      <section className="main-content">
        {promptData &&
        typeof promptData === "object" &&
        Object.keys(promptData).length > 0 &&
        !weatherDataLoading ? (
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
