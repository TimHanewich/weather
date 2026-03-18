import type { HourlyWeather, DailyWeather } from '../types';
import {
  getDayRunScores,
  formatHour,
  getWeatherInfo,
} from '../utils';
import type { HourRunScore } from '../types';

interface Props {
  hourly: HourlyWeather;
  daily: DailyWeather;
}

function HourRow({ score }: { score: HourRunScore }) {
  const weather = getWeatherInfo(score.weatherCode);
  return (
    <div className="hour-row">
      <span className="hour-time">{formatHour(score.time)}</span>
      <div className="hour-bar-track">
        <div
          className="hour-bar-fill"
          style={{
            width: `${score.total}%`,
            backgroundColor: score.color,
          }}
        />
      </div>
      <span className="hour-score" style={{ color: score.color }}>
        {score.total}
      </span>
      <span className="hour-icon">{weather.icon}</span>
      <span className="hour-temp">{Math.round(score.temperature)}°</span>
      <span className="hour-wind">💨 {Math.round(score.windSpeed)}</span>
      <span className="hour-gust">🌬️ {Math.round(score.windGusts)}</span>
      <span className="hour-rain">🌧️ {score.precipProbability}%</span>
    </div>
  );
}

function DaySection({
  title,
  scores,
}: {
  title: string;
  scores: HourRunScore[];
}) {
  if (scores.length === 0) return null;
  return (
    <div className="run-day-section">
      <h4 className="run-day-title">{title}</h4>
      <div className="hour-rows">
        {scores.map((s) => (
          <HourRow key={s.time} score={s} />
        ))}
      </div>
    </div>
  );
}

export default function HourlyRunForecast({ hourly, daily }: Props) {
  const todayScores = getDayRunScores(
    hourly,
    daily.sunrise[0],
    daily.sunset[0],
    daily.time[0]
  );
  const tomorrowScores =
    daily.time.length > 1
      ? getDayRunScores(
          hourly,
          daily.sunrise[1],
          daily.sunset[1],
          daily.time[1]
        )
      : [];

  return (
    <div className="hourly-run-forecast">
      <h3 className="section-title">🏃 Hourly Running Forecast</h3>

      <div className="hour-rows-header">
        <span className="hour-time">Time</span>
        <span className="hour-bar-label">Run Score</span>
        <span className="hour-score-label">#</span>
        <span className="hour-icon-label"></span>
        <span className="hour-temp">Temp</span>
        <span className="hour-wind">Wind</span>
        <span className="hour-gust">Gust</span>
        <span className="hour-rain">Rain</span>
      </div>

      <DaySection title="Today" scores={todayScores} />
      <DaySection title="Tomorrow" scores={tomorrowScores} />
    </div>
  );
}
