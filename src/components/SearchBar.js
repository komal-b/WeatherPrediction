import React from "react";
import { TextField, Button } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery, searchWeather }) => (
  <div>
    <TextField
      label="Search for City"
      variant="outlined"
      fullWidth
      sx={{
        marginBottom: 2,
        backgroundColor: "#ffffff",
        borderRadius: 1,
        '& .MuiInputBase-root': {
          color: "#000000",
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: "#cccccc",
          },
          '&:hover fieldset': {
            borderColor: "#1976d2", // hover blue
          },
          '&.Mui-focused fieldset': {
            borderColor: "#1976d2", // focus blue
          },
        },
      }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && searchWeather()}
    />
    <Button
      variant="contained"
      onClick={searchWeather}
      fullWidth
      sx={{
        backgroundColor: "#3b4c58", // modern deep blue
        fontWeight: "bold",
        letterSpacing: 0.5,
        paddingY: 1.2,
        '&:hover': {
          backgroundColor: "	#4c5d6a",
        },
      }}
    >
      Search Weather
    </Button>
  </div>
);

export default SearchBar;
