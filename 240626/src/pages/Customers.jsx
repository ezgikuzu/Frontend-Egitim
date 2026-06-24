import React from 'react'

export default function Customers() {
  return (
    <div className="tab-content customers-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Müşteri Yönetimi</h1>
          <p className="page-subtitle">Müşteri listesi, ekleme, düzenleme ve silme panelleri.</p>
        </div>
      </div>

      <div className="grid-two-cols">
        <div className="card-container col-span-two">
          <div className="card-title">
            <span>Kayıtlı Müşteriler</span>
            <span className="badge-info">Toplam 148 Müşteri</span>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr className="table-header">
                  <th className="table-header-cell">Müşteri Bilgisi</th>
                  <th className="table-header-cell">İletişim</th>
                  <th className="table-header-cell">Bakiye</th>
                  <th className="table-header-cell">Durum</th>
                  <th className="table-header-cell text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold">Ahmet Yılmaz</p>
                      <p className="subtext">Yılmaz Mühendislik A.Ş.</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="text-xs">ahmet.yilmaz@company.com</p>
                      <p className="subtext">+90 532 111 2233</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="cell-value">₺12,500.00</span>
                  </td>
                  <td className="table-cell">
                    <span className="badge-success">Aktif</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-table-action">Düzenle</button>
                      <button type="button" className="btn-table-action-danger">Sil</button>
                    </div>
                  </td>
                </tr>

                <tr className="table-row">
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold">Zeynep Kaya</p>
                      <p className="subtext">Zeynep Mimarlık LTD.</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="text-xs">zeynep.kaya@ltd.com</p>
                      <p className="subtext">+90 541 222 3344</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="cell-value">₺0.00</span>
                  </td>
                  <td className="table-cell">
                    <span className="badge-success">Aktif</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-table-action">Düzenle</button>
                      <button type="button" className="btn-table-action-danger">Sil</button>
                    </div>
                  </td>
                </tr>

                <tr className="table-row">
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold">Mehmet Demir</p>
                      <p className="subtext">Demir İnşaat Ticaret</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="text-xs">m.demir@demir.com.tr</p>
                      <p className="subtext">+90 533 333 4455</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="cell-value-debt">-₺4,350.00</span>
                  </td>
                  <td className="table-cell">
                    <span className="badge-warning">Riskli</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-table-action">Düzenle</button>
                      <button type="button" className="btn-table-action-danger">Sil</button>
                    </div>
                  </td>
                </tr>

                <tr className="table-row">
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold">Ayşe Yurt</p>
                      <p className="subtext">Bireysel Müşteri</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="text-xs">ayse@yurt.com</p>
                      <p className="subtext">+90 555 444 5566</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="cell-value">₺1,800.00</span>
                  </td>
                  <td className="table-cell">
                    <span className="badge-danger">Pasif</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-table-action">Düzenle</button>
                      <button type="button" className="btn-table-action-danger">Sil</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-container">
          <div className="card-container">
            <div className="card-title">
              <span>Yeni Müşteri Ekle</span>
              <span className="card-subtitle-link">+ Hızlı Ekle</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Ad Soyad / Firma Yetkilisi</label>
                <input type="text" className="form-input" placeholder="Ahmet Yılmaz" />
              </div>
              <div className="form-group">
                <label className="form-label">Firma Ünvanı</label>
                <input type="text" className="form-input" placeholder="Yılmaz Mühendislik A.Ş." />
              </div>
              <div className="form-group">
                <label className="form-label">E-posta Adresi</label>
                <input type="email" className="form-input" placeholder="ahmet@firma.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Telefon Numarası</label>
                <input type="text" className="form-input" placeholder="+90 532 000 0000" />
              </div>
              <div className="form-group">
                <label className="form-label">Müşteri Durumu</label>
                <select className="form-select">
                  <option>Aktif</option>
                  <option>Pasif</option>
                  <option>Riskli</option>
                </select>
              </div>
              <button type="button" className="btn-submit">Müşteriyi Kaydet</button>
            </form>
          </div>

          <div className="card-alert-container">
            <div className="card-title text-rose-800">
              <span>Müşteri Silme Önizleme</span>
              <span className="text-rose-500 font-bold">⚠</span>
            </div>
            <p className="alert-text">
              <strong>Ahmet Yılmaz</strong> isimli müşteriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex-actions">
              <button type="button" className="btn-danger flex-1">Evet, Sil</button>
              <button type="button" className="btn-secondary flex-1">Vazgeç</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
