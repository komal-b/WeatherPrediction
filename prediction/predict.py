import numpy as np
import requests
import joblib
from datetime import datetime, timedelta
from keras.models import load_model
from dotenv import load_dotenv
import os

model = load_model("/Users/komalbagwe/WeatherDashboard/prediction/lstm_hourly_model.keras")
scaler = joblib.load("/Users/komalbagwe/WeatherDashboard/prediction/hourly_scaler.pkl")

def predict_hourly(lat, lon):
    load_dotenv()
    api_key = os.getenv("OPENWEATHER_API_KEY")
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    res = requests.get(url).json()

    try:
        temp = res["main"]["temp"]
        humidity = res["main"]["humidity"]
        pressure = res["main"]["pressure"]
        wind_kph = res["wind"]["speed"] * 3.6
        condition_raw = res.get("weather", [{}])[0].get("main", "").lower()
    except KeyError:
        return [{"hour": "N/A", "temp": "⚠️ Weather data unavailable"}]

    input_scaled = scaler.transform([[temp, humidity, pressure, wind_kph]])
    sequence = np.tile(input_scaled, (24, 1))

    X_input = sequence.reshape(1, 24, 4)
    pred_scaled = model.predict(X_input)[0]

    unscaled_preds = []
    for t in pred_scaled:
        unscaled_temp = scaler.inverse_transform([[t, 0, 0, 0]])[0][0]
        unscaled_preds.append(unscaled_temp)

    now = datetime.now()
    forecast = []

    for i, temp in enumerate(unscaled_preds):
        forecast.append({
            "hour": (now + timedelta(hours=i+1)).strftime("%Y-%m-%d %H:%M"),
            "temp": round(temp, 2),
            "condition": condition_raw
        })

    return {"hourly_forecast": forecast}
