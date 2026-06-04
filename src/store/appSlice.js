import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark', // 'dark' or 'light'
  isGlobalLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const { toggleTheme, setGlobalLoading } = appSlice.actions;
export default appSlice.reducer;
