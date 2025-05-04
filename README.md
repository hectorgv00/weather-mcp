# mcp

This project implements a Model Context Protocol (MCP) server.

## Features

- **MCP Server:** Provides a server compliant with the Model Context Protocol.
- **Weather Tool:** Includes a tool named `fetch-weather` that fetches current weather data for a specified city using the Open-Meteo API.

## Setup

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the server:**
    ```bash
    node main.ts
    ```
    _(Note: You might need to compile the TypeScript file first if you haven't set up a tool like `ts-node`)_

## Tools

### `fetch-weather`

Fetches current weather data for a given city.

**Input:**

- `city` (string): The name of the city to fetch weather data for.

**Output:**

- JSON object containing the current weather information from the Open-Meteo API.
