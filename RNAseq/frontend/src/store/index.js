import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import sampleReducer from "./sampleSlice";
import analysisReducer from "./analysisSlice";
import resultReducer from "./resultSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    samples: sampleReducer,
    analysis: analysisReducer,
    results: resultReducer,
    settings: settingsReducer,
  },
});

export default store;
