import type { DailyWeather } from '../types';
import { getUvLabel, formatDuration } from '../utils';

interface Props {
  daily: DailyWeather;
}

export default function WeatherDetails({ daily }: Props) {
  return (
    <div className="weather-details">
      <h3 className="section-title">Today's Details</h3>
      <div className="details-grid">
        <div className="detail-card">
          <span className="detail-icon">☀️</span>
          <span className="detail-label">UV Index</span>
          <span className="detail-value">
            {daily.uv_index_max[0].toFixed(1)}
          </span>
          <span className="detail-extra">
            {getUvLabel(daily.uv_index_max[0])}
          </span>
        </div>

        <div className="detail-card">
          <span className="detail-icon">🌤️</span>
          <span className="detail-label">Sunshine</span>
          <span className="detail-value">
            {formatDuration(daily.sunshine_duration[0])}
          </span>
          <span className="detail-extra">
            of {formatDuration(daily.daylight_duration[0])} daylight
          </span>
        </div>

        <div className="detail-card">
          <span className="detail-icon">🌧️</span>
          <span className="detail-label">Precipitation</span>
          <span className="detail-value">
            {daily.precipitation_sum[0].toFixed(2)} in
          </span>
          <span className="detail-extra">
            {daily.precipitation_hours[0]}h &middot;{' '}
            {daily.precipitation_probability_max[0]}% chance
          </span>
        </div>

        <div className="detail-card">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Max Wind</span>
          <span className="detail-value">
            {Math.round(daily.wind_speed_10m_max[0])} mph
          </span>
          <span className="detail-extra">
            Gusts up to {Math.round(daily.wind_gusts_10m_max[0])} mph
          </span>
        </div>

        <div className="detail-card">
          <span className="detail-icon">🌱</span>
          <span className="detail-label">Evapotranspiration</span>
          <span className="detail-value">
            {daily.et0_fao_evapotranspiration[0].toFixed(3)} in
          </span>
        </div>

        <div className="detail-card">
          <span className="detail-icon">📡</span>
          <span className="detail-label">Solar Radiation</span>
          <span className="detail-value">
            {daily.shortwave_radiation_sum[0].toFixed(1)} MJ/m²
          </span>
        </div>
      </div>
    </div>
  );
}
