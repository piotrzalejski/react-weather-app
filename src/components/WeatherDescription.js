import PropTypes from "prop-types";

const WeatherDescription = (weatherData) => {
  if (
    Object.keys(weatherData).length === 0 ||
    typeof weatherData !== "object"
  ) {
    console.log("No weather data provided. Skipping API response.");
    console.log("WeatherDescription - issue with weatherData: ", weatherData);
    return weatherData;
  } else {
    const tempKelvin = weatherData.main.temp;
    const tempCelsius = tempKelvin - 273.15;
    const tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;

    const url = "https://api.openai.com/v1/chat/completions";

    const sysMsg = `
      In a conversational friendly tone, answer the [Question] based on the [Weather Data].
      - Never display the temperature in Kelvin
      - Provide the temperature in the appropriate [unit] based on location. Either F or C
      - Provide a recommendation on how to prepare and what to wear (example wear a jacket, bring an umbrella, wear rainboots)
      - Answer under 3 sentences
      
      Example Response:
      "The current temperature in ${weatherData.name} is ${tempCelsius.toFixed(
      2
    )}°C (${tempFahrenheit.toFixed(
      2
    )}°F), so it's a pleasant day. You might want to wear a light jacket and bring sunglasses."
    `;

    const prompt = `Question: What is weather like? Weather Data: ${JSON.stringify(
      weatherData
    )}`;

    console.log("weather propmpt : ", prompt);

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: sysMsg,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    };

    const params = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    };

    const fetchData = async (url, params) => {
      try {
        const res = await fetch(url, params);
        const data = await res.json();

        const promptRes = data.choices[0].message.content;
        console.log(promptRes);

        return promptRes;
      } catch (error) {
        console.log("Error:", error);
      }
    };

    return fetchData(url, params);
  }
};

WeatherDescription.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default WeatherDescription;
