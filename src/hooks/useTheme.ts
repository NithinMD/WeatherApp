// src/hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  colors: {
    primary: string;
    background: string;
    text: string;
    card: string;
    border: string;
  };
}

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;