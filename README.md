# WeatherApp 🌦️

A React Native weather application with real-time weather data, search functionality, and theme switching.

## Features

- Current weather display (temperature, conditions, humidity, wind speed)
- City search functionality
- Dark/light theme toggle
- Persistent last searched city
- Responsive design with safe area support
- Comprehensive unit testing

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment setup
  - Android Studio (for Android)
  - Xcode (for iOS)

## Installation

1. Clone the repository:

git clone https://github.com/NithinMD/WeatherApp.git
cd WeatherApp


Install dependencies:

npm install
# or
yarn install

## incase if dependecies fail, run this 

npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context  
npm install axios  
npm install @react-native-async-storage/async-storage  
npm install react-native-vector-icons  
npm install --save-dev @testing-library/react-native @testing-library/jest-native  

## Running the App

Android  
npx react-native run-android

iOS    
cd ios && pod install && cd ..  
npx react-native run-ios  

Project Structure
/src
  /components        # Reusable UI components
  /contexts          # Application contexts
  /hooks             # Custom hooks
  /services          # API and storage services
  /screens           # App screens
  /types             # TypeScript type definitions
  /utils             # Utility functions and constants
/__tests__           # Test files

## Testing
To run tests:  
npm test
# or
yarn test
