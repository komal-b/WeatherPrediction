// src/components/LoadingSpinner.js
import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    <CircularProgress color="inherit" />
  </div>
);

export default LoadingSpinner;
