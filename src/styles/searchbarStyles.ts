import { StyleSheet } from "react-native";

export const searchBarStyles = StyleSheet.create({
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
  