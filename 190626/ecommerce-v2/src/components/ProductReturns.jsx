import { useState } from "react";

export default function ProductReturns() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (orderId === "12345") {
      setIsSubmitted(true);
      setError("");
    } else {
      setIsSubmitted(false);
      setError("Sipariş Bulunamadı!.(Örnek Sipariş No:12345");
    }
  };

  return (
    <>
      <main className="tracking-container">
        {isSubmitted ? (
          <div className="tracking-card">
            <h2 className="form-title">Talebiniz Alındı</h2>
            <p className="value-desc">
              İade talebiniz başarılya Oluşturulmuştur
            </p>
            <div className="return-success-box">
              <span className="return-success-code">
                Kargo Kodu : N11-RETURN-987
              </span>
            </div>
            <p className="value-desc text-gray-500">
              Lütfen bu kodu en yakın kargo şubesine giderek görevliye iletiniz
            </p>
            <button
              className="form-submit mt-4"
              onClick={() => {
                setIsSubmitted(false);
                setOrderId("");
                setEmail("");
                setReason("");
                setDescription("");
              }}
            >
              Yeni Talep Oluştur
            </button>
          </div>
        ) : (
          <div className="tracking-card">
            <h2 className="form-title">Kolay İade Talebi</h2>
            <form onSubmit={handleReturnSubmit}>
              <div className="form-group">
                <label className="form-label">Sipariş Numarası</label>
                <input
                  type="text"
                  placeholder="Örn:12345"
                  className="form-input"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">E-Posta Adresi</label>
                <input
                  type="email"
                  placeholder="ahmet@yilmaz.com"
                  className="form-input"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">İade Nedeni</label>
                <select
                  className="form-select"
                  value={reason}
                  required
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  <option value="damage">Arızalı Ürün</option>
                  <option value="size">beden/Boyut Uymadı</option>
                  <option value="dislike">Beğenmedim</option>
                  <option value="wrong">Yanlış Ürün Gönderildi</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Açıklama</label>
                <textarea
                  placeholder="İade etmek istediğiniz ürünleri ve detayları belirtiniz..."
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button className="form-submit" type="submit">
                İade Talebi Oluştur
              </button>
            </form>
            {error && <span className="form-error">{error}</span>}
          </div>
        )}

        <div className="tracking-card">
          <h3 className="value-title">Kolay İade Adımları</h3>
          <p className="value-desc">
            1. Yukarıdaki formdan iade talebi oluşturun
          </p>
          <p className="value-desc">
            2. Size verilecek kargo koduyla ürünü paketleyin
          </p>
          <p className="value-desc">
            3. En yakın kargo şubesine giderek paketi ücretsiz teslim edin.
          </p>
        </div>
      </main>
    </>
  );
}
