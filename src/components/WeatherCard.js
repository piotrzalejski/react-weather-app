import PropTypes from "prop-types";
import "./WeatherCard.css";

//temp converter
const tempConv = (temp, unit) => {
  const allTemps = {
    k: {
      value: temp,
      unit: "°k",
    },
    c: {
      value: temp - 273,
      unit: "°C",
    },
    f: {
      value: 1.8 * (temp - 273) + 32,
      unit: "°F",
    },
  };
  if (unit === "metric") {
    return allTemps.c;
  } else if (unit === "imperial") {
    return allTemps.f;
  } else {
    return allTemps.k;
  }
};

// wind speed converter
const speedConv = (speed, unit) => {
  const allSpeeds = {
    metric: {
      value: speed,
      unit: "m/s",
    },
    imperial: {
      value: speed * 3.281,
      unit: "ft/s",
    },
  };
  if (unit === "metric") {
    return allSpeeds.metric;
  } else if (unit === "imperial") {
    return allSpeeds.imperial;
  } else {
    return allSpeeds.metric;
  }
};

const WeatherCard = ({ data, units, country, state, setUnits }) => {
  if (!data || !data.wind) {
    return <div className="loading">LOADING....</div>;
  }
  //if us state
  const stateDisplay = () => {
    if (data.sys.country === "US") {
      return `, ${state}`;
    } else {
      return "";
    }
  };

  // unit change
  const handleUnitChange = () => {
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  // wind direction
  const windDirection = {
    transform: `rotate(${data.wind.deg + 90}deg)`,
  };

  return (
    <section className="weathercard">
      <div className="weathercard-data">
        <div className="weathercard-meta">
          <div className="weathercard-meta-location">
            {`${data.name}${stateDisplay()}, ${country}`}
          </div>
        </div>
        <div className="weathercard-temp">
          <span className="temp">
            {tempConv(data.main.temp, units).value.toFixed(1)}
          </span>
          <span className="temp-unit">
            {tempConv(data.main.temp, units).unit}
          </span>
        </div>
        <div className="weathercard-wind">
          <div className="weathercard-wind-speed">
            <span className="speed">
              {speedConv(data.wind.speed, units).value.toFixed(1)}
            </span>
            <span className="windunit">
              {speedConv(data.wind.speed, units).unit}
            </span>
          </div>
          <div className="weathercard-wind-dir" style={windDirection} />
        </div>
        <button className="units" onClick={handleUnitChange}>
          Change units
        </button>
      </div>
    </section>
  );
};

//default props
WeatherCard.defaultProps = {
  data: {
    name: "--",
    sys: {
      country: "--",
    },
    main: {
      temp: 273,
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  units: "metric",
  setUnits: () => {},
};

WeatherCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    sys: PropTypes.shape({
      country: PropTypes.string,
    }),
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number,
    }),
  }),
  units: PropTypes.string,
  country: PropTypes.string,
  state: PropTypes.string,
  setUnits: PropTypes.func,
};

export default WeatherCard;
