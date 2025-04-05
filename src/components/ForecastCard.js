import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";

// 🎯 Map condition text to icons
const getWeatherIcon = (condition) => {
  if (!condition) return <CloudIcon sx={{ color: "#aaa" }} />;

  const cond = condition.toLowerCase();

  if (cond.includes("sunny") || cond.includes("clear")) {
    return <WbSunnyIcon sx={{ color: "#fdd835" }} />;
  } else if (
    cond.includes("partly cloudy") ||
    cond.includes("cloudy") ||
    cond.includes("overcast")
  ) {
    return <CloudIcon sx={{ color: "#90a4ae" }} />;
  } else if (
    cond.includes("rain") ||
    cond.includes("drizzle") ||
    cond.includes("sleet") ||
    cond.includes("shower")
  ) {
    return <OpacityIcon sx={{ color: "#4fc3f7" }} />;
  } else if (
    cond.includes("thunder") ||
    cond.includes("thundery")
  ) {
    return <ThunderstormIcon sx={{ color: "#ff7043" }} />;
  } else if (
    cond.includes("snow") ||
    cond.includes("freezing")
  ) {
    return <AcUnitIcon sx={{ color: "#81d4fa" }} />;
  } else if (
    cond.includes("fog") ||
    cond.includes("mist") ||
    cond.includes("haze")
  ) {
    return <CloudIcon sx={{ color: "#b0bec5" }} />;
  }

  return <CloudIcon sx={{ color: "#aaa" }} />;
};

// Format time like 03:00 PM
const formatHour = (hourStr) => {
  const date = new Date(hourStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
};

const ForecastCard = ({ forecast }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🟡 Floating Button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          backgroundColor: "#2c2c2c",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        }}
      >
        <AccessTimeIcon />
        <Typography sx={{ marginLeft: 1, fontSize: "0.9rem" }}>
          Weather Predictions
        </Typography>
      </IconButton>

      {/* 🔵 Slide-up Panel */}
      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 320,
            maxHeight: 420,
            overflowY: "auto",
            backgroundColor: "#1e1e1e",
            color: "#f5f5f5",
            p: 2,
            borderRadius: "12px",
            zIndex: 9999,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              24 Hour Weather Forecast
            </Typography>
            <IconButton onClick={() => setOpen(false)} size="small" sx={{ color: "#555" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1, backgroundColor: "#444" }} />

          {forecast?.hourly_forecast?.length > 0 ? (
            <List dense>
              {forecast.hourly_forecast.map((hour, index) => (
                <ListItem key={index} sx={{ px: 1 }}>
                  <ListItemIcon>
                    {getWeatherIcon(hour.condition)}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ color: "#fff" }}>{formatHour(hour.hour)}</Typography>}
                    secondary={<Typography sx={{ color: "#ccc" }}>{`${hour.temp}°C`}</Typography>}
                />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              No forecast available.
            </Typography>
          )}
        </Paper>
      )}
    </>
  );
};

export default ForecastCard;
