import { StyleSheet } from 'react-native';


 export const createStyles = (theme: 'light' | 'dark') =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
        
        alignItems: 'center',
        padding: 20,
      },
      text: {
        color: theme === 'dark' ? '#fff' : '#000',
        marginBottom: 20,
        fontSize: 18,
      },
      button: {
        width: 50,
        height: 50,
        backgroundColor: '#1e90ff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: -10,
      },
      error: {
        color: 'red',
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        
      },
      icon: {
        textAlign: 'center',
      },
    });