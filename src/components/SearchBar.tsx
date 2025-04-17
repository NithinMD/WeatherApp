import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { platformStyles } from '../utils/platformUtils';
import SafeIcon from './SafeIcon';
import { searchBarStyles as styles } from '../styles/searchbarStyles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: (text: String) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSearch }) => {
  const handleSearch = () => {
    onSearch(value);  // Pass the value to onSearch when called
  };
  return (
    <View style={[styles.container,platformStyles.searchBarContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Search for a city..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <SafeIcon name="send" size={20} color="#fff" style={styles.icon}/>
        {/* <Text>🔍</Text> */}
      </TouchableOpacity>
    </View>
  );
};


export default SearchBar;