import React from "react";
import { Paper, Typography, Grid, Divider } from "@mui/material";
import { styled } from "@mui/system";

const WeatherCard = styled(Paper)(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#222831",
  color: "#f1f1f1",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
  zIndex: 1000,
  minWidth: "280px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "90%",
  },
}));

const Label = ({ title, value, unit }) => (
  <Grid item xs={6}>
    <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
      {title}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 500 }}>
      {value} {unit}
    </Typography>
  </Grid>
);

const WeatherCardComponent = ({ weather, location }) =>
  weather &&
  location && (
    <WeatherCard>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {location.city || "Location"}
      </Typography>
      <Typography variant="body2" sx={{ color: "#bbbbbb", mb: 2 }}>
        Lat: {Number(location.lat).toFixed(2)} | Lon: {Number(location.lng).toFixed(2)}
      </Typography>

      <Divider sx={{ backgroundColor: "#444", mb: 2 }} />

      <Grid container spacing={2}>
        <Label title="Temperature" value={weather.main.temp} unit="°C" />
        <Label title="Humidity" value={weather.main.humidity} unit="%" />
        <Label title="Wind Speed" value={weather.wind.speed} unit="m/s" />
        <Label title="Pressure" value={weather.main.pressure} unit="hPa" />
      </Grid>
    </WeatherCard>
  );

export default WeatherCardComponent;
