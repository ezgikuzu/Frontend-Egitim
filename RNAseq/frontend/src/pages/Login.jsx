import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "../store/authSlice";
import { Dna, Lock, Mail, AlertCircle } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("ezgi@example.com");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear error on load
    dispatch(clearError());
    
    // Redirect if already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body-secondary">
      <div className="card shadow-lg border-0" style={{ width: "420px", borderRadius: "15px" }}>
        <div className="card-body p-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mb-3" style={{ width: "64px", height: "64px" }}>
              <Dna size={36} />
            </div>
            <h3 className="fw-bold">RNA-seq Tool</h3>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>Analiz ve Yönetim Paneline Giriş Yapın</p>
          </div>

          {/* Alert */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <AlertCircle size={18} className="me-2" />
              <div style={{ fontSize: "0.85rem" }}>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.85rem" }}>E-posta Adresi</label>
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0">
                  <Mail size={16} className="text-muted" />
                </span>
                <input
                  type="email"
                  className="form-control border-start-0 ps-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label fw-semibold mb-0" style={{ fontSize: "0.85rem" }}>Şifre</label>
                <a href="#" className="text-decoration-none text-primary" style={{ fontSize: "0.75rem" }}>Şifremi Unuttum</a>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0">
                  <Lock size={16} className="text-muted" />
                </span>
                <input
                  type="password"
                  className="form-control border-start-0 ps-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={loading}
              style={{ borderRadius: "8px" }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              Giriş Yap
            </button>
          </form>

          {/* Footer Info */}
          <div className="text-center mt-4">
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>Test Hesabı: ezgi@example.com / 123456</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
