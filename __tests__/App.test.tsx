// __tests__/App.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { WeatherProvider } from '../src/contexts/WeatherContext';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// Mock the providers and components
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('../src/contexts/WeatherContext');
jest.mock('../src/contexts/ThemeContext');

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders all required providers', () => {
    const { getByTestId } = render(<App />);
    
    expect(SafeAreaProvider).toHaveBeenCalled();
    expect(ThemeProvider).toHaveBeenCalled();
    expect(WeatherProvider).toHaveBeenCalled();
    expect(NavigationContainer).toHaveBeenCalled();
  });

  it('loads icon fonts on mount', () => {
    const loadFontMock = jest.fn();
    jest.spyOn(require('react-native-vector-icons/MaterialCommunityIcons'), 'loadFont')
      .mockImplementation(loadFontMock);
    
    render(<App />);
    expect(loadFontMock).toHaveBeenCalled();
  });

  it('renders the Home screen', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-screen')).toBeTruthy();
  });

  
});