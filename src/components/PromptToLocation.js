import PropTypes from "prop-types";

const PromptToLocation = async (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const sysMsg = `You are tasked with retrieving location data. Please follow these guidelines:

1. For locations in the United States:
   - Format your input as [City, State].
   - Example: "What is the weather in Chicago?"
   - System response: [Chicago, IL, US]

2. For locations outside the United States:
   - Format your input as [City, Country Code] following ISO 3166-2.
   - Example: "What is the weather in Krakow?"
   - System response: [Krakow, PL]

3. If the location is ambiguous or if there are multiple cities with the same name:
   - Ask for clarification.
   - Example: "What is the weather in Springfield?"
   - System response: Could you please clarify? Springfield could refer to multiple cities.

4. If the city name is misspelled:
   - Ask for clarification and suggest corrections.
   - Example: "What is the weather in Bouquete, Panama?"
   - System response: Unable to determine the location. Could you check the spelling and try again? Did you mean Boquete, Panama?

5. For any input not related to location:
   - Ask for clarification and remind the user to provide a location.
   - Example: "How far is the Earth from the Moon?"
   - System response: I'm sorry, I am unable to determine a location. Please make sure to input a location. Could you clarify and try again?
`;

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
    tools: [
      {
        type: "function",
        function: {
          name: "displayData",
          description:
            "Get current weather with given location, ignore trailing whitespaces. Do not assume, ask for clarification",
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
                description:
                  "location unit: US = imerial, other countries = metric",
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

  try {
    const res = await fetch(url, params);
    const data = await res.json();

    let promptRes = { result: "fail" };

    if (data.choices[0].message.content) {
      promptRes = data.choices[0].message.content;
      console.log("PromptToLocation - Issue determining location: ", promptRes);
      return promptRes;
    } else {
      promptRes = JSON.parse(
        data.choices[0].message.tool_calls[0].function.arguments
      );

      console.log("PromptToLocation - Successful location: ", promptRes);

      const locationString = () => {
        if (promptRes.countryCode === "US") {
          return `${promptRes.city},${promptRes.state},${promptRes.countryCode}`;
        }
        return `${promptRes.city},${promptRes.countryCode}`;
      };

      const promptData = {
        locationString: locationString(),
        units: promptRes.unit,
        country: promptRes.country,
        state: promptRes.state,
      };
      return promptData;
    }
  } catch (error) {
    console.log("Error:", error);
    return { result: "error", error: error.message };
  }
};

PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
