import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Projeler yüklenemedi.");
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Proje detayları yüklenemedi.");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Proje oluşturulamadı.");
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/projects/${projectId}`, projectData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Proje güncellenemedi.");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/projects/${projectId}`);
      return projectId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Proje silinemedi.");
    }
  }
);

export const runProjectAnalysis = createAsyncThunk(
  "projects/runProjectAnalysis",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/projects/${projectId}/run-analysis`);
      return response.data; // { status: "in_progress", message: "..." }
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Analiz başlatılamadı.");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Project By Id
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Project
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      // Update Project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      })
      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
      });
  },
});

export const { clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
