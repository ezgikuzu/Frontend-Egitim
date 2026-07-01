import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customersReducer from './slices/customersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    ui: uiReducer
  }
});

export default store;
