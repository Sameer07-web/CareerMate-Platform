import api from './axios';
import { mockAuthApi } from './mockAuthApi';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK_AUTH === 'true';

const realAuthApi = {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  getProfile: async () => {
    return api.get('/auth/profile');
  },

  logout: async () => {
    return Promise.resolve();
  }
};

export const authApi = USE_MOCK ? mockAuthApi : realAuthApi;
