import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue =  JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading data', e);
    return null;
  }
};

// Specific methods for weather data
export const storeWeatherData = async (data: any) => {
  await storeData('lastWeatherData', data);
};

export const getLastWeatherData = async () => {
  return await getData('lastWeatherData');
};

export const storeLastCity = async (city: string) => {
  await storeData('lastSearchedCity', city);
};

export const getLastCity = async () => {
  return await getData('lastSearchedCity');
};