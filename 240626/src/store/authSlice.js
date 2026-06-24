import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
  activeTab: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = {
        name: "Selahaddin Ç.",
        role: action.payload, // 'Admimn','Muhasebe','Teknik'
      };
      state.activeTab = "dashboard";
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.activeTab = "login";
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});
export const {login,logout,setActiveTab}=authSlice.actions
export default authSlice.reducer