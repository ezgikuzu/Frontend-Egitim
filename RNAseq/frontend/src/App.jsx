import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from "./store/settingsSlice";

// Layout & Pages
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Samples from "./pages/Samples";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export const App = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

  // Load settings on app start
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Synchronize HTML element attribute with Redux theme state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard & App Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="samples" element={<Samples />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="results" element={<Results />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Fallback Wildcard redirect */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
