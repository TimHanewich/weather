import type { DailyWeather } from '../types';
import { getWeatherInfo, formatDay } from '../utils';

interface Props {
  daily: DailyWeather;
}

export default function DailyForecast({ daily }: Props) {
  return (
    <div className="daily-forecast">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="forecast-cards">
        {daily.time.map((date, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          return (
            <div key={date} className="forecast-card">
              <span className="forecast-day">{formatDay(date, i)}</span>
              <span className="forecast-icon">{info.icon}</span>
              <span className="forecast-desc">{info.description}</span>
              <div className="forecast-temps">
                <span className="temp-high">
                  {Math.round(daily.temperature_2m_max[i])}°
                </span>
                <span className="temp-low">
                  {Math.round(daily.temperature_2m_min[i])}°
                </span>
              </div>
              <div className="forecast-meta">
                <span>💧 {daily.precipitation_probability_max[i]}%</span>
                <span>💨 {Math.round(daily.wind_speed_10m_max[i])}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
