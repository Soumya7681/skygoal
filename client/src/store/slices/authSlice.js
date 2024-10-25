import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, logout, getUserDetails } from '../../api/api';

const initialState = {
  token: null,
  type: '',
  status: 'idle',
  error: null,
  user: null, 
};

// Async thunk for login
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  const response = await login(credentials.email, credentials.password);
  return response;
});

// Async thunk for signup
export const signupUser = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  const response = await signup(userData.username, userData.email, userData.password);
  return response;
});

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logout', async (token, thunkAPI) => {
  const response = await logout(token);
  return response;
});

// Async thunk for fetching user details
export const  userDetails = createAsyncThunk('auth/userDetails', async (token, thunkAPI) => {
  const response = await getUserDetails(token);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch User Details
      .addCase(userDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; 
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      });
  },
});

export default authSlice.reducer;
