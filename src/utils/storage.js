import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'careermate_jwt_token';

export const storage = {
  getToken: async () => {
    console.log('[STORAGE] getToken called');
    try {
      if (Platform.OS === 'web') return localStorage.getItem(TOKEN_KEY);
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  setToken: async (token) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  removeToken: async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }
};
