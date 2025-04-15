import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherData } from '../types/weatherTypes';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { name, main, weather, sys } = weatherData;
  
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '100%',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  icon: {
    marginRight: 15,
  },
  temp: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  details: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default WeatherCard;