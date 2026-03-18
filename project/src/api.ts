import type { WeatherResponse, GeocodingResponse } from './types';

const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'uv_index_clear_sky_max',
      'uv_index_max',
      'sunshine_duration',
      'daylight_duration',
      'sunset',
      'sunrise',
      'rain_sum',
      'snowfall_sum',
      'precipitation_sum',
      'showers_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'et0_fao_evapotranspiration',
      'shortwave_radiation_sum',
      'wind_direction_10m_dominant',
      'wind_gusts_10m_max',
      'wind_speed_10m_max',
    ].join(','),
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'rain',
      'showers',
      'weather_code',
      'wind_speed_10m',
      'wind_gusts_10m',
      'wind_direction_10m',
      'relative_humidity_2m',
      'cloud_cover',
    ].join(','),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_gusts_10m',
      'wind_direction_10m',
      'wind_speed_10m',
    ].join(','),
    timezone: 'auto',
    wind_speed_unit: 'mph',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
  });

  const res = await fetch(`${WEATHER_BASE}?${params}`);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}

export async function searchLocations(
  query: string
): Promise<GeocodingResponse> {
  const params = new URLSearchParams({
    name: query,
    count: '8',
    language: 'en',
    format: 'json',
  });

  const res = await fetch(`${GEOCODING_BASE}?${params}`);
  if (!res.ok) throw new Error(`Geocoding API error: ${res.status}`);
  return res.json();
}
