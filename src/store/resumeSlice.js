import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resumeApi } from '../api/resumeApi';

export const fetchResumes = createAsyncThunk(
  'resume/fetchResumes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await resumeApi.getResumes();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch resume');
    }
  }
);

export const fetchVersions = createAsyncThunk(
  'resume/fetchVersions',
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await resumeApi.getVersions(resumeId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch versions');
    }
  }
);

export const uploadResume = createAsyncThunk(
  'resume/upload',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await resumeApi.uploadResume(formData);
      // After successful upload, refresh resumes and versions
      await dispatch(fetchResumes());
      if (response.data?.data?.resumeId) {
        await dispatch(fetchVersions(response.data.data.resumeId));
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload resume');
    }
  }
);

export const setPrimaryResumeVersion = createAsyncThunk(
  'resume/setPrimary',
  async (versionId, { dispatch, rejectWithValue }) => {
    try {
      const response = await resumeApi.setPrimary(versionId);
      await dispatch(fetchResumes());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to set primary version');
    }
  }
);

export const deleteResumeVersion = createAsyncThunk(
  'resume/delete',
  async ({ versionId, resumeId }, { dispatch, rejectWithValue }) => {
    try {
      await resumeApi.deleteVersion(versionId);
      await dispatch(fetchVersions(resumeId));
      await dispatch(fetchResumes());
      return versionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete version');
    }
  }
);

export const reanalyzeResume = createAsyncThunk(
  'resume/reanalyze',
  async ({ versionId, resumeId }, { dispatch, rejectWithValue }) => {
    try {
      await resumeApi.reanalyze(versionId);
      await dispatch(fetchVersions(resumeId));
      return versionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to trigger reanalysis');
    }
  }
);

export const fetchVersionDetails = createAsyncThunk(
  'resume/fetchVersionDetails',
  async (versionId, { rejectWithValue }) => {
    try {
      const response = await resumeApi.getVersionDetails(versionId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch version details');
    }
  }
);


const initialState = {
  currentResume: null,
  versions: [],
  selectedVersion: null,
  analysis: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setSelectedVersion: (state, action) => {
      state.selectedVersion = action.payload;
      state.analysis = action.payload?.analysis || null;
    },
    clearResumeError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Resumes
    builder.addCase(fetchResumes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchResumes.fulfilled, (state, action) => {
      state.loading = false;
      state.currentResume = action.payload;
    });
    builder.addCase(fetchResumes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Versions
    builder.addCase(fetchVersions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVersions.fulfilled, (state, action) => {
      state.loading = false;
      state.versions = action.payload;
    });
    builder.addCase(fetchVersions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Upload
    builder.addCase(uploadResume.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadResume.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadResume.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteResumeVersion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteResumeVersion.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteResumeVersion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Version Details
    builder.addCase(fetchVersionDetails.fulfilled, (state, action) => {
      state.selectedVersion = action.payload;
      state.analysis = action.payload.analysis;
    });
  }
});

export const { setSelectedVersion, clearResumeError } = resumeSlice.actions;
export default resumeSlice.reducer;
