import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Protected route check
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="d-flex w-100 min-vh-100 bg-body">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      {/* Main Layout Area */}
      <div className="d-flex flex-column flex-grow-1 min-vh-100" style={{ overflowX: "hidden" }}>
        {/* Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isSidebarCollapsed={isSidebarCollapsed} 
        />
        
        {/* Page Content */}
        <main className="flex-grow-1 p-4" style={{ backgroundColor: "var(--bs-light-bg-subtle)" }}>
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
