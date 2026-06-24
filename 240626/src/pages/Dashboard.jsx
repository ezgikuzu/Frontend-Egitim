import React from 'react'

export default function Dashboard() {
  return (
    <div className="tab-content dashboard-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Yönetim Paneli</h1>
          <p className="page-subtitle">Şirket genel performansı ve anlık veriler.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn-secondary">Filtrele</button>
          <button type="button" className="btn-primary">Yeni Ekle</button>
        </div>
      </div>

      <div className="grid-dashboard">
        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-indigo-50 text-indigo-600">
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Toplam Müşteri</span>
            <span className="kpi-value">1,482</span>
            <span className="kpi-change text-emerald-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span>12.5% artış</span>
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-blue-50 text-blue-600">
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Toplam Stok Kalemi</span>
            <span className="kpi-value">84,920</span>
            <span className="kpi-change text-emerald-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span>4.2% artış</span>
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-rose-50 text-rose-600">
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Kritik Stok Uyarıları</span>
            <span className="kpi-value">12 Adet</span>
            <span className="kpi-change text-rose-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>18.1% kritik seviye</span>
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-emerald-50 text-emerald-600">
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8H12m0 8h.01"></path>
            </svg>
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Aylık Toplam Satış</span>
            <span className="kpi-value">₺384,150</span>
            <span className="kpi-change text-emerald-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span>8.9% artış</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid-two-cols">
        <div className="card-container col-span-two">
          <div className="card-title">
            <span>Satış Performansı</span>
            <span className="card-subtitle">Son 6 Ay (₺)</span>
          </div>
          <div className="chart-container">
            <div className="chart-bar-column">
              <div className="chart-bar" style={{ height: '45%' }}></div>
              <span className="chart-bar-label">Ocak</span>
              <span className="chart-tooltip">₺140,000</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <span className="chart-bar-label">Şubat</span>
              <span className="chart-tooltip">₺210,000</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar" style={{ height: '55%' }}></div>
              <span className="chart-bar-label">Mart</span>
              <span className="chart-tooltip">₺190,000</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar" style={{ height: '75%' }}></div>
              <span className="chart-bar-label">Nisan</span>
              <span className="chart-tooltip">₺280,000</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar" style={{ height: '85%' }}></div>
              <span className="chart-bar-label">Mayıs</span>
              <span className="chart-tooltip">₺330,000</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar" style={{ height: '95%' }}></div>
              <span className="chart-bar-label">Haziran</span>
              <span className="chart-tooltip">₺384,150</span>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card-title">
            <span>Son Aktiviteler</span>
            <span className="card-link">Tümünü Gör</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="activity-item">
              <div className="activity-icon activity-icon-success">
                ✓
              </div>
              <div>
                <p className="activity-title">Müşteri Eklendi: Ahmet Yılmaz</p>
                <p className="activity-time">Admin tarafından • 5 dk önce</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-icon-warning">
                ⚠
              </div>
              <div>
                <p className="activity-title">Kritik Stok Uyarısı: HP Laserjet Toner</p>
                <p className="activity-time">Stok seviyesi 2 adete düştü • 25 dk önce</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-icon-info">
                ✉
              </div>
              <div>
                <p className="activity-title">Yeni Mesaj: Muhasebe Bölümü</p>
                <p className="activity-time">Fatura detayları iletildi • 1 saat önce</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-icon-primary">
                ✎
              </div>
              <div>
                <p className="activity-title">Ürün Bilgisi Güncellendi: Macbook Air M3</p>
                <p className="activity-time">Satış Ekibi tarafından • 3 saat önce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
