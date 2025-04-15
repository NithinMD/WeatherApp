// src/components/SafeIcon.tsx
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';

interface SafeIconProps {
  name: string; // Explicitly type the name prop
  size: number;
  color: string;
  style?: object;
}

const SafeIcon: React.FC<SafeIconProps> = ({ name, ...props }) => {
    const iosIconMap: Record<string, string> = {
        'magnify': 'search',  // The working alternative
        // Add other problematic icons here
      };
    
      const resolvedName = Platform.OS === 'ios' 
        ? iosIconMap[name] || name 
        : name;
    
      return <Icon name={resolvedName} {...props} />;
};

export default SafeIcon;