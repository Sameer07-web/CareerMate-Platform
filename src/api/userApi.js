import api from './axios';

export const userApi = {
  getProfile: async () => {
    // return api.get('/users/profile');
    
    // Mock implementation for Phase 1
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          data: { 
            name: 'Alex Johnson',
            role: 'Full Stack Engineer',
            level: 5,
            xp: 2450,
            xpNeeded: 3000,
            skills: ['React Native', 'Node.js', 'MongoDB', 'Python'],
            streak: 12,
          } 
        });
      }, 1000);
    });
  },

  updateProfile: async (data) => {
    // return api.put('/users/profile', data);
    return new Promise((resolve) => resolve({ data }));
  }
};
