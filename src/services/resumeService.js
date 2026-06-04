import { MOCK_RESUME_HISTORY } from '../store/mockData';

export const resumeService = {
  getResumeHistory: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RESUME_HISTORY), 800);
    });
  },

  uploadResume: async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: 'Resume uploaded successfully' }), 1200);
    });
  },
  
  deleteResume: async (version) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: 'Resume deleted' }), 600);
    });
  }
};
