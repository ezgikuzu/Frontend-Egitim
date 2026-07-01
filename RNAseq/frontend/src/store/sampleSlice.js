import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

const initialState = {
  samples: [],
  loading: false,
  error: null,
};

export const fetchSamples = createAsyncThunk(
  "samples/fetchSamples",
  async (projectId, { rejectWithValue }) => {
    try {
      const url = projectId ? `${API_URL}/samples?projectId=${projectId}` : `${API_URL}/samples`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Örnekler yüklenemedi.");
    }
  }
);

export const createSample = createAsyncThunk(
  "samples/createSample",
  async (sampleData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/samples`, sampleData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Örnek oluşturulamadı.");
    }
  }
);

export const updateSample = createAsyncThunk(
  "samples/updateSample",
  async ({ sampleId, sampleData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/samples/${sampleId}`, sampleData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Örnek güncellenemedi.");
    }
  }
);

export const deleteSample = createAsyncThunk(
  "samples/deleteSample",
  async (sampleId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/samples/${sampleId}`);
      return sampleId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Örnek silinemedi.");
    }
  }
);

const sampleSlice = createSlice({
  name: "samples",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Samples
      .addCase(fetchSamples.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSamples.fulfilled, (state, action) => {
        state.loading = false;
        state.samples = action.payload;
      })
      .addCase(fetchSamples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Sample
      .addCase(createSample.fulfilled, (state, action) => {
        state.samples.push(action.payload);
      })
      // Update Sample
      .addCase(updateSample.fulfilled, (state, action) => {
        const index = state.samples.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.samples[index] = action.payload;
        }
      })
      // Delete Sample
      .addCase(deleteSample.fulfilled, (state, action) => {
        state.samples = state.samples.filter((s) => s.id !== action.payload);
      });
  },
});

export default sampleSlice.reducer;
