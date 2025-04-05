# Weather Prediction ⛅️

An interactive web application that displays real-time weather conditions and predicts the next 24-hour temperature forecast using an LSTM-based machine learning model.

## 🚀 Features

- 🌍 Interactive dark-themed map using **React Leaflet**
- ⌚ Click on any location or search by city name to get weather data
- 🌧️ Current weather details (temperature, humidity, wind speed, etc.)
- ⏳ **Hourly temperature prediction** for the next 24 hours using a trained **LSTM model**
- ⚡ Weather icons adapt based on condition (sunny, cloudy, rainy, etc.)
- 🌐 Live data pulled using **OpenWeather API** 
- ⚖️ Backend powered by **FastAPI** for ML inference

## 📁 Tech Stack

### Frontend
- React
- Material UI
- React Leaflet

### Backend
- FastAPI
- Keras + Tensorflow (for LSTM model)
- Pandas + NumPy + Scikit-learn

### Data
- Historical weather data from `GlobalWeatherRepository.csv`
- Real-time data from [OpenWeather](https://openweathermap.org/)

## 📊 How It Works

1. **Frontend:**
   - User clicks on map or searches for a city.
   - Weather data fetched from OpenWeather API.
   - Lat/Lon passed to backend for prediction.

2. **Backend (FastAPI):**
   - Loads a trained LSTM model.
   - Uses latest weather data as input.
   - Predicts the next 24 hourly temperatures.
   - Sends response to frontend.

3. **Frontend (again):**
   - Displays forecast in a sliding panel.
   - Uses icons for visual weather conditions.

## 💪 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/komal-b/WeatherPrediction.git
cd WeatherPrediction
```

### 2. Backend Setup
```bash
cd prediction
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Create a `.env` file in the root:
```
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Then run the API server:
```bash
python app.py
```

### 3. Frontend Setup
```bash
cd ../  # Back to project root
npm install
```

Create a `.env` file in the root of React app:
```
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Then run the frontend:
```bash
npm start
```

## 📈 Demo & Screenshots

(Insert screenshots or a demo link here if hosted)

## 📡 API Reference

- **GET /predict?lat=...&lon=...**
  - Returns the next 24-hour forecast in JSON.

## 🌟 Enhancements Ideas

- Add rainfall and wind speed forecasts
- Multi-day forecasting
- Save favorite locations
- Deploy on cloud (Render, Vercel, etc.)
- Support more weather condition icons

## ❤️ Credits

- Weather API: [OpenWeather](https://openweathermap.org/)
- Map: [Leaflet](https://leafletjs.com/)
- UI: [Material UI](https://mui.com/)
- ML: TensorFlow, Keras, Pandas

---

> Built with passion by [@komal-b](https://github.com/komal-b) 🚀

