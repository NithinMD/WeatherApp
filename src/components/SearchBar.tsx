import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { platformStyles } from '../utils/platformUtils';
import SafeIcon from './SafeIcon';


interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSearch }) => {
  return (
    <View style={[styles.container,platformStyles.searchBarContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Search for a city..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity onPress={onSearch} style={styles.button}>
        <SafeIcon name="send" size={20} color="#fff" style={styles.icon}/>
        {/* <Text>🔍</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    textAlign: 'center',
  },
});

export default SearchBar;