import api from './axios';

export const aiApi = {
  startSession: async (data) => {
    return api.post('/ai/sessions', data);
  },
  
  getSessions: async () => {
    return api.get('/ai/sessions');
  },
  
  getMessages: async (sessionId) => {
    return api.get(`/ai/sessions/${sessionId}/messages`);
  },
  
  sendMessage: async (sessionId, content) => {
    return api.post(`/ai/sessions/${sessionId}/messages`, { content });
  }
};
