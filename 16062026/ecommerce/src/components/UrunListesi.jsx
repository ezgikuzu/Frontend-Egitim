import { useState } from "react";

export default function UrunListesi({
  products,
  loading,
  error,
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onSepeteEkle,
  searchTerm
}) {

  const filteredProducts = products.filter(
    (item) =>
      item.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marka.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-card">
      <div className="app-card-header">
        <h2 className="app-card-title">Mağaza Kataloğu</h2>
      </div>

      <div className="app-card-body">
        <div className="etiket-izgara">
          
          <div className="filtre-paneli">
            <span className="filtre-baslik">Kategoriler</span>
            <div className="kategori-secenekleri">
              <button
                onClick={() => onCategoryChange("all")}
                className={`kategori-secenek-btn ${activeCategory === "all" ? "kategori-secenek-btn-aktif" : "kategori-secenek-btn-pasif"}`}
              >
                Tümü
              </button>
              <button
                onClick={() => onCategoryChange("Elektronik")}
                className={`kategori-secenek-btn ${activeCategory === "Elektronik" ? "kategori-secenek-btn-aktif" : "kategori-secenek-btn-pasif"}`}
              >
                Elektronik
              </button>
              <button
                onClick={() => onCategoryChange("Giyim")}
                className={`kategori-secenek-btn ${activeCategory === "Giyim" ? "kategori-secenek-btn-aktif" : "kategori-secenek-btn-pasif"}`}
              >
                Giyim
              </button>
              <button
                onClick={() => onCategoryChange("Kitap")}
                className={`kategori-secenek-btn ${activeCategory === "Kitap" ? "kategori-secenek-btn-aktif" : "kategori-secenek-btn-pasif"}`}
              >
                Kitaplar
              </button>
            </div>
          </div>

          <div className="urun-vitrini-alan">
            <div className="filter-bar">
              <div></div>
              <div className="detail-meta-val">
                Bulunan: {filteredProducts.length} adet envanter
              </div>
            </div>

            {loading && !error ? (
              <div className="vitrin-grid">
                <div className="skeleton-container">
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-bar-long"></div>
                  <div className="skeleton-bar-short"></div>
                </div>
                <div className="skeleton-container">
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-bar-long"></div>
                  <div className="skeleton-bar-short"></div>
                </div>
                <div className="skeleton-container">
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-bar-long"></div>
                  <div className="skeleton-bar-short"></div>
                </div>
              </div>
            ) : error ? (
              <div className="skeleton-container">
                <span className="detail-meta-label">
                  Katalog yüklenirken bir hata oluştu: {error}
                </span>
              </div>
            ) : (
              <div className="vitrin-grid">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct(item)}
                    className="urun-kart"
                  >
                    <div className="urun-kart-ust">
                      <span className="resim-ikoni">{item.gorsel}</span>
                      <div className="urun-kart-content">
                        <div className="urun-kart-etiket-grubu">
                          {item.kargoBedava && (
                            <span className="urun-kargo-bedava-badge">Kargo Bedava</span>
                          )}
                          {item.eskiFiyat - item.fiyat > 300 && (
                            <span className="urun-super-fiyat-badge">Süper Fiyat</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="urun-kart-detay">
                      <div>
                        <span className="marka-etiketi">{item.marka}</span>
                        <h3 className="urun-baslik-etiketi">{item.ad}</h3>
                        
                        <div className="puan-satiri">
                          <span>★ {item.degerlendirme.toFixed(1)}</span>
                          <span className="yorum-adedi-etiket">({item.yorumAdedi} yorum)</span>
                        </div>

                        {item.stok > 0 && item.stok < 5 && (
                          <div className="stok-uyari-seridi">
                            <span>Son {item.stok} ürün!</span>
                          </div>
                        )}
                        {item.stok === 0 && (
                          <div className="stok-uyari-seridi bg-rose-50 border-rose-100 text-rose-600">
                            <span>Tükendi</span>
                          </div>
                        )}
                      </div>

                      <div className="urun-fiyat-grubu">
                        <div>
                          {item.eskiFiyat && (
                            <span className="eski-fiyat-etiketi">
                              {item.eskiFiyat.toFixed(2)} TL
                            </span>
                          )}
                          <span className="yeni-fiyat-etiketi">
                            {item.fiyat.toFixed(2)} TL
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSepeteEkle(item);
                          }}
                          disabled={item.stok === 0}
                          className="urun-sepet-ekle-butonu"
                        >
                          {item.stok === 0 ? "Tükendi" : "Sepete Ekle"}
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
