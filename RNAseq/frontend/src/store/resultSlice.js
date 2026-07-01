import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

const initialState = {
  expressionResults: [],
  pcaData: [],
  reports: [],
  loading: false,
  error: null,
};

export const fetchExpressionResults = createAsyncThunk(
  "results/fetchExpressionResults",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/expressionResults?projectId=${projectId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Ekspresyon sonuçları yüklenemedi.");
    }
  }
);

export const fetchPcaData = createAsyncThunk(
  "results/fetchPcaData",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/expressionResults/pca?projectId=${projectId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "PCA koordinatları yüklenemedi.");
    }
  }
);

export const fetchReports = createAsyncThunk(
  "results/fetchReports",
  async (projectId, { rejectWithValue }) => {
    try {
      const url = projectId ? `${API_URL}/reports?projectId=${projectId}` : `${API_URL}/reports`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Raporlar yüklenemedi.");
    }
  }
);

const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Expression Results
      .addCase(fetchExpressionResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpressionResults.fulfilled, (state, action) => {
        state.loading = false;
        state.expressionResults = action.payload;
      })
      .addCase(fetchExpressionResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch PCA Data
      .addCase(fetchPcaData.fulfilled, (state, action) => {
        state.pcaData = action.payload;
      })
      // Fetch Reports
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      });
  },
});

export default resultSlice.reducer;
