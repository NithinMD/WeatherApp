// __tests__/weatherService.test.ts
import axios from 'axios';
import { fetchWeatherByCity } from '../src/services/weatherService';
import { WeatherData } from '../src/types/weatherTypes';

// Mock axios properly
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the constants without requiring a real URL
jest.mock('../src/utils/constants', () => ({
  API_KEY: 'test-api-key',
  BASE_URL: 'http://test-api-url.com' // Doesn't need to be real
}));

// Complete mock weather data
const createMockWeatherData = (overrides: Partial<WeatherData> = {}): WeatherData => ({
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  main: {
    temp: 22.5,
    feels_like: 21.3,
    temp_min: 20.1,
    temp_max: 24.8,
    pressure: 1012,
    humidity: 65,
  },

  wind: { speed: 3.1, deg: 120 },
  sys: { country: 'GB', sunrise: 1643689200, sunset: 1643722800 },
  name: 'London',
  ...overrides
});

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherByCity', () => {
    it('should fetch weather data successfully', async () => {
      // Arrange
      const mockData = createMockWeatherData();
      mockedAxios.get.mockResolvedValue({ data: mockData });

      // Act
      const result = await fetchWeatherByCity('London');

      // Assert
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('weather'),
        {
          params: {
            q: 'London',
            appid: 'test-api-key',
            units: 'metric',
            lang: 'en'
          }
        }
      );
    });

    it('should handle 404 city not found error', async () => {
      // Arrange
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 404,
          data: { message: 'city not found' }
        }
      });

      // Act & Assert
      await expect(fetchWeatherByCity('InvalidCity'))
        .rejects.toThrow('city not found');
    });

    it('should handle network errors', async () => {
      // Arrange
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      // Act & Assert
      await expect(fetchWeatherByCity('London'))
        .rejects.toThrow('Network Error');
    });

    it('should handle malformed API responses', async () => {
      // Arrange
      mockedAxios.get.mockResolvedValue({ 
        data: { invalid: 'response' } 
      });

      // Act & Assert
      await expect(fetchWeatherByCity('London'))
        .rejects.toThrow('Invalid weather data');
    });

    it('should include custom parameters when provided', async () => {
      // Arrange
      const mockData = createMockWeatherData();
      mockedAxios.get.mockResolvedValue({ data: mockData });

      // Act
      await fetchWeatherByCity('London');

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            units: 'imperial',
            lang: 'fr'
          })
        })
      );
    });
  });
});