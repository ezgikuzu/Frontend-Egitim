import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // json-server doesn't support authenticating directly unless we use an auth middleware,
      // so we fetch the users list and find matching email/password to mock auth.
      const response = await axios.get(`${API_URL}/users`);
      const users = response.data;
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const token = 'mock-jwt-token-xyz-12345';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
        return { user: { id: user.id, name: user.name, email: user.email }, token };
      } else {
        return rejectWithValue('E-posta veya şifre hatalı.');
      }
    } catch (error) {
      return rejectWithValue('Giriş yapılırken sunucu hatası oluştu.');
    }
  }
);

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        return { user: JSON.parse(userData), token };
      }
      return rejectWithValue('Oturum bulunamadı.');
    } catch (error) {
      return rejectWithValue('Oturum bilgileri yüklenemedi.');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return null;
});

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch Auth
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.error = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
