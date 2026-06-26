import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  activeTab: 'login',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = {
        name: 'Selahaddin Ç.',
        role: action.payload, // 'Admin', 'Muhasebe', 'Teknik'
      }
      state.activeTab = 'dashboard'
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.activeTab = 'login'
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
  },
})

export const { login, logout, setActiveTab } = authSlice.actions
export default authSlice.reducer
