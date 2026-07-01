import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  sidebarOpen: true,
  notifications: []
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification(state, action) {
      state.notifications.push({
        id: Date.now().toString(),
        message: action.payload.message,
        type: action.payload.type || 'info', // 'success' | 'warning' | 'error' | 'info'
        redirectTo: action.payload.redirectTo || null,
        actionState: action.payload.actionState || null,
        read: false
      });
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    markAllNotificationsAsRead(state) {
      state.notifications = state.notifications.map(n => ({ ...n, read: true }));
    }
  }
});

export const {
  toggleDarkMode,
  toggleSidebar,
  addNotification,
  setNotifications,
  clearNotifications,
  markAllNotificationsAsRead
} = uiSlice.actions;

export default uiSlice.reducer;
