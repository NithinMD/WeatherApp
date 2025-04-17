import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherData } from '../types/weatherTypes';
import { createStyles as createStyles } from '../styles/weatherCardStyles';
import { useTheme } from '../contexts/ThemeContext';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { name, main, weather, sys } = weatherData;
  const { theme } = useTheme(); // 👈 use theme from context
  const styles = createStyles(theme); // 👈 create styles based on theme

  const getWeatherIcon = () => {
    const iconMap: Record<string, string> = {
      'clear': 'weather-sunny',
      'clouds': 'weather-cloudy',
      'rain': 'weather-rainy',
      'snow': 'weather-snowy',
      'thunderstorm': 'weather-lightning',
      'drizzle': 'weather-pouring',
      'mist': 'weather-fog',
      'smoke': 'weather-fog',
      'haze': 'weather-fog',
      'dust': 'weather-fog',
      'fog': 'weather-fog',
      'sand': 'weather-fog',
      'ash': 'weather-fog',
      'squall': 'weather-windy',
      'tornado': 'weather-tornado',
    };
    
    return iconMap[weather[0].main.toLowerCase()] || 'weather-partly-cloudy';
  };

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{name}, {sys.country}</Text>
      
      <View style={styles.mainInfo}>
        <Icon name={getWeatherIcon()} size={60} style={styles.icon} testID="weather-icon" />
        <Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
      </View>
      
      <Text style={styles.condition}>{weather[0].description}</Text>
      
      
    </View>
  );
};

export default WeatherCard;