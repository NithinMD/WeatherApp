// // src/contexts/ThemeContext.tsx
// import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
// import { storeData, getData } from '../services/storageService';

// interface ThemeContextType {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
//   colors: {
//     primary: string;
//     background: string;
//     text: string;
//     card: string;
//     border: string;
//   };
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const loadThemePreference = async () => {
//       const savedMode = await getData('darkMode');
//       if (savedMode !== null) {
//         setDarkMode(savedMode);
//       }
//     };
//     loadThemePreference();
//   }, []);

//   const toggleDarkMode = async () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     await storeData('darkMode', newMode);
//   };

//   const colors = useMemo(() => {
//     return darkMode
//       ? {
//           primary: '#1e90ff',
//           background: '#121212',
//           text: '#ffffff',
//           card: '#1e1e1e',
//           border: '#333333',
//         }
//       : {
//           primary: '#1e90ff',
//           background: '#f5f5f5',
//           text: '#000000',
//           card: '#ffffff',
//           border: '#dddddd',
//         };
//   }, [darkMode]);

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode, colors }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export { ThemeContext };


// src/context/ThemeContext.tsx

// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
