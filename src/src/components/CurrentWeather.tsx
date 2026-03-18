import type { CurrentWeatherData, CurrentUnits, DailyWeather } from '../types';
import { getWeatherInfo, getWindDirection, formatTime } from '../utils';

interface Props {
  current: CurrentWeatherData;
  units: CurrentUnits;
  daily: DailyWeather;
  locationName: string;
}

export default function CurrentWeather({
  current,
  daily,
  locationName,
}: Props) {
  const weather = getWeatherInfo(current.weather_code, current.is_day === 1);

  return (
    <div className="current-weather">
      <div className="current-main">
        <h2 className="location-name">{locationName}</h2>
        <div className="current-temp-row">
          <span className="weather-emoji">{weather.icon}</span>
          <span className="current-temp">
            {Math.round(current.temperature_2m)}°
          </span>
        </div>
        <p className="weather-description">{weather.description}</p>
        <p className="feels-like">
          Feels like {Math.round(current.apparent_temperature)}°F &middot; H:{' '}
          {Math.round(daily.temperature_2m_max[0])}° L:{' '}
          {Math.round(daily.temperature_2m_min[0])}°
        </p>
      </div>

      <div className="current-stats">
        <div className="stat">
          <span className="stat-label">💨 Wind</span>
          <span className="stat-value">
            {Math.round(current.wind_speed_10m)} mph{' '}
            {getWindDirection(current.wind_direction_10m)}
          </span>
          <span className="stat-detail">
            Gusts {Math.round(current.wind_gusts_10m)} mph
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">💧 Humidity</span>
          <span className="stat-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">🌡️ Pressure</span>
          <span className="stat-value">
            {current.pressure_msl.toFixed(0)} hPa
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">☁️ Cloud Cover</span>
          <span className="stat-value">{current.cloud_cover}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">🌅 Sunrise</span>
          <span className="stat-value">{formatTime(daily.sunrise[0])}</span>
        </div>
        <div className="stat">
          <span className="stat-label">🌇 Sunset</span>
          <span className="stat-value">{formatTime(daily.sunset[0])}</span>
        </div>
      </div>
    </div>
  );
}
