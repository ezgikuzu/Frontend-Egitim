import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

const initialState = {
  darkMode: false,
  notificationsEnabled: true,
  defaultPValue: 0.05,
  defaultLog2FoldChange: 1.0,
  loading: false,
  error: null,
};

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/settings`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Ayarlar yüklenemedi.");
    }
  }
);

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (settingsData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/settings`, settingsData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Ayarlar güncellenemedi.");
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleLocalDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.darkMode = action.payload.darkMode;
        state.notificationsEnabled = action.payload.notificationsEnabled;
        state.defaultPValue = action.payload.defaultPValue;
        state.defaultLog2FoldChange = action.payload.defaultLog2FoldChange;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.darkMode = action.payload.darkMode;
        state.notificationsEnabled = action.payload.notificationsEnabled;
        state.defaultPValue = action.payload.defaultPValue;
        state.defaultLog2FoldChange = action.payload.defaultLog2FoldChange;
      });
  },
});

export const { toggleLocalDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
