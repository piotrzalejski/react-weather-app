import { useEffect, useState } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm.js";

function App() {
  const [city, setCity] = useState("");
  const handleSubmit = (location) => {
    setCity(location);
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
