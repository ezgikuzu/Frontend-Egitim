import { useEffect } from "react";

export default function UrunDetayi({ product, onClose, onSepeteEkle }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (product) {
      console.log(`[Ders Notu - Mount] UrunDetayi modalı açıldı: ${product.ad}`);
    }
    return () => {
      console.log("[Ders Notu - Unmount] UrunDetayi modalı kapatıldı ve bellekten temizlendi.");
    };
  }, [product]);

  const getInventoryWarning = () => {
    if (!product) return null;
    if (product.stok === 0) {
      return {
        level: "danger",
        text: "Tükendi: Bu ürün geçici olarak temin edilemiyor."
      };
    }
    if (product.stok < 5) {
      return {
        level: "warning",
        text: `Düşük Stok: Bu üründen son ${product.stok} adet kaldı!`
      };
    }
    return null;
  };

  const warning = getInventoryWarning();

  if (!product) return null;

  return (
    <div onClick={onClose} className="modal-maske">
      <div onClick={(e) => e.stopPropagation()} className="modal-kutu">
        
        <div className="modal-resim-bolumu">
          <span className="modal-kategori-badge">{product.kategori}</span>
          <span className="modal-resim-emoji">{product.gorsel}</span>
        </div>

        <div className="modal-icerik-bolumu">
          
          <div className="modal-baslik-alani">
            <div>
              <span className="marka-etiketi">{product.marka}</span>
              <h2 className="app-card-title">{product.ad}</h2>
            </div>
            <button onClick={onClose} className="modal-kapat-butonu">✕</button>
          </div>

          <div className="modal-urun-bilgi">
            {warning && (
              <div className="alert-banner">
                <span className="modal-detay-deger">{warning.text}</span>
              </div>
            )}

            <div className="modal-detay-listesi">
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Birim Fiyat</span>
                <span className="yeni-fiyat-etiketi">{product.fiyat.toFixed(2)} TL</span>
              </div>
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Kalan Stok</span>
                <span className="modal-detay-deger">{product.stok} adet</span>
              </div>
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Müşteri Beğenisi</span>
                <span className="modal-detay-deger">★ {product.degerlendirme.toFixed(1)} ({product.yorumAdedi} Yorum)</span>
              </div>
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Açıklama</span>
                <span className="modal-detay-deger">{product.tanim}</span>
              </div>
            </div>

            <span className="modal-yorumlar-baslik">Müşteri Değerlendirmeleri</span>
            <div className="modal-yorumlar-listesi">
              {product.incelemeler && product.incelemeler.map((review, index) => {
                const timeMatch = review.match(/^\[(.*?)\]/);
                const time = timeMatch ? timeMatch[0] : "";
                const message = timeMatch ? review.slice(time.length).trim() : review;

                return (
                  <div key={index} className="modal-yorum-kart">
                    <div className="modal-yorum-yazar-satir">
                      <span className="modal-yorum-yazar">{time ? "Kullanıcı Değerlendirmesi" : "Anonim Müşteri"}</span>
                      <span>{time}</span>
                    </div>
                    <p className="modal-yorum-metin">{message}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-aksiyon-alani">
            <button
              onClick={() => {
                onSepeteEkle(product);
                onClose();
              }}
              disabled={product.stok === 0}
              className="urun-sepet-ekle-butonu"
            >
              {product.stok === 0 ? "Tükendi" : "Sepete Ekle"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
