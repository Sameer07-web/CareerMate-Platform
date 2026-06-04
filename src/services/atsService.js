import { MOCK_ATS_ANALYSIS } from '../store/mockData';

export const atsService = {
  getATSAnalysis: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ATS_ANALYSIS), 1500);
    });
  }
};
