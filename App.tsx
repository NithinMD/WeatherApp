import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';
import { WeatherProvider } from './src/contexts/WeatherContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Preload the icon font (iOS-specific fix)
    Icon.loadFont();
  }, []);

  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <WeatherProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WeatherProvider>
    </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;