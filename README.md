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




## Project Structure
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


## 🏗️ Project Architecture

The app follows a **feature-based modular architecture** for maintainability and scalability.

WeatherApp/ 
├── components/ # Reusable UI components (e.g., WeatherCard) 
├── contexts/ # React Context for state management 
├── hooks/ # Custom hooks (e.g., useWeather) 
├── screens/  # App screens (e.g., HomeScreen) 
├── services/  # API calls and external services 
├── storage/ # Local storage functions (AsyncStorage) 
├── tests/ # Unit tests 
└── App.tsx # Entry point



---

## 🧠 State Management

State is handled using **React Context API** for simplicity and centralized control.

- `WeatherContext` manages:
  - Current city
  - Weather data
  - Loading and error states
  - Search functionality
  - Saving and restoring last searched city using `AsyncStorage`

---

## 🌐 API Integration

- Uses the **OpenWeatherMap API**
- Endpoint:
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=en

- Fetches:
- City name , Country 
- Temperature (in °C)
- Weather condition


---

## 💡 Key Components

| Component       | Responsibility                                   |
|----------------|---------------------------------------------------|
| `WeatherCard`   | UI card to display weather info                  |
| `HomeScreen`    | Contains input, button, and displays the card    |
| `weatherService.ts` | Handles API calls to OpenWeatherMap         |
| `WeatherContext`| Manages global state and search logic            |
| `storage.ts`    | Saves/loads last searched city via AsyncStorage  |
| `ThemeContext`  | (Optional) Handles light/dark mode toggle        |

---

## 🧪 Testing

- Uses **Jest** and **React Native Testing Library**
- Example test: `WeatherCard` renders correct city and temperature

---

---

## 📦 Installation & Running

-- Clone the repository:

git clone https://github.com/NithinMD/WeatherApp.git
cd WeatherApp

## Install dependencies:

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

