
import React from "react";
import { useMapEvents } from "react-leaflet";
import axios from "axios";



export const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const WeatherMap = ({ setWeather, setLocation, fetchForecast }) => {
  useMapEvents({
    click: async (event) => {
      const { lat, lng } = event.latlng;
  
      try {
        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const city =
          geoRes.data.address?.city ||
          geoRes.data.address?.town ||
          geoRes.data.address?.village ||
          geoRes.data.address?.country ||
          "Location";
  
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        );
  
        setLocation({ city, lat, lng });
        setWeather(weatherRes.data);
  
        // ✅ Call forecast API with safe fallback
        if (typeof fetchForecast === "function") {
          try {
            await fetchForecast(lat, lng);
          } catch (forecastError) {
            console.warn("⚠️ Forecast API error (suppressed):", forecastError.message);
          }
        }
  
      } catch (error) {
        console.error("❌ Failed to fetch weather from map click:", error.message);
      }
    },
  });
  
  return null;
};

export default WeatherMap;
