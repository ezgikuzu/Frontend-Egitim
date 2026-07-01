import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

import { fetchAuth } from '../store/slices/authSlice';
import Layout from '../components/Layout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CustomersPage from '../pages/CustomersPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { token, status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!token) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && status === 'idle') {
      dispatch(fetchAuth());
    }
  }, [token, status, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
