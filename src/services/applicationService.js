import { MOCK_APPLICATIONS } from '../store/mockData';

export const applicationService = {
  getApplications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_APPLICATIONS), 800);
    });
  }
};
