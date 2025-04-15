export interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
   
  }
  
  export interface WeatherContextType {
    weatherData: WeatherData | null;
    loading: boolean;
    error: string | null;
    lastSearchedCity: string;
    fetchWeather: (city: string) => Promise<void>;
  }