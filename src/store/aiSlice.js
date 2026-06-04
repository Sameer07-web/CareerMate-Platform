import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aiApi } from '../api/aiApi';

export const fetchSessions = createAsyncThunk(
  'ai/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aiApi.getSessions();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sessions');
    }
  }
);

export const startNewSession = createAsyncThunk(
  'ai/startSession',
  async (sessionData, { rejectWithValue }) => {
    try {
      const response = await aiApi.startSession(sessionData);
      return response.data.data; // the new session
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to start session');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'ai/fetchMessages',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await aiApi.getMessages(sessionId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'ai/sendMessage',
  async ({ sessionId, content }, { rejectWithValue }) => {
    try {
      const response = await aiApi.sendMessage(sessionId, content);
      return response.data.data; // { userMessage, aiMessage }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

const initialState = {
  sessions: [],
  currentSessionId: null,
  messages: [],
  sessionsStatus: 'idle',
  messagesStatus: 'idle',
  isSending: false,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setCurrentSessionId: (state, action) => {
      state.currentSessionId = action.payload;
      state.messages = []; // Clear messages when switching sessions
    },
    optimisticAddMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSessions.pending, (state) => {
      state.sessionsStatus = 'loading';
    });
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.sessionsStatus = 'succeeded';
      state.sessions = action.payload;
    });
    builder.addCase(fetchSessions.rejected, (state, action) => {
      state.sessionsStatus = 'failed';
      state.error = action.payload;
    });

    builder.addCase(startNewSession.fulfilled, (state, action) => {
      state.sessions.unshift(action.payload);
      state.currentSessionId = action.payload._id;
      state.messages = [];
    });

    builder.addCase(fetchMessages.pending, (state) => {
      state.messagesStatus = 'loading';
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messagesStatus = 'succeeded';
      state.messages = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.messagesStatus = 'failed';
      state.error = action.payload;
    });

    builder.addCase(sendMessage.pending, (state) => {
      state.isSending = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isSending = false;
      // Replace the optimistic message with the real ones if needed, 
      // but simpler to just filter out the temp one or push the AI response.
      // Since we already optimistically added the user message in the component, we just add the AI message.
      state.messages.push(action.payload.aiMessage);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isSending = false;
      state.error = action.payload;
    });
  }
});

export const { setCurrentSessionId, optimisticAddMessage } = aiSlice.actions;
export default aiSlice.reducer;
