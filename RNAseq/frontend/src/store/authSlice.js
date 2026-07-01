import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

// Fetch user from localStorage if it exists
const savedUser = localStorage.getItem("user");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Giriş işlemi başarısız.");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/users/${userId}`, data);
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Profil güncelleme başarısız.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
