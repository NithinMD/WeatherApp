// src/screens/HomeScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useWeather } from '../contexts/WeatherContext';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { SafeAreaView,useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles as createStyles } from '../styles/homeScreenStyles';
import { platformStyles } from '../utils/platformUtils';
import debounce from 'lodash/debounce'; // Import debounce
import NetInfo from '@react-native-community/netinfo';  // Import NetInfo
import { Button } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../components/SafeIcon';

const HomeScreen = () => {
  const [inputCity, setInputCity] = useState('');
  const { weatherData, loading, error, lastSearchedCity, searchCity, loadLastWeather } = useWeather(); // Proper usage
  const insets = useSafeAreaInsets();

  const [isConnected, setIsConnected] = useState(true);  // State for network connection
  const [retry, setRetry] = useState(false);  // State for retry logic

  // Monitor network connectivity status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected); // Update connection state
    });

    return () => unsubscribe();  // Clean up listener when the component unmounts
  }, []);
  

  const { theme, toggleTheme } = useTheme();

  const styles = createStyles(theme);


  // Load last searched city when component mounts
  useEffect(() => {
    console.log("Last Search :",lastSearchedCity)
    if (lastSearchedCity) {
        loadLastWeather();
    }
  }, [lastSearchedCity]);
  

  const handleRetry = () => {
    setRetry(true);
    if (inputCity.trim()) {
      searchCity(inputCity); // Retry the search with the input city
    }
  };
  const handleSearch = () => {
    if (inputCity.trim()) {
        searchCity(inputCity);
    }
  };

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((city: string) => {
      if (city.trim()) {
        searchCity(city); // Trigger searchCity when the debounce delay passes
      }
    }, 500), // Adjust delay as needed (500ms in this case)
    []
  );

  const handleInputChange = (text: string) => {
    setInputCity(text); // Update inputCity state
    debouncedSearch(text); // Call the debounced search function
  };
  
  return (
    <SafeAreaView style={[styles.container,
        
    ]}>
      <View style={styles.row}>
      <SearchBar 
          value={inputCity}
          onChangeText={handleInputChange}
          onSearch={handleSearch}
        />
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
          <SafeIcon name="theme-light-dark" size={20} color="#fff" style={styles.icon}/>
        </TouchableOpacity>
      </View>
      {/* Handle loading and errors */}
      {loading && <ActivityIndicator size="large" />}
      {error && !isConnected && (
        <Text style={styles.error}>No internet connection. Please check your network.</Text>
      )}
      {error && isConnected && (
        <Text style={styles.error}>Error: {error}. Please try again.</Text>
      )}
      
      {/* Retry button if there's an error and the device is connected */}
      {isConnected && error && (
        <Button title="Retry" onPress={handleRetry} />
      )}

      {/* If there is no internet connection */}
      {!isConnected && (
        <Text style={styles.error}>No internet connection. Please check your network.</Text>
      )}

      {/* Display weather data */}
      {weatherData && !loading && <WeatherCard weatherData={weatherData} />}
      
      
      
    </SafeAreaView>
  );
};




export default HomeScreen;



