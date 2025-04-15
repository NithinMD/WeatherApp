// src/contexts/WeatherContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWeatherByCity } from '../services/weatherService';
import { 
    storeWeatherData, 
    getLastWeatherData,
    storeLastCity,
    getLastCity 
  } from '../services/storageService';

interface WeatherContextType {
  weatherData: any;
  loading: boolean;
  error: string | null;
  lastSearchedCity: string | null;
  searchCity: (city: string) => Promise<void>;
  loadLastWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  // Load last searched city and weather on app start
  useEffect(() => {
    loadLastWeather();
  }, []);
  
  const loadLastWeather = async () => {
    try {
      setLoading(true);
      const [savedCity, savedWeather] = await Promise.all([
        getLastCity(),
        getLastWeatherData()
      ]);
      console.log("Saved city: ",savedCity)
      if (savedCity) {
        setLastSearchedCity(savedCity);
      }
      
      if (savedWeather) {
        setWeatherData(savedWeather);
      }
    } catch (err) {
      console.error('Failed to load last weather', err);
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
      setLastSearchedCity(city);
      
      // Save to storage
      await Promise.all([
        storeWeatherData(data),
        storeLastCity(city)
      ]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, loading, error,lastSearchedCity, searchCity,loadLastWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

