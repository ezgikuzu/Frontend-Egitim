import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

export default function Auth() {
  const dispatch = useDispatch()
  const [selectedRole, setSelectedRole] = useState('Admin')
  const [email, setEmail] = useState('selahaddin@sirket.com')
  const [password, setPassword] = useState('123456')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      dispatch(login(selectedRole))
    }
  }

  return (
    <div className="login-card">
      <div className="auth-header">
        <svg className="auth-logo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <h2 className="auth-title">AuraCRM'e Giriş Yapın</h2>
        <p className="auth-subtitle">Devam etmek için hesabınızı seçin veya giriş yapın</p>
      </div>

      <div className="mb-6">
        <label className="role-label">Kullanıcı Rolü Seçin (Tasarım Önizleme)</label>
        <div className="role-selector-grid">
          <div>
            <input 
              type="radio" 
              id="role-admin" 
              name="user-role-select" 
              checked={selectedRole === 'Admin'} 
              onChange={() => setSelectedRole('Admin')} 
              className="role-input" 
            />
            <label htmlFor="role-admin" className="role-card-label">
              <span className="role-icon">⚡</span>
              <span className="role-title">Admin</span>
            </label>
          </div>

          <div>
            <input 
              type="radio" 
              id="role-accounting" 
              name="user-role-select" 
              checked={selectedRole === 'Muhasebe'} 
              onChange={() => setSelectedRole('Muhasebe')} 
              className="role-input" 
            />
            <label htmlFor="role-accounting" className="role-card-label">
              <span className="role-icon">📊</span>
              <span className="role-title">Muhasebe</span>
            </label>
          </div>

          <div>
            <input 
              type="radio" 
              id="role-technical" 
              name="user-role-select" 
              checked={selectedRole === 'Teknik'} 
              onChange={() => setSelectedRole('Teknik')} 
              className="role-input" 
            />
            <label htmlFor="role-technical" className="role-card-label">
              <span className="role-icon">🔧</span>
              <span className="role-title">Teknik</span>
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">E-posta Adresi</label>
          <input 
            type="email" 
            id="email" 
            className="form-input" 
            placeholder="ornek@sirket.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="pass" className="form-label">Şifre</label>
          <input 
            type="password" 
            id="pass" 
            className="form-input" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="remember-row">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked className="checkbox-input" />
            Beni Hatırla
          </label>
          <a href="#forgot" className="forgot-link">Şifremi Unuttum</a>
        </div>

        <button type="submit" className="login-submit-btn">
          Sisteme Giriş Yap
        </button>
      </form>

      <div className="auth-footer">
        <p className="register-prompt">
          Bir hesabınız yok mu? <a href="#register" className="register-link">Yeni Hesap Oluştur</a>
        </p>
      </div>
    </div>
  )
}
