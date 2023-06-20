import { Dimensions, StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import type { Theme } from '@react-navigation/native/src/types';

export const screenHeight = 1.05 * Dimensions.get('window').height - initialWindowMetrics!.insets.top - initialWindowMetrics!.insets.bottom;

export const screenWidth = Dimensions.get('window').width - initialWindowMetrics!.insets.left - initialWindowMetrics!.insets.right;

export const fontScale = (1.2 * screenHeight) / 844;

export const typography = StyleSheet.create({
  title1: {
    color: '#ffffff',
    fontSize: fontScale * 18,
    fontFamily: 'OpenSans-Bold',
  },
  title2: {
    color: '#ffffff',
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  title3: {
    color: '#ffffff',
    fontSize: fontScale * 12,
    fontFamily: 'OpenSans-SemiBold',
  },
});

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(155,146,77)',
    background: 'rgb(16, 16, 16)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(108, 102, 56)',
    notification: 'rgb(255, 69, 58)',
  },
};
