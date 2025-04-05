# app.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import nbimporter
import predict  # Your prediction logic as a Python module

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend URL for production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def get_hourly(lat: float = Query(...), lon: float = Query(...)):
    forecast = predict.predict_hourly(lat, lon)
    return {"hourly_forecast": forecast}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
