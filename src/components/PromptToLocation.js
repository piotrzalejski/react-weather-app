import PropTypes from "prop-types";

const PromptToLocation = (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "displayData",
          description: "Get current weather with given location",
          parameters: {
            type: "object",
            properties: {
              country: {
                type: "string",
                description: "country name",
              },
              countryCode: {
                type: "string",
                description: "country code. use ISO-3166",
              },
              state: {
                type: "string",
                description: "two-letter state code",
              },
              city: {
                type: "string",
                description: "city name",
              },
              unit: {
                type: "string",
                description: "location unit: metric or imperial",
              },
            },
            required: ["country", "countryCode", "state", "city", "unit"],
          },
        },
        function_call: "auto",
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

      const promptRes = JSON.parse(
        data.choices[0].message.tool_calls[0].function.arguments
      );
      console.log(promptRes);

      const promptData = {
        locationString: `${promptRes.city}, ${promptRes.countryCode}`,
        units: promptRes.unit,
        country: promptRes.country,
        state: promptRes.state,
      };

      return promptData;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return fetchData(url, params);
};
PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
