import React from 'react'

export default function Products() {
  return (
    <div className="tab-content products-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Ürün Katalog Yönetimi</h1>
          <p className="page-subtitle">Kategori bazlı ürün listesi, ürün ekleme, düzenleme ve katalog kontrolleri.</p>
        </div>
      </div>

      <div className="category-navbar">
        <button type="button" className="category-btn-active">Hepsi (24)</button>
        <button type="button" className="category-btn">Bilgisayar (8)</button>
        <button type="button" className="category-btn">Aksesuar (10)</button>
        <button type="button" className="category-btn">Yazıcı (4)</button>
        <button type="button" className="category-btn">Yazılım Lisansları (2)</button>
      </div>

      <div className="grid-two-cols">
        <div className="products-grid-column">
          <div className="grid-products">
            <div className="product-card">
              <div>
                <div className="product-image-placeholder">
                  <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="product-header-row">
                  <span className="product-category-tag">Bilgisayar</span>
                  <span className="font-semibold text-slate-900">₺54,999.00</span>
                </div>
                <h3 className="product-title">Macbook Pro 14" M3</h3>
                <p className="product-description">Apple M3 Çip, 8C CPU, 10C GPU, 8GB RAM, 512GB SSD</p>
              </div>
              <div className="product-actions">
                <button type="button" className="btn-product-edit">Düzenle</button>
                <button type="button" className="btn-product-delete">Katalogdan Kaldır</button>
              </div>
            </div>

            <div className="product-card">
              <div>
                <div className="product-image-placeholder">
                  <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="product-header-row">
                  <span className="product-category-tag">Telefon</span>
                  <span className="font-semibold text-slate-900">₺42,500.00</span>
                </div>
                <h3 className="product-title">iPhone 15 128GB</h3>
                <p className="product-description">A16 Bionic işlemci, 48MP ana kamera, USB-C girişi, Siyah renk</p>
              </div>
              <div className="product-actions">
                <button type="button" className="btn-product-edit">Düzenle</button>
                <button type="button" className="btn-product-delete">Katalogdan Kaldır</button>
              </div>
            </div>

            <div className="product-card">
              <div>
                <div className="product-image-placeholder">
                  <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <div className="product-header-row">
                  <span className="product-category-tag">Aksesuar</span>
                  <span className="font-semibold text-slate-900">₺2,499.00</span>
                </div>
                <h3 className="product-title">Logitech MX Master 3S</h3>
                <p className="product-description">Kablosuz ergonomik fare, 8K DPI optik sensör, USB-C şarj edilebilir</p>
              </div>
              <div className="product-actions">
                <button type="button" className="btn-product-edit">Düzenle</button>
                <button type="button" className="btn-product-delete">Katalogdan Kaldır</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div className="card-container">
            <div className="card-title">
              <span>Yeni Ürün Ekle</span>
              <span className="card-subtitle-link">+ Katalog</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Ürün Adı</label>
                <input type="text" className="form-input" placeholder="Örn: Macbook Pro 16" />
              </div>

              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-select">
                  <option>Bilgisayar</option>
                  <option>Telefon</option>
                  <option>Aksesuar</option>
                  <option>Yazıcı</option>
                  <option>Yazılım Lisansları</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Satış Fiyatı (TL)</label>
                <input type="number" className="form-input" placeholder="0.00" defaultValue="15000" />
              </div>

              <div className="form-group">
                <label className="form-label">Ürün Açıklaması</label>
                <textarea className="form-textarea" placeholder="Ürün özellikleri ve detaylı açıklaması..."></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Görsel Seçimi (Tasarım)</label>
                <div className="image-upload-dashed">
                  <span className="upload-text">Görsel yüklemek için sürükleyin veya tıklayın</span>
                </div>
              </div>

              <button type="button" className="btn-submit">Kataloga Ekle</button>
            </form>
          </div>

          <div className="card-container">
            <div className="card-title">
              <span>Kategori Yönetimi</span>
              <span className="card-subtitle-link">+ Ekle</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Kategori Adı</label>
                <input type="text" className="form-input" placeholder="Örn: Network Cihazları" />
              </div>
              <div className="form-group">
                <label className="form-label">Kategori Kodu (Ön Ek)</label>
                <input type="text" className="form-input" placeholder="Örn: NET" />
              </div>
              <button type="button" className="btn-secondary w-full mt-2">Kategori Oluştur</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
