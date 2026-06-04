import api from './axios';

export const applicationApi = {
  getApplications: async () => {
    return api.get('/applications');
  },
  getApplication: async (id) => {
    return api.get(`/applications/${id}`);
  },
  createApplication: async (applicationData) => {
    return api.post('/applications', applicationData);
  },
  updateApplication: async (id, applicationData) => {
    return api.put(`/applications/${id}`, applicationData);
  },
  deleteApplication: async (id) => {
    return api.delete(`/applications/${id}`);
  }
};
