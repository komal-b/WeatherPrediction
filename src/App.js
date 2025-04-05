import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";

import WeatherCardComponent from "./components/WeatherCard";
import WeatherMap from "./components/WeatherMap";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ForecastCard from "./components/ForecastCard";
import "leaflet/dist/leaflet.css";

export const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;


function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);

  const searchWeather = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    console.log("🔍 Searching for:", searchQuery);

    try {
      const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json`
      );

      if (!geoRes.data || geoRes.data.length === 0) {
        alert("City not found. Try again.");
        return;
      }

      const { lat, lon } = geoRes.data[0];
      const city = geoRes.data[0]?.display_name || searchQuery;

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setLocation({ city, lat, lng: lon });
      setWeather(weatherRes.data);
      fetchForecast(lat, lon);
    } catch (err) {
      console.error("❌ Axios Error:", err);
      alert("Failed to fetch weather data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (lat, lon) => {
    console.log("🌦 Fetching forecast for:", lat, lon);
    try {
      const res = await axios.get(
        `http://localhost:8000/predict?lat=${lat}&lon=${lon}`
      );
      console.log("✅ Forecast received:", res.data);
      setForecast(res.data.hourly_forecast);
    } catch (error) {
      console.error("❌ Forecast fetch failed:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ height: "100vh", backgroundColor: "#121212", color: "#ffffff" }}>
        {/* Header */}
        <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#1e1e1e" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Interactive Weather Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Search Bar */}
        <Container sx={{ mt: 3 }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchWeather={searchWeather}
          />
        </Container>

        {/* Map */}
        <Box
          id="map-container"
          sx={{
            height: "calc(100vh - 180px)",
            mt: 2,
            borderRadius: 2,
            overflow: "hidden",
            mx: 2,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
          }}
        >
          <MapContainer
            center={[20, 0]}
            zoom={3}
            minZoom={2}
            maxZoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <WeatherMap
              setWeather={setWeather}
              setLocation={setLocation}
              fetchForecast={fetchForecast}
            />
          </MapContainer>
        </Box>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Weather Info */}
        <WeatherCardComponent weather={weather} location={location} />
        <ForecastCard forecast={forecast} />
      </Box>
    </>
  );
}

export default App;
