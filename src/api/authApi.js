import api from './axios';

export const authApi = {
  login: async (credentials) => {
    // return api.post('/auth/login', credentials);
    
    // Mock implementation for Phase 1
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { token: 'mock-jwt-token', user: { id: 1, name: 'Alex Johnson' } } });
      }, 1000);
    });
  },

  register: async (userData) => {
    // return api.post('/auth/register', userData);
    
    // Mock implementation for Phase 1
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { token: 'mock-jwt-token', user: userData } });
      }, 1000);
    });
  },

  logout: async () => {
    // Handle server-side logout if necessary
    return Promise.resolve();
  }
};
