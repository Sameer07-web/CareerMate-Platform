import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { storage } from '../utils/storage';
import { setProfile } from './userSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      const { token, data: user } = response.data;
      await storage.setToken(token);
      dispatch(setProfile(user));
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      const { token, data: user } = response.data;
      await storage.setToken(token);
      dispatch(setProfile(user));
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = await storage.getToken();
      if (!token) return rejectWithValue('No token');
      
      const response = await authApi.getProfile();
      dispatch(setProfile(response.data.data));
      return { token };
    } catch (error) {
      await storage.removeToken();
      return rejectWithValue('Session expired');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await storage.removeToken();
    dispatch(setProfile(null));
    await authApi.logout();
    return null;
  }
);

const initialState = {
  token: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Fetch Profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.isAuthenticated = false;
      state.token = null;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
