import { useEffect, useState } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm.js";
import PromptToLocation from "./components/PromptToLocation.js";
import WeatherData from "./components/WeatherData.js";

function App() {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = async (location) => {
    setPrompt(location);
    const promptRes = await PromptToLocation(location);
    const weatherRes = await WeatherData(promptRes);
    console.log(promptRes);
    console.log(weatherRes);
  };

  return (
    <div className="container">
      <section className="weather-form">
        <h1 className="page-title">Current Weather</h1>
        <WeatherForm onSubmit={handleSubmit} />
      </section>
      <section className="main-content">
        <p>Main content goes here</p>
      </section>
    </div>
  );
}

export default App;
