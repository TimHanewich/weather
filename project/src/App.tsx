import { useState, useEffect, useCallback } from 'react';
import { fetchWeather } from './api';
import type { WeatherResponse, WeatherLocation } from './types';
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';
import WeatherDetails from './components/WeatherDetails';
import HourlyRunForecast from './components/HourlyRunForecast';
import './App.css';

const DEFAULT_LOCATION: WeatherLocation = {
  name: 'Sarasota',
  latitude: 27.179768,
  longitude: -82.46709,
  country: 'United States',
  admin1: 'Florida',
};

function App() {
  const [location, setLocation] = useState<WeatherLocation>(DEFAULT_LOCATION);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async (loc: WeatherLocation) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(loc.latitude, loc.longitude);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(location);
  }, [location, loadWeather]);

  const locationLabel = [location.name, location.admin1, location.country]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">⛅ Weather</h1>
        <LocationSearch onSelect={setLocation} />
      </header>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Loading weather data…</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-box">
          <p>⚠️ {error}</p>
          <button onClick={() => loadWeather(location)}>Retry</button>
        </div>
      )}

      {weather && !loading && (
        <>
          <CurrentWeather
            current={weather.current}
            units={weather.current_units}
            daily={weather.daily}
            locationName={locationLabel}
          />
          <DailyForecast daily={weather.daily} />
          <WeatherDetails daily={weather.daily} />
          <HourlyRunForecast hourly={weather.hourly} daily={weather.daily} />
          <footer className="dashboard-footer">
            <p>
              Data from{' '}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open-Meteo
              </a>{' '}
              &middot; Updated{' '}
              {new Date(weather.current.time).toLocaleTimeString()} &middot;{' '}
              {weather.timezone_abbreviation}
            </p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
