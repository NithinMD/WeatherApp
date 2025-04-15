// src/screens/__tests__/HomeScreen.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { useWeather } from '../src/contexts/WeatherContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock the context and other hooks
jest.mock('../src/contexts/WeatherContext');
jest.mock('react-native-safe-area-context');

const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;
const mockUseSafeAreaInsets = useSafeAreaInsets as jest.MockedFunction<typeof useSafeAreaInsets>;

describe('HomeScreen', () => {
  const mockWeatherData = {
    city: 'London',
    temperature: 15,
    condition: 'Cloudy',
    humidity: 75,
    windSpeed: 10,
    icon: 'cloudy'
  };

  beforeEach(() => {
    // Default mock implementations
    mockUseWeather.mockReturnValue({
      weatherData: null,
      loading: false,
      error: null,
      lastSearchedCity: null,
      searchCity: jest.fn(),
      loadLastWeather: jest.fn()
    });

    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default state', () => {
    render(<HomeScreen />);
    
    expect(screen.getByTestId('search-bar')).toBeTruthy();
    expect(screen.queryByTestId('weather-card')).toBeNull();
    expect(screen.queryByTestId('activity-indicator')).toBeNull();
    expect(screen.queryByTestId('error-message')).toBeNull();
  });

  it('displays loading indicator when loading', () => {
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      loading: true
    });

    render(<HomeScreen />);
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'City not found';
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      error: errorMessage
    });

    render(<HomeScreen />);
    expect(screen.getByText(errorMessage)).toBeTruthy();
    expect(screen.getByText(errorMessage)).toHaveStyle({ color: 'red' });
  });

  it('displays weather card when weather data is available', () => {
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      weatherData: mockWeatherData
    });

    render(<HomeScreen />);
    expect(screen.getByTestId('weather-card')).toBeTruthy();
  });

  it('calls searchCity when search is performed with valid input', () => {
    const mockSearchCity = jest.fn();
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      searchCity: mockSearchCity
    });

    render(<HomeScreen />);
    
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.changeText(searchInput, 'Paris');
    fireEvent.press(searchButton);

    expect(mockSearchCity).toHaveBeenCalledWith('Paris');
  });

  it('does not call searchCity when search input is empty', () => {
    const mockSearchCity = jest.fn();
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      searchCity: mockSearchCity
    });

    render(<HomeScreen />);
    
    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    expect(mockSearchCity).not.toHaveBeenCalled();
  });

  it('calls loadLastWeather when lastSearchedCity is available on mount', () => {
    const mockLoadLastWeather = jest.fn();
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      lastSearchedCity: 'London',
      loadLastWeather: mockLoadLastWeather
    });

    render(<HomeScreen />);
    
    expect(mockLoadLastWeather).toHaveBeenCalled();
  });

  it('does not call loadLastWeather when lastSearchedCity is not available', () => {
    const mockLoadLastWeather = jest.fn();
    mockUseWeather.mockReturnValue({
      ...mockUseWeather(),
      lastSearchedCity: null,
      loadLastWeather: mockLoadLastWeather
    });

    render(<HomeScreen />);
    
    expect(mockLoadLastWeather).not.toHaveBeenCalled();
  });

  it('applies safe area insets to container', () => {
    const testInsets = { top: 20, right: 0, bottom: 0, left: 0 };
    mockUseSafeAreaInsets.mockReturnValue(testInsets);

    render(<HomeScreen />);
    
    const container = screen.getByTestId('home-container');
    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        paddingTop: expect.any(Number) // Could be more specific if you know the exact style
      })
    );
  });
});