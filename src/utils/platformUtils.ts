// src/utils/platformUtils.ts
import { Platform, StyleSheet } from 'react-native';

export const platformStyles = StyleSheet.create({
  searchBarContainer: {
    marginTop: Platform.select({
      ios: 44,
      android: 0
    }),
    marginBottom: Platform.select({
      ios: 15,
      android: 10
    })
  }
});
