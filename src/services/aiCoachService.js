import { MOCK_AI_CHAT } from '../store/mockData';

export const aiCoachService = {
  getChatHistory: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_AI_CHAT), 500);
    });
  },
  
  sendMessage: async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          id: Date.now().toString(), 
          sender: 'ai', 
          text: 'This is a mock response from the AI Coach regarding: ' + message 
        });
      }, 1200);
    });
  }
};
