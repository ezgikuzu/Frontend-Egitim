import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customerReducer from "./customerSlice";
import stockReducer from "./stockSlice";
import productReducer from "./productSlice";
import reportReducer from "./reportSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    stock: stockReducer,
    products: productReducer,
    reports: reportReducer,
    messaging: messageReducer,
  },
});
