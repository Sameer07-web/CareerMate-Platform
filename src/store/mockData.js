export const MOCK_USER = {
  id: 'usr_123',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  college: 'SNIST',
  degree: 'B.Tech',
  branch: 'Computer Science',
  graduationYear: '2025',
  targetRole: 'Full Stack Developer',
  careerGoal: 'Targeting Full Stack Developer roles focused on scalable web applications, backend systems, and cloud technologies.',
  skills: ['Java', 'Spring Boot', 'React', 'React Native', 'Node.js', 'MongoDB', 'Kafka', 'MySQL', 'Git', 'REST APIs'],
  level: 12,
  xp: 1450,
  xpNeeded: 150,
};

export const MOCK_ANALYTICS = {
  placementReadiness: 78,
  resumeScore: 82,
  atsScore: 75,
  interviewScore: 68,
  dsaProgress: 85,
  profileCompletion: 90,
  weeklyProgress: [65, 72, 78, 85], // 4-week trend
  trends: {
    ats: 'up', // 'up', 'down', 'stable'
    resume: 'up',
    interview: 'stable',
  },
  careerInsights: [
    'ATS Score improved by 8%',
    'Resume stronger than last week',
    'Interview readiness increased by 5%'
  ],
  nextBestActions: [
    { title: 'Improve Resume Summary', xpGained: 3 },
    { title: 'Practice Interview Questions', xpGained: 2 }
  ],
  achievements: [
    { id: 1, title: 'Resume Uploaded', icon: 'document-text', earned: true },
    { id: 2, title: 'ATS Score Above 80', icon: 'analytics', earned: true },
    { id: 3, title: 'First Mock Interview Completed', icon: 'videocam', earned: true },
    { id: 4, title: 'Applied To 10 Jobs', icon: 'briefcase', earned: true },
    { id: 5, title: '5-Day Interview Streak', icon: 'flame', earned: false }
  ]
};

export const MOCK_APPLICATIONS = [
  { id: '1', company: 'Google', status: 'Applied', date: '2025-05-10', role: 'Software Engineer' },
  { id: '2', company: 'Amazon', status: 'Interview Scheduled', date: '2025-05-08', role: 'SDE-1' },
  { id: '3', company: 'Microsoft', status: 'Rejected', date: '2025-05-01', role: 'Frontend Developer' },
  { id: '4', company: 'Netflix', status: 'Applied', date: '2025-05-12', role: 'Backend Engineer' },
  { id: '5', company: 'Meta', status: 'Offer', date: '2025-04-20', role: 'Full Stack Developer' },
];

export const MOCK_RESUME_HISTORY = [
  { version: 'V3', score: 82, date: '2025-06-01', status: 'Active' },
  { version: 'V2', score: 75, date: '2025-05-15', status: 'Archived' },
  { version: 'V1', score: 68, date: '2025-05-01', status: 'Archived' }
];

export const MOCK_ATS_ANALYSIS = {
  score: 82,
  strengths: ['Strong Technical Skills', 'Good Project Descriptions', 'Clean Formatting'],
  missingKeywords: {
    'Missing Technical Skills': ['Docker', 'AWS'],
    'Missing Frameworks': ['React Native'],
    'Missing DevOps Skills': ['CI/CD']
  },
  suggestions: ['Add quantified achievements', 'Include missing keywords', 'Improve summary section'],
  scoreBreakdown: {
    skills: 85,
    experience: 70,
    education: 90,
    projects: 80
  }
};

export const MOCK_INTERVIEW_DATA = {
  averageScore: 78,
  history: [
    { id: '3', title: 'Session #3', score: 85, date: '2025-06-01' },
    { id: '2', title: 'Session #2', score: 78, date: '2025-05-20' },
    { id: '1', title: 'Session #1', score: 72, date: '2025-05-10' },
  ],
  questions: {
    technical: [
      { topic: 'Java', question: 'Explain how HashMap works internally in Java.' },
      { topic: 'DSA', question: 'How would you detect a cycle in a linked list?' },
      { topic: 'React', question: 'What is the Virtual DOM and how does it work?' }
    ],
    behavioral: [
      'Tell me about a time you faced a significant challenge.',
      'Where do you see yourself in 5 years?',
      'Describe a conflict with a team member and how you resolved it.'
    ]
  }
};
