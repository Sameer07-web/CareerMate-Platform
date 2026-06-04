export const authService = {
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, token: 'mock-token-123' });
      }, 1000);
    });
  },
  
  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, token: 'mock-token-456' });
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500);
    });
  }
};
