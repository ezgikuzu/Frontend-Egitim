import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, logout } from "../store/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const userRole = user?.role || "Admin";
  const userName = user?.name || "Selahaddin Ç.";

  const canSeeCustomer = userRole === "Admin" || userRole === "Muhasebe";
  const canSeeStock = userRole === "Admin" || userRole === "Teknik";
  const canSeeProducts =
    userRole === "Admin" || userRole === "Teknik" || userRole === "Muhasebe";
  const canSeeReports = userRole === "Admin" || userRole === "Muhasebe";

  const getRoleTitle = (role) => {
    if (role === "Admin") return "Sistem Yöneticisi";
    if (role === "Muhasebe") return "Muhasebe Sorumlusu";
    if (role === "Teknik") return "Teknik Destek Sorumlusu";
    return role;
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="sidebar-container">
      <div>
        <div className="sidebar-logo">
          <svg
            className="logo-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          <span className="logo-text">AuraCRM</span>
        </div>

        <nav className="sidebar-menu">
          <button
            onClick={() => dispatch(setActiveTab("dashboard"))}
            htmlFor="tab-dashboard"
            className="sidebar-link sidebar-link-dashboard"
          >
            <svg
              className="menu-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span>Panel</span>
          </button>

          {canSeeCustomer && (
            <button
              onClick={() => dispatch(setActiveTab("customers"))}
              htmlFor="tab-customers"
              className="sidebar-link sidebar-link-customers"
            >
              <svg
                className="menu-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              <span>Müşteriler</span>
            </button>
          )}

          {canSeeStock && (
            <button
              onClick={() => dispatch(setActiveTab("stock"))}
              htmlFor="tab-stock"
              className="sidebar-link sidebar-link-stock"
            >
              <svg
                className="menu-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              <span>Stok Yönetimi</span>
            </button>
          )}
          {canSeeProducts && (
            <button
              onClick={() => dispatch(setActiveTab("products"))}
              htmlFor="tab-products"
              className="sidebar-link sidebar-link-products"
            >
              <svg
                className="menu-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              <span>Ürünler</span>
            </button>
          )}
          {canSeeReports && (
            <button
              onClick={() => dispatch(setActiveTab("reports"))}
              htmlFor="tab-reports"
              className="sidebar-link sidebar-link-reports"
            >
              <svg
                className="menu-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <span>Raporlama</span>
            </button>
          )}
          <label
            htmlFor="tab-messages"
            className="sidebar-link sidebar-link-messages"
          >
            <svg
              className="menu-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>Mesajlaşma</span>
          </label>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile-bar">
          <div className="user-avatar">
            <span>{getInitials(userName)}</span>
          </div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">{getRoleTitle(userRole)}</span>
          </div>
        </div>
        <button
          onClick={() => dispatch(logout())}
          htmlFor="tab-login"
          className="logout-btn"
        >
          <svg
            className="menu-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
