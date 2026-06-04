import { MOCK_INTERVIEW_DATA } from '../store/mockData';

export const interviewService = {
  getInterviewData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_INTERVIEW_DATA), 800);
    });
  },

  submitMockSession: async (role, difficulty, answers) => {
    // Simulate AI evaluating the entire session
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          overallScore: Math.floor(Math.random() * 15) + 75, // 75 to 90
          detailedScores: {
            communication: 82,
            technical: 78,
            problemSolving: 85,
            confidence: 80
          },
          strengths: ['Clear explanation of core concepts', 'Good problem-solving approach', 'Confident delivery'],
          improvements: ['Include more specific technical terms', 'Expand on architectural trade-offs'],
          recommendedTopics: [
            'Java Collections',
            'Spring Boot Security',
            'REST API Design',
            'React Performance Optimization'
          ]
        });
      }, 2500);
    });
  }
};
