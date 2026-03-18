export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  weather_code: string;
  cloud_cover: string;
  pressure_msl: string;
  surface_pressure: string;
  wind_gusts_10m: string;
  wind_direction_10m: string;
  wind_speed_10m: string;
}

export interface CurrentWeatherData {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_gusts_10m: number;
  wind_direction_10m: number;
  wind_speed_10m: number;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  rain: string;
  showers: string;
  weather_code: string;
  wind_speed_10m: string;
  wind_gusts_10m: string;
  wind_direction_10m: string;
  relative_humidity_2m: string;
  cloud_cover: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  showers: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  wind_direction_10m: number[];
  relative_humidity_2m: number[];
  cloud_cover: number[];
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  uv_index_clear_sky_max: string;
  uv_index_max: string;
  sunshine_duration: string;
  daylight_duration: string;
  sunset: string;
  sunrise: string;
  rain_sum: string;
  snowfall_sum: string;
  precipitation_sum: string;
  showers_sum: string;
  precipitation_hours: string;
  precipitation_probability_max: string;
  et0_fao_evapotranspiration: string;
  shortwave_radiation_sum: string;
  wind_direction_10m_dominant: string;
  wind_gusts_10m_max: string;
  wind_speed_10m_max: string;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  uv_index_clear_sky_max: number[];
  uv_index_max: number[];
  sunshine_duration: number[];
  daylight_duration: number[];
  sunset: string[];
  sunrise: string[];
  rain_sum: number[];
  snowfall_sum: number[];
  precipitation_sum: number[];
  showers_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  et0_fao_evapotranspiration: number[];
  shortwave_radiation_sum: number[];
  wind_direction_10m_dominant: number[];
  wind_gusts_10m_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeatherData;
  hourly_units: HourlyUnits;
  hourly: HourlyWeather;
  daily_units: DailyUnits;
  daily: DailyWeather;
}

export interface HourRunScore {
  time: string;
  hour: number;
  total: number;
  precipScore: number;
  tempScore: number;
  windScore: number;
  gustScore: number;
  label: string;
  color: string;
  temperature: number;
  apparentTemperature: number;
  precipProbability: number;
  rain: number;
  windSpeed: number;
  windGusts: number;
  weatherCode: number;
}

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country_code?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}
