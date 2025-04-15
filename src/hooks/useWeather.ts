// useWeather.ts
import { useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/constants';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric', // For Celsius (use 'imperial' for Fahrenheit)
            lang: 'en',
          },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeather };
};

export default useWeather;
