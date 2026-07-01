import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

const initialState = {
  steps: [],
  qualityControls: [],
  loading: false,
  error: null,
};

export const fetchAnalysisSteps = createAsyncThunk(
  "analysis/fetchAnalysisSteps",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/analysisSteps?projectId=${projectId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Analiz adımları yüklenemedi.");
    }
  }
);

export const fetchQualityControls = createAsyncThunk(
  "analysis/fetchQualityControls",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/qualityControls?projectId=${projectId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Kalite kontrol verileri yüklenemedi.");
    }
  }
);

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Analysis Steps
      .addCase(fetchAnalysisSteps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalysisSteps.fulfilled, (state, action) => {
        state.loading = false;
        state.steps = action.payload;
      })
      .addCase(fetchAnalysisSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Quality Controls
      .addCase(fetchQualityControls.fulfilled, (state, action) => {
        state.qualityControls = action.payload;
      });
  },
});

export default analysisSlice.reducer;
