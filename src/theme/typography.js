import { Platform } from 'react-native';

// React Native uses system fonts by default. 
// We will use standard fonts for cross-platform support.
const fontFamilies = {
  regular: Platform.select({ ios: 'System', android: 'sans-serif' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  bold: Platform.select({ ios: 'System', android: 'sans-serif-condensed' }),
};

export const TYPOGRAPHY = {
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: 32,
    fontWeight: '700',
  },
  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    fontWeight: '600',
  },
  h3: {
    fontFamily: fontFamilies.medium,
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    fontWeight: '400',
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    fontWeight: '400',
  },
  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    fontWeight: '600',
  }
};
