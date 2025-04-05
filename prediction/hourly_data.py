import pandas as pd

# Load your file
df = pd.read_csv("/Users/komalbagwe/WeatherDashboard/prediction/GlobalWeatherRepository.csv")
df['last_updated'] = pd.to_datetime(df['last_updated'])

# Keep desired columns including condition
df = df[['last_updated', 'temperature_celsius', 'humidity', 'pressure_mb', 'wind_kph', 'condition_text']]
df = df.sort_values('last_updated').set_index('last_updated')

# Handle missing condition_text with a placeholder
df['condition_text'] = df['condition_text'].fillna("Unknown")

# Define how to resample each column
resampled = df.resample('1H').agg({
    'temperature_celsius': 'mean',
    'humidity': 'mean',
    'pressure_mb': 'mean',
    'wind_kph': 'mean',
    'condition_text': lambda x: x.mode().iloc[0] if not x.mode().empty else "Unknown"  # Most frequent condition
}).dropna()

# Save to CSV
resampled.to_csv("/Users/komalbagwe/WeatherDashboard/prediction/hourly_weather.csv")
print("✅ Saved hourly_weather.csv with condition_text.")
