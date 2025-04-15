// __tests__/storageService.test.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  storeData,
  getData,
  storeWeatherData,
  getLastWeatherData,
  storeLastCity,
  getLastCity
} from '../src/services/storageService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('StorageService', () => {
  // Mock console.error to keep test output clean
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  describe('storeData', () => {
    it('should store data successfully', async () => {
      const testData = { key: 'value' };
      await storeData('testKey', testData);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify(testData)
      );
    });

    it('should handle storage errors', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error')
      );
      
      await storeData('testKey', 'value');
      
      expect(console.error).toHaveBeenCalledWith(
        'Error storing data',
        expect.any(Error)
      );
    });
  });

  describe('getData', () => {
    it('should retrieve stored data', async () => {
      const testData = { key: 'value' };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(testData)
      );
      
      const result = await getData('testKey');
      expect(result).toEqual(testData);
    });

    it('should return null for non-existent keys', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await getData('nonExistentKey');
      expect(result).toBeNull();
    });

    it('should handle read errors', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Read error')
      );
      
      const result = await getData('testKey');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error reading data',
        expect.any(Error)
      );
    });
  });

  describe('weather data specific methods', () => {
    const mockWeatherData = {
      name: 'London',
      main: { temp: 15 },
      weather: [{ main: 'Clouds' }]
    };

    it('should store and retrieve weather data', async () => {
      await storeWeatherData(mockWeatherData);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'lastWeatherData',
        JSON.stringify(mockWeatherData)
      );

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockWeatherData)
      );
      const result = await getLastWeatherData();
      expect(result).toEqual(mockWeatherData);
    });

    it('should store and retrieve last city', async () => {
      const testCity = 'London';
      await storeLastCity(testCity);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'lastSearchedCity',
        JSON.stringify(testCity)
      );

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(testCity)
      );
      const result = await getLastCity();
      expect(result).toEqual(testCity);
    });
  });

  describe('error handling', () => {
    it('should handle JSON parse errors', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('invalid json');
      
      const result = await getData('testKey');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error reading data',
        expect.any(Error)
      );
    });

    it('should handle non-string values in storeData', async () => {
      const circularReference = { self: {} };
      circularReference.self = circularReference;
      
      await storeData('testKey', circularReference);
      
      expect(console.error).toHaveBeenCalledWith(
        'Error storing data',
        expect.any(Error)
      );
    });
  });
});