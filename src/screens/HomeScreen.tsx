// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useWeather } from '../contexts/WeatherContext';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [inputCity, setInputCity] = useState('');
  const { weatherData, loading, error, lastSearchedCity, searchCity, loadLastWeather } = useWeather(); // Proper usage
  const insets = useSafeAreaInsets();

  // Load last searched city when component mounts
  useEffect(() => {
    console.log("Last Search :",lastSearchedCity)
    if (lastSearchedCity) {
        loadLastWeather();
    }
  }, [lastSearchedCity]);
  
  const handleSearch = () => {
    if (inputCity.trim()) {
        searchCity(inputCity);
    }
  };

  return (
    <View style={[styles.container,
        
    ]}>
      <SearchBar 
        value={inputCity}
        onChangeText={setInputCity}
        onSearch={handleSearch}
      />
      
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;



