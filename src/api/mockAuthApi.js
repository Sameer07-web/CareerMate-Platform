import { MOCK_USER } from '../store/mockData';

export const mockAuthApi = {
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@test.com' && credentials.password === '123456') {
          resolve({
            data: {
              token: 'mock-jwt-token-12345',
              data: MOCK_USER
            }
          });
        } else {
          // Simulate a 401 error structure
          reject({
            response: {
              status: 401,
              data: { message: 'Authentication Error: Invalid credentials. Use test@test.com / 123456' }
            }
          });
        }
      }, 800);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'mock-jwt-token-12345',
            data: { ...MOCK_USER, ...userData }
          }
        });
      }, 800);
    });
  },

  getProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            data: MOCK_USER
          }
        });
      }, 400);
    });
  },

  logout: async () => {
    return Promise.resolve();
  }
};
