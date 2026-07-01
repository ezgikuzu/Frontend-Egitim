import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Dna, 
  PlayCircle, 
  BarChart3, 
  FileText, 
  User, 
  Settings as SettingsIcon,
  LogOut
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { name: "Kontrol Paneli", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projeler", path: "/projects", icon: FolderGit2 },
    { name: "Örnekler", path: "/samples", icon: Dna },
    { name: "Analiz Takip", path: "/analysis", icon: PlayCircle },
    { name: "Sonuçlar", path: "/results", icon: BarChart3 },
    { name: "Raporlar", path: "/reports", icon: FileText },
    { name: "Profil", path: "/profile", icon: User },
    { name: "Ayarlar", path: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div 
      className={`sidebar d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end`}
      style={{ 
        width: isCollapsed ? "80px" : "260px", 
        height: "100vh", 
        transition: "width 0.3s ease",
        position: "sticky",
        top: 0
      }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <Dna className="text-primary me-2" size={32} />
        {!isCollapsed && <span className="fs-4 fw-bold text-primary">RNA-seq Tool</span>}
      </div>
      <hr />
      
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <li key={item.path} className="nav-item mb-1">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center ${isActive ? "active" : "link-body-emphasis"}`}
                style={{ 
                  padding: isCollapsed ? "10px" : "10px 15px",
                  justifyContent: isCollapsed ? "center" : "flex-start" 
                }}
              >
                <Icon size={20} className={isCollapsed ? "" : "me-3"} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
      
      <hr />
      <div>
        <button
          onClick={handleLogout}
          className="btn btn-link nav-link d-flex align-items-center link-danger w-100 text-start"
          style={{ 
            padding: isCollapsed ? "10px" : "10px 15px",
            justifyContent: isCollapsed ? "center" : "flex-start",
            textDecoration: "none"
          }}
        >
          <LogOut size={20} className={isCollapsed ? "" : "me-3"} />
          {!isCollapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
