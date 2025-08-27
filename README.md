
# DevPulse – Meta Error Search Tool

DevPulse is a React-based meta search tool for developers. It aggregates error messages and solutions from multiple sources (GitHub, Stack Overflow, Reddit, etc.) using SearXNG as a meta search engine.

## Features
- Search for error messages and get results from various developer communities.
- Fast, unified interface for troubleshooting.
- Backend proxy for CORS and API aggregation.

## Project Structure
```
devpulse/
  backend/
    server.js        # Node.js proxy server
  src/
    App.tsx          # Main React app
    App.css          # Styles
  public/
    index.html       # HTML entry point
  package.json       # Project dependencies
  README.md          # Project documentation
  docker-compose.yml # SearXNG container setup
```

## SearXNG Setup

DevPulse uses SearXNG as a meta search engine. To run SearXNG locally, you can use Docker:

```bash
docker run -d -p 8080:8080 searxng/searxng
```

Or use the included `docker-compose.yml` for one-step setup:

```bash
docker-compose up -d
```

This will start SearXNG on port 8080. The backend proxy will connect to it for search aggregation.

## Getting Started

### 1. Start SearXNG (see above)

### 2. Start Backend Proxy
```bash
cd backend
npm install
node server.js
```

### 3. Start React Frontend
```bash
npm install
npm run dev
```

### 4. Search for Errors
- Enter your error message in the search bar.
- Results will be fetched from SearXNG and displayed in the app.

## Troubleshooting
- If you see `Cannot GET /` on `localhost:5000`, visit `/search?q=your_error` instead.
- Make sure SearXNG is running and accessible at `localhost:8080`.
- Check backend logs for errors.

## License
MIT
