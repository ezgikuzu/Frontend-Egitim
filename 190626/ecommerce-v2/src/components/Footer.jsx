export default function Footer({ setView, setSelectedCategory }) {
  const handleCategoryLink = (cat) => {
    setSelectedCategory(cat);
    setView("home");
  };
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">N11clone</h3>
            <span className="footer-link" onClick={() => setView("about")}>
              Hakkımızda
            </span>
            <span className="footer-link" onClick={() => setView("about")}>
              Kariyer
            </span>
            <span className="footer-link" onClick={() => setView("help")}>
              İletişim
            </span>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Kategoriler</h3>
            <span
              className="footer-link"
              onClick={() => handleCategoryLink("Telefon")}
            >
              Telefon
            </span>
            <span
              className="footer-link"
              onClick={() => handleCategoryLink("Aksesuar")}
            >
              Aksesuar
            </span>
            <span
              className="footer-link"
              onClick={() => handleCategoryLink("Bilgisayar")}
            >
              Bilgisayar
            </span>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Müşteri Hizmetleri</h3>
            <span className="footer-link" onClick={() => setView("help")}>
              Yardım Merkezi
            </span>
            <span className="footer-link" onClick={() => setView("tracking")}>
              Sipariş Takibi
            </span>
            <span className="footer-link" onClick={() => setView("returns")}>
              İade ve Değişim
            </span>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Güvenli Alışveriş</h3>
            <p className="text-xs text-gray-500">
              %100 güvenli ödeme altyapısı ile kart bilgileriniz korunmaktadır.
            </p>
          </div>
          <div className="footer-bottom">
            <p>@2026 Selahaddin ÇİFTÇİm - Tüm Hakları Saklıdır.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
