import type { HourRunScore, HourlyWeather } from './types';

interface WmoInfo {
  description: string;
  icon: string;
  nightIcon?: string;
}

const WMO_CODES: Record<number, WmoInfo> = {
  0: { description: 'Clear sky', icon: '☀️', nightIcon: '🌙' },
  1: { description: 'Mainly clear', icon: '🌤️', nightIcon: '🌙' },
  2: { description: 'Partly cloudy', icon: '⛅', nightIcon: '☁️' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  48: { description: 'Rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  56: { description: 'Freezing drizzle', icon: '🌧️' },
  57: { description: 'Heavy freezing drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌦️' },
  63: { description: 'Rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  66: { description: 'Freezing rain', icon: '🌧️' },
  67: { description: 'Heavy freezing rain', icon: '🌧️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Snow', icon: '🌨️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Light showers', icon: '🌦️' },
  81: { description: 'Showers', icon: '🌧️' },
  82: { description: 'Heavy showers', icon: '⛈️' },
  85: { description: 'Light snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with hail', icon: '⛈️' },
  99: { description: 'Severe thunderstorm', icon: '⛈️' },
};

export function getWeatherInfo(code: number, isDay = true) {
  const info = WMO_CODES[code] ?? { description: 'Unknown', icon: '❓' };
  if (!isDay && info.nightIcon) {
    return { ...info, icon: info.nightIcon };
  }
  return info;
}

export function getWindDirection(degrees: number): string {
  const dirs = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  return dirs[Math.round(degrees / 22.5) % 16];
}

export function formatTime(iso: string): string {
  const timePart = iso.split('T')[1];
  if (!timePart) return iso;
  const [h, m] = timePart.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${period}`;
}

export function formatHour(iso: string): string {
  const timePart = iso.split('T')[1];
  if (!timePart) return iso;
  const h = parseInt(timePart.split(':')[0], 10);
  if (h === 0) return '12 AM';
  if (h === 12) return '12 PM';
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

export function formatDay(dateString: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const date = new Date(dateString + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getUvLabel(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

// ===== Run Score Algorithm =====

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Precipitation sub-score (0–100). 0% prob = 100, ≥60% = 0. Active rain = 0. */
function scorePrecipitation(probPercent: number, rainInch: number): number {
  if (rainInch > 0.01) return 0;
  if (probPercent >= 60) return 0;
  if (probPercent <= 5) return 100;
  return Math.round(100 * (1 - probPercent / 60));
}

/** Temperature sub-score (0–100). 65–85°F apparent = 100, drops off outside. */
function scoreTemperature(apparentF: number): number {
  if (apparentF >= 65 && apparentF <= 85) return 100;
  if (apparentF < 65) {
    // 40°F → 0, 65°F → 100
    return Math.round(clamp((apparentF - 40) / 25, 0, 1) * 100);
  }
  // 85°F → 100, 105°F → 0
  return Math.round(clamp((105 - apparentF) / 20, 0, 1) * 100);
}

/** Wind speed sub-score (0–100). <5 mph = 100, >25 mph = 0. */
function scoreWind(mph: number): number {
  if (mph <= 5) return 100;
  if (mph >= 25) return 0;
  return Math.round(100 * (1 - (mph - 5) / 20));
}

/** Gust sub-score (0–100). <10 mph = 100, >40 mph = 0. */
function scoreGusts(mph: number): number {
  if (mph <= 10) return 100;
  if (mph >= 40) return 0;
  return Math.round(100 * (1 - (mph - 10) / 30));
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Great';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Bad';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e'; // green
  if (score >= 60) return '#84cc16'; // lime
  if (score >= 40) return '#f59e0b'; // amber
  if (score >= 20) return '#ef4444'; // red
  return '#991b1b'; // dark red
}

export function calculateRunScore(
  hourly: HourlyWeather,
  index: number
): HourRunScore {
  const precipProb = hourly.precipitation_probability[index];
  const rain = hourly.rain[index] + hourly.showers[index];
  const apparentTemp = hourly.apparent_temperature[index];
  const windSpeed = hourly.wind_speed_10m[index];
  const windGusts = hourly.wind_gusts_10m[index];

  const precipScore = scorePrecipitation(precipProb, rain);
  const tempScore = scoreTemperature(apparentTemp);
  const windScore = scoreWind(windSpeed);
  const gustScore = scoreGusts(windGusts);

  const total = Math.round(
    precipScore * 0.35 +
    tempScore * 0.25 +
    windScore * 0.2 +
    gustScore * 0.2
  );

  return {
    time: hourly.time[index],
    hour: parseInt(hourly.time[index].split('T')[1].split(':')[0], 10),
    total,
    precipScore,
    tempScore,
    windScore,
    gustScore,
    label: getScoreLabel(total),
    color: getScoreColor(total),
    temperature: hourly.temperature_2m[index],
    apparentTemperature: apparentTemp,
    precipProbability: precipProb,
    rain,
    windSpeed,
    windGusts,
    weatherCode: hourly.weather_code[index],
  };
}

/** Extract hour (0–23) from an ISO time string like "2026-03-18T07:35" */
function extractHour(iso: string): number {
  return parseInt(iso.split('T')[1].split(':')[0], 10);
}

/**
 * Get scored hourly data for a single day, filtered to daylight hours.
 * dayIndex: 0 = today, 1 = tomorrow in the daily arrays.
 */
export function getDayRunScores(
  hourly: HourlyWeather,
  sunrise: string,
  sunset: string,
  dateStr: string
): HourRunScore[] {
  const sunriseHour = extractHour(sunrise);
  const sunsetHour = extractHour(sunset);

  const scores: HourRunScore[] = [];
  for (let i = 0; i < hourly.time.length; i++) {
    const t = hourly.time[i];
    if (!t.startsWith(dateStr)) continue;
    const h = extractHour(t);
    if (h < sunriseHour || h > sunsetHour) continue;
    scores.push(calculateRunScore(hourly, i));
  }
  return scores;
}

/** Find the best hour to run from a set of scored hours. */
export function findBestHour(scores: HourRunScore[]): HourRunScore | null {
  if (scores.length === 0) return null;
  return scores.reduce((best, cur) => (cur.total > best.total ? cur : best));
}
