import React from 'react'

export default function Reports() {
  return (
    <div className="tab-content reports-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Detaylı Raporlama ve Analiz</h1>
          <p className="page-subtitle">Şirketinizin finansal, stok ve müşteri büyüme analiz raporları.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn-secondary">Excel Dışa Aktar</button>
          <button type="button" className="btn-primary">Yeni Rapor Oluştur</button>
        </div>
      </div>

      <div className="grid-dashboard">
        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-indigo-50 text-indigo-600">
            ₺
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Toplam Satış Tutarı</span>
            <span className="kpi-value">₺1,842,900</span>
            <span className="report-kpi-sub">Bu Yıl Toplamı</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-blue-50 text-blue-600">
            📊
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Ortalama Sipariş Tutarı</span>
            <span className="kpi-value">₺4,250.00</span>
            <span className="report-kpi-sub-success">+₺240.00 geçen aya göre</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-emerald-50 text-emerald-600">
            📈
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Brüt Kar Marjı</span>
            <span className="kpi-value">%28.4</span>
            <span className="report-kpi-sub">Hedef: %30.0</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-rose-50 text-rose-600">
            🛒
          </div>
          <div className="kpi-details">
            <span className="kpi-label">İade Oranı</span>
            <span className="kpi-value">%1.8</span>
            <span className="report-kpi-sub-alert">Kritik Limit: %2.5</span>
          </div>
        </div>
      </div>

      <div className="grid-two-cols">
        <div className="card-container col-span-two">
          <div className="card-title">
            <span>Yıllık Satış & Ciro Grafiği</span>
            <span className="card-link">Yıllık Görünüm</span>
          </div>

          <div className="chart-container">
            <div className="chart-bar-column">
              <div className="chart-bar-alt" style={{ height: '40%' }}></div>
              <span className="chart-bar-label">2021</span>
              <span className="chart-tooltip">₺840k</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar-alt" style={{ height: '58%' }}></div>
              <span className="chart-bar-label">2022</span>
              <span className="chart-tooltip">₺1.2M</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar-alt" style={{ height: '75%' }}></div>
              <span className="chart-bar-label">2023</span>
              <span className="chart-tooltip">₺1.6M</span>
            </div>
            <div className="chart-bar-column">
              <div className="chart-bar-alt" style={{ height: '92%' }}></div>
              <span className="chart-bar-label">2024</span>
              <span className="chart-tooltip">₺1.84M</span>
            </div>
          </div>

          <div className="table-wrapper mt-8">
            <table className="data-table">
              <thead>
                <tr className="table-header">
                  <th className="table-header-cell">Dönem</th>
                  <th className="table-header-cell">Toplam Sipariş</th>
                  <th className="table-header-cell">Ciro</th>
                  <th className="table-header-cell">Net Kar</th>
                  <th className="table-header-cell text-right">Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-cell"><span className="font-semibold">Q1 - 2026</span></td>
                  <td className="table-cell">142 Adet</td>
                  <td className="table-cell">₺450,200.00</td>
                  <td className="table-cell text-emerald-600">₺126,056.00</td>
                  <td className="table-cell text-right"><span className="badge-success">Kapatıldı</span></td>
                </tr>
                <tr className="table-row">
                  <td className="table-cell"><span className="font-semibold">Q2 - 2026</span></td>
                  <td className="table-cell">198 Adet</td>
                  <td className="table-cell">₺582,150.00</td>
                  <td className="table-cell text-emerald-600">₺163,000.00</td>
                  <td className="table-cell text-right"><span className="badge-success">Kapatıldı</span></td>
                </tr>
                <tr className="table-row">
                  <td className="table-cell"><span className="font-semibold">Q3 - 2026</span></td>
                  <td className="table-cell">85 Adet</td>
                  <td className="table-cell">₺220,500.00</td>
                  <td className="table-cell text-emerald-600">₺61,740.00</td>
                  <td className="table-cell text-right"><span className="badge-info">Açık</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-container flex-col-between">
          <div>
            <div className="card-title">
              <span>Hızlı Analiz Raporu Oluştur</span>
              <span className="text-indigo-600">⚡</span>
            </div>
            <p className="report-subtitle-text">İstediğiniz veri parametrelerini seçerek özel rapor hazırlayın.</p>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Rapor Türü</label>
                <select className="form-select">
                  <option>Finansal Ciro Raporu</option>
                  <option>Stok ve Envanter Değer Raporu</option>
                  <option>Müşteri Bakiye ve Risk Analizi</option>
                  <option>Teknik Personel Performans Raporu</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tarih Aralığı</label>
                <select className="form-select">
                  <option>Son 30 Gün</option>
                  <option>Bu Çeyrek (Q3)</option>
                  <option>Son 6 Ay</option>
                  <option>Özel Tarih Aralığı</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Dosya Biçimi</label>
                <div className="movement-selector">
                  <label className="movement-label">
                    <input type="radio" name="format-type" defaultChecked className="text-indigo-600" />
                    PDF (.pdf)
                  </label>
                  <label className="movement-label">
                    <input type="radio" name="format-type" className="text-indigo-600" />
                    Excel (.xlsx)
                  </label>
                </div>
              </div>

              <button type="button" className="btn-report-submit">Analiz Et ve Oluştur</button>
            </form>
          </div>

          <div className="downloads-section">
            <span className="report-section-heading">Son Oluşturulan Hazır Raporlar</span>
            <div className="flex-container">
              <div className="download-item">
                <div className="flex-container">
                  <span className="download-title">Q2_Ciro_Raporu.pdf</span>
                  <span className="file-meta">Dün 16:30 • 2.4 MB</span>
                </div>
                <button type="button" className="download-link">İndir</button>
              </div>

              <div className="download-item">
                <div className="flex-container">
                  <span className="download-title">Stok_Sayim_Listesi.xlsx</span>
                  <span className="file-meta">22.06.2026 • 840 KB</span>
                </div>
                <button type="button" className="download-link">İndir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
