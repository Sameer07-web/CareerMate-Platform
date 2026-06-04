import api from './axios';

export const authApi = {
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
    // If backend had token blacklisting, we'd call it here
    // return api.post('/auth/logout');
    return Promise.resolve();
  }
};
