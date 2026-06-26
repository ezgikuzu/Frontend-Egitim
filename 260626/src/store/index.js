import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import customerReducer from './customerSlice'
import stockReducer from './stockSlice'
import productReducer from './productSlice'
import reportsReducer from './reportsSlice'
import messageReducer from './messageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    stock: stockReducer,
    products: productReducer,
    reports: reportsReducer,
    messaging: messageReducer,
  },
})
