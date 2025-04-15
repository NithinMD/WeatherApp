import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../src/components/WeatherCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherData } from '../src/types/weatherTypes';
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

const mockWeatherData = {
  name: 'London',
  sys: { country: 'UK' },
  main: { temp: 15,feels_like: 14,
    temp_min: 10,
    temp_max: 20,
    pressure: 12,
    humidity: 50, },
  weather: [{ main: 'Clouds', description: 'Cloudy', icon: '04d' }],
  wind: { speed: 20, deg: 12},
  
};

describe('WeatherCard Component', () => {
  it('renders correctly with weather data', () => {
    const { getByText } = render(<WeatherCard weatherData={mockWeatherData} />);
    
    expect(getByText('London, UK')).toBeTruthy();
    expect(getByText('15°C')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
   
  });

  it('shows default icon for unknown weather', () => {
    const unknownWeather = {
      ...mockWeatherData,
      weather: [{ 
        id: 999,
        main: 'Unknown', 
        description: 'unknown',
        icon: 'unknown'
      }]
    };
    
    const { getByTestId } = render(
      <WeatherCard weatherData={unknownWeather as WeatherData} />
    );
    
    // Verify the Icon component is rendered with the fallback name
    const icon = getByTestId('weather-icon');
    expect(icon.props.name).toBe('weather-partly-cloudy'); // Or your default icon name
  });
});