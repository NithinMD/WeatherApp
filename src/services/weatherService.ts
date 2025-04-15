import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/constants';
import { WeatherData } from '../types/weatherTypes';

export const fetchWeatherByCity = async (city: string) => {
  const response = await fetch(
    BASE_URL + `?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error('City not found');
  return await response.json();
};
