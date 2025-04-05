import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import joblib

# === Load hourly data ===
df = pd.read_csv("/Users/komalbagwe/WeatherDashboard/prediction/hourly_weather.csv")
df['last_updated'] = pd.to_datetime(df['last_updated'], errors='coerce')
df.dropna(inplace=True)

df = pd.get_dummies(df, columns=['condition_text'])

features = ['temperature_celsius', 'humidity', 'pressure_mb', 'wind_kph']
df = df[features]


# === Scale features ===
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(df)
joblib.dump(scaler, "/Users/komalbagwe/WeatherDashboard/prediction/hourly_scaler.pkl")

# === Create sequences ===
def create_sequences(data, input_steps=24, output_steps=24):
    X, y = [], []
    for i in range(len(data) - input_steps - output_steps):
        X.append(data[i:i+input_steps])
        y.append(data[i+input_steps:i+input_steps+output_steps, 0])  # temperature only
    return np.array(X), np.array(y)

X, y = create_sequences(scaled_data, 24, 24)

# === Train/test split ===
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# === Build LSTM model ===
model = Sequential([
    LSTM(64, input_shape=(X_train.shape[1], X_train.shape[2])),
    Dense(24)  # predict next 24 hourly temps
])
model.compile(loss='mse', optimizer='adam')
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.1)

# === Save model ===
model.save("/Users/komalbagwe/WeatherDashboard/prediction/lstm_hourly_model.keras")
print("✅ Trained and saved LSTM model for hourly forecasts.")
