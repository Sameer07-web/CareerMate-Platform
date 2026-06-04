import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { applicationApi } from '../api/applicationApi';

export const fetchApplications = createAsyncThunk(
  'applications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await applicationApi.getApplications();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

export const createApplication = createAsyncThunk(
  'applications/create',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await applicationApi.createApplication(applicationData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create application');
    }
  }
);

export const updateApplication = createAsyncThunk(
  'applications/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await applicationApi.updateApplication(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update application');
    }
  }
);

export const deleteApplication = createAsyncThunk(
  'applications/delete',
  async (id, { rejectWithValue }) => {
    try {
      await applicationApi.deleteApplication(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete application');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchApplications.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchApplications.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchApplications.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Create
    builder.addCase(createApplication.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });

    // Update
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      const index = state.items.findIndex(app => app._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });

    // Delete
    builder.addCase(deleteApplication.fulfilled, (state, action) => {
      state.items = state.items.filter(app => app._id !== action.payload);
    });
  }
});

export default applicationsSlice.reducer;
