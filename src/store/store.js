import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import appReducer from './appSlice';
import applicationsReducer from './applicationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    applications: applicationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
