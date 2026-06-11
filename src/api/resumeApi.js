import api from './axios';

export const resumeApi = {
  uploadResume: async (formData) => {
    return api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getResumes: async () => {
    return api.get('/resumes');
  },

  getVersions: async (resumeId) => {
    return api.get(`/resumes/${resumeId}/versions`);
  },

  getVersionDetails: async (versionId) => {
    return api.get(`/resumes/versions/${versionId}`);
  },

  deleteVersion: async (versionId) => {
    return api.delete(`/resumes/versions/${versionId}`);
  },

  setPrimary: async (versionId) => {
    return api.put(`/resumes/versions/${versionId}/primary`);
  },

  reanalyze: async (versionId) => {
    return api.post(`/resumes/versions/${versionId}/reanalyze`);
  }
};
