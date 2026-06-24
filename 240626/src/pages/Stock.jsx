import React from 'react'

export default function Stock() {
  return (
    <div className="tab-content stock-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stok Yönetimi</h1>
          <p className="page-subtitle">Ürün stok miktarları, hareket giriş/çıkışları ve uyarı limitleri.</p>
        </div>
      </div>

      <div className="grid-two-cols">
        <div className="card-container col-span-two">
          <div className="card-title">
            <span>Stok Durum Tablosu</span>
            <span className="badge-warning">12 Kritik Seviye</span>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr className="table-header">
                  <th className="table-header-cell">SKU / Kod</th>
                  <th className="table-header-cell">Ürün Adı</th>
                  <th className="table-header-cell">Kategori</th>
                  <th className="table-header-cell">Miktar</th>
                  <th className="table-header-cell">Durum</th>
                  <th className="table-header-cell text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-cell">
                    <span className="sku-code">SKU-849-APL</span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold text-slate-900">Macbook Pro 14" M3</p>
                      <p className="subtext">Depo-A • Raf B3</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="category-tag">Bilgisayar</span>
                  </td>
                  <td className="table-cell">
                    <div className="stock-level-container">
                      <span className="font-semibold text-slate-900">45 Adet</span>
                      <div className="stock-bar-wrapper">
                        <div className="stock-bar-fill stock-bar-fill-success" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-success">Stokta Var</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-stock-action">+</button>
                      <button type="button" className="btn-stock-action">-</button>
                      <button type="button" className="btn-stock-detail">Detay</button>
                    </div>
                  </td>
                </tr>

                <tr className="table-row">
                  <td className="table-cell">
                    <span className="sku-code">SKU-102-LOG</span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold text-slate-900">Logitech MX Master 3S</p>
                      <p className="subtext">Depo-A • Raf C1</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="category-tag">Aksesuar</span>
                  </td>
                  <td className="table-cell">
                    <div className="stock-level-container">
                      <span className="font-semibold text-slate-900">8 Adet</span>
                      <div className="stock-bar-wrapper">
                        <div className="stock-bar-fill stock-bar-fill-warning" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-warning">Kritik Sınır</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-stock-action">+</button>
                      <button type="button" className="btn-stock-action">-</button>
                      <button type="button" className="btn-stock-detail">Detay</button>
                    </div>
                  </td>
                </tr>

                <tr className="table-row">
                  <td className="table-cell">
                    <span className="sku-code">SKU-773-DEL</span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold text-slate-900">Dell UltraSharp 27"</p>
                      <p className="subtext">Depo-B • Raf A2</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="category-tag">Monitör</span>
                  </td>
                  <td className="table-cell">
                    <div className="stock-level-container">
                      <span className="font-semibold text-slate-900">0 Adet</span>
                      <div className="stock-bar-wrapper">
                        <div className="stock-bar-fill stock-bar-fill-danger" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-danger">Tükendi</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-stock-action">+</button>
                      <button type="button" className="btn-stock-action">-</button>
                      <button type="button" className="btn-stock-detail">Detay</button>
                    </div>
                  </td>
                </tr>

                <tr className="table-row">
                  <td className="table-cell">
                    <span className="sku-code">SKU-520-HPG</span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold text-slate-900">HP LaserJet Pro M404n</p>
                      <p className="subtext">Depo-A • Raf B10</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="category-tag">Yazıcı</span>
                  </td>
                  <td className="table-cell">
                    <div className="stock-level-container">
                      <span className="font-semibold text-slate-900">18 Adet</span>
                      <div className="stock-bar-wrapper">
                        <div className="stock-bar-fill stock-bar-fill-success" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-success">Stokta Var</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="cell-actions">
                      <button type="button" className="btn-stock-action">+</button>
                      <button type="button" className="btn-stock-action">-</button>
                      <button type="button" className="btn-stock-detail">Detay</button>
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
              <span>Hızlı Stok Hareketi Girişi</span>
              <span className="text-xs text-emerald-600 font-semibold">Giriş / Çıkış</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Ürün Seçin</label>
                <select className="form-select">
                  <option>Macbook Pro 14" M3 (SKU-849-APL)</option>
                  <option>Logitech MX Master 3S (SKU-102-LOG)</option>
                  <option>Dell UltraSharp 27" (SKU-773-DEL)</option>
                  <option>HP LaserJet Pro M404n (SKU-520-HPG)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Hareket Tipi</label>
                <div className="movement-selector">
                  <label className="movement-label">
                    <input type="radio" name="movement-type" defaultChecked className="text-indigo-600" />
                    Stok Ekle (+)
                  </label>
                  <label className="movement-label">
                    <input type="radio" name="movement-type" className="text-indigo-600" />
                    Stok Çıkar (-)
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Miktar (Adet)</label>
                <input type="number" className="form-input" placeholder="10" defaultValue="5" />
              </div>

              <div className="form-group">
                <label className="form-label">Açıklama / Fiş No</label>
                <input type="text" className="form-input" placeholder="Örn: Yeni sevkiyat girişi" />
              </div>

              <button type="button" className="btn-submit">Hareketi Kaydet</button>
            </form>
          </div>

          <div className="card-container">
            <div className="card-title">
              <span>Depo Dağılımı</span>
              <span className="card-subtitle">Kapasite Doluluk</span>
            </div>
            <div className="flex-container">
              <div>
                <div className="warehouse-label-row">
                  <span>Merkez Depo (Depo-A)</span>
                  <span>78% Dolu</span>
                </div>
                <div className="capacity-bar-wrapper">
                  <div className="capacity-bar-fill capacity-bar-fill-primary" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="warehouse-label-row">
                  <span>Yedek Depo (Depo-B)</span>
                  <span>35% Dolu</span>
                </div>
                <div className="capacity-bar-wrapper">
                  <div className="capacity-bar-fill capacity-bar-fill-secondary" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
