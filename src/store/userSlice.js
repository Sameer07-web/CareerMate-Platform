import { createSlice } from '@reduxjs/toolkit';

// Temporarily porting mock data from mockData.js until backend is ready
const initialState = {
  profile: {
    name: 'Alex Johnson',
    role: 'Full Stack Engineer',
    level: 5,
    xp: 2450,
    xpNeeded: 3000,
    skills: ['React Native', 'Node.js', 'MongoDB', 'Python'],
    streak: 12,
  },
  analytics: {
    applicationsSent: 45,
    interviewsScheduled: 8,
    offersReceived: 2,
    rejections: 12,
    avgAtsScore: 82,
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateAnalytics: (state, action) => {
      state.analytics = { ...state.analytics, ...action.payload };
    },
  },
});

export const { setProfile, updateAnalytics } = userSlice.actions;
export default userSlice.reducer;
