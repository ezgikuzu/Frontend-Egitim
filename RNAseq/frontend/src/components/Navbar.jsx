import React, { useState, useRef, useEffect } from "react";
import { Menu, Sun, Moon, Bell, CheckCircle, AlertCircle, Clock, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettings } from "../store/settingsSlice";

// ── Static demo notifications (in a real app these would come from Redux/backend)
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Analiz Tamamlandı",
    message: "ORM TRAIL RNA-seq Analizi başarıyla tamamlandı.",
    time: "2 dk önce",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Örnek Yüklendi",
    message: "FASTQ dosyası başarıyla yüklendi ve QC analizi yapıldı.",
    time: "15 dk önce",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Düşük Kalite Uyarısı",
    message: "Bir örnekte Q30 oranı %80'in altında kaldı.",
    time: "1 saat önce",
    read: true,
  },
];

export const Navbar = ({ toggleSidebar, isSidebarCollapsed }) => {
  const dispatch = useDispatch();
  const { user }     = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.settings);

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const panelRef = useRef(null);
  const bellRef  = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        bellRef.current  && !bellRef.current.contains(e.target)
      ) {
        setShowNotifPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const dismissNotif = (id) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

  const markRead = (id) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const handleThemeToggle = () => {
    dispatch(updateSettings({ darkMode: !darkMode }));
  };

  const notifIcon = (type) => {
    if (type === "success") return <CheckCircle size={16} className="text-success" />;
    if (type === "warning") return <AlertCircle size={16} className="text-warning" />;
    return <Clock size={16} className="text-primary" />;
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom px-4 py-2 sticky-top">
      <div className="container-fluid p-0">
        <button
          onClick={toggleSidebar}
          className="btn btn-outline-secondary me-3 d-flex align-items-center"
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>

        <span className="navbar-brand mb-0 h1 d-none d-md-block fs-5 text-secondary">
          Araştırmacı Paneli
        </span>

        <div className="ms-auto d-flex align-items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
            title={darkMode ? "Açık Tema" : "Koyu Tema"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications Bell + Dropdown Panel */}
          <div className="position-relative">
            <button
              ref={bellRef}
              onClick={() => setShowNotifPanel(v => !v)}
              className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center position-relative"
              style={{ width: "40px", height: "40px" }}
              title="Bildirimler"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light"
                  style={{ fontSize: "0.6rem" }}
                >
                  {unreadCount}
                  <span className="visually-hidden">Okunmamış bildirim</span>
                </span>
              )}
            </button>

            {/* Dropdown Panel */}
            {showNotifPanel && (
              <div
                ref={panelRef}
                className="shadow-lg rounded-3 border bg-body"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  width: "340px",
                  zIndex: 1055,
                  overflow: "hidden",
                }}
              >
                {/* Panel header */}
                <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                  <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
                    Bildirimler
                    {unreadCount > 0 && (
                      <span className="badge bg-danger ms-2" style={{ fontSize: "0.65rem" }}>
                        {unreadCount} yeni
                      </span>
                    )}
                  </span>
                  {unreadCount > 0 && (
                    <button
                      className="btn btn-link btn-sm p-0 text-primary text-decoration-none"
                      style={{ fontSize: "0.78rem" }}
                      onClick={markAllRead}
                    >
                      Tümünü okundu işaretle
                    </button>
                  )}
                </div>

                {/* Notification list */}
                <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                  {notifications.length === 0 ? (
                    <div className="text-center text-muted py-4" style={{ fontSize: "0.85rem" }}>
                      <Bell size={28} className="mb-2 opacity-25" />
                      <p className="mb-0">Bildirim bulunmuyor</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`d-flex gap-2 align-items-start px-3 py-2 border-bottom ${
                          !n.read ? "bg-primary-subtle" : ""
                        }`}
                        style={{ cursor: "pointer", transition: "background 0.2s" }}
                      >
                        <div className="pt-1 flex-shrink-0">{notifIcon(n.type)}</div>
                        <div className="flex-grow-1 min-width-0">
                          <div className="fw-semibold" style={{ fontSize: "0.82rem" }}>
                            {n.title}
                            {!n.read && (
                              <span
                                className="ms-1 bg-primary rounded-circle"
                                style={{ display: "inline-block", width: 6, height: 6 }}
                              />
                            )}
                          </div>
                          <div className="text-muted" style={{ fontSize: "0.76rem" }}>
                            {n.message}
                          </div>
                          <div className="text-muted mt-1" style={{ fontSize: "0.7rem" }}>
                            {n.time}
                          </div>
                        </div>
                        <button
                          className="btn btn-link btn-sm p-0 text-muted flex-shrink-0"
                          onClick={(e) => { e.stopPropagation(); dismissNotif(n.id); }}
                          title="Kaldır"
                          style={{ lineHeight: 1 }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Panel footer */}
                {notifications.length > 0 && (
                  <div className="text-center px-3 py-2 border-top">
                    <button
                      className="btn btn-link btn-sm text-muted text-decoration-none p-0"
                      style={{ fontSize: "0.78rem" }}
                      onClick={() => setNotifications([])}
                    >
                      Tüm bildirimleri temizle
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Info */}
          {user && (
            <div className="d-flex align-items-center border-start ps-3 ms-2">
              <div className="text-end me-2 d-none d-sm-block">
                <div className="fw-semibold lh-1" style={{ fontSize: "0.9rem" }}>{user.name}</div>
                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {user.role === "researcher" ? "Araştırmacı" : user.role}
                </small>
              </div>
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{ width: "40px", height: "40px" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
