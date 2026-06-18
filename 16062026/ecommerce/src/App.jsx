import { useState, useMemo, useEffect, useCallback } from "react";
import Baslik from "./components/Baslik";
import KampanyaBanner from "./components/KampanyaBanner";
import UrunListesi from "./components/UrunListesi";
import UrunDetayi from "./components/UrunDetayi";
import SepetGezgini from "./components/SepetGezgini";

export default function App() {
  const [products, setProducts] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [sepetAcik, setSepetAcik] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/urunler.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Katalog yüklenemedi. Sunucu hata kodu: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const displayProducts = useMemo(() => {
    const filtered = currentCategory === "all"
      ? products
      : products.filter((item) => item.kategori === currentCategory);

    return filtered.map((item) => {
      const sepetUrun = sepet.find((c) => c.id === item.id);
      const sepetAdet = sepetUrun ? sepetUrun.adet : 0;
      return {
        ...item,
        stok: Math.max(0, item.stok - sepetAdet)
      };
    });
  }, [products, currentCategory, sepet]);

  const selectedProduct = useMemo(() => {
    return displayProducts.find((p) => p.id === selectedProductId) || null;
  }, [displayProducts, selectedProductId]);

  const handleSepeteEkle = useCallback((urun) => {
    if (urun.stok <= 0) return;

    setSepet((prevSepet) => {
      const varOlan = prevSepet.find((item) => item.id === urun.id);
      if (varOlan) {
        return prevSepet.map((item) =>
          item.id === urun.id ? { ...item, adet: item.adet + 1 } : item
        );
      }
      return [...prevSepet, { id: urun.id, ad: urun.ad, fiyat: urun.fiyat, adet: 1 }];
    });
  }, []);

  const handleAdetGuncelle = useCallback((productId, yeniAdet) => {
    const anaUrun = products.find((p) => p.id === productId);
    if (!anaUrun) return;

    if (yeniAdet <= 0) {
      setSepet((prev) => prev.filter((item) => item.id !== productId));
      return;
    }

    if (yeniAdet > anaUrun.stok) {
      alert(`Üzgünüz, bu üründen en fazla ${anaUrun.stok} adet ekleyebilirsiniz.`);
      return;
    }

    setSepet((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, adet: yeniAdet } : item
      )
    );
  }, [products]);

  const handleUrunCikar = useCallback((productId) => {
    setSepet((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const handleCategoryChange = useCallback((newCat) => {
    setCurrentCategory(newCat);
  }, []);

  return (
    <div className="app-container">
      <Baslik
        env={currentCategory}
        sepetAdedi={sepet.reduce((sum, item) => sum + item.adet, 0)}
        onSepetAc={() => setSepetAcik(true)}
        searchVal={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <KampanyaBanner />

      <UrunListesi
        products={displayProducts}
        loading={loading}
        error={error}
        activeCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        onSelectProduct={(item) => setSelectedProductId(item.id)}
        onSepeteEkle={handleSepeteEkle}
        searchTerm={searchTerm}
      />

      <SepetGezgini
        sepet={sepet}
        isOpen={sepetAcik}
        onClose={() => setSepetAcik(false)}
        onAdetGuncelle={handleAdetGuncelle}
        onUrunCikar={handleUrunCikar}
      />

      {selectedProductId && (
        <UrunDetayi
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onSepeteEkle={handleSepeteEkle}
        />
      )}
    </div>
  );
}
