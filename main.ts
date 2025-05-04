import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server: McpServer = new McpServer({
  name: "testServer",
  version: "0.0.1",
});

server.tool(
  "fetch-weather",
  "tool to fetch weather data",
  {
    city: z.string().describe("City name to fetch weather data for"),
  },
  async ({ city }) => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No results found for ${city}.`,
          },
        ],
      };
    }
    const { latitude, longitude } = data.results[0];
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    try {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(weatherData, null, 2),
          },
        ],
      };
    } catch (err) {
      console.error("Error en el tool:", err);
      throw err;
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
