import { StyleSheet } from 'react-native';


export const createStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    card: {
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
      padding: 20,
      borderRadius: 12,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    temp: {
      fontSize: 32,
      color: theme === 'dark' ? '#FFFFFF' : '#333333',
    },
    condition: {
      fontSize: 18,
      textAlign: 'center',
    marginBottom: 20,
    textTransform: 'capitalize',
      color: theme === 'dark' ? '#AAAAAA' : '#666666',
    },
    city: {
      color: theme === 'dark' ? '#AAAAAA' : '#666666',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    icon: {
      color: theme === 'dark' ? '#AAAAAA' : '#666666',
      marginRight: 15,
    },
    mainInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15,
    },
    details: {
      marginTop: 10,
      fontWeight: 'bold',
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
  });