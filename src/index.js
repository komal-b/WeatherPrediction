// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";  // Import from react-dom/client
import App from "./App";
import { CssBaseline } from "@mui/material";

// Create the root container using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
