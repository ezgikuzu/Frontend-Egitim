import { useState, useEffect } from 'react';

const PersonelFiltre = ({ 
  aramaMetni, 
  setAramaMetni, 
  seciliDepartman, 
  setSeciliDepartman, 
  sadeceAktif, 
  setSadeceAktif,
  sadeceStajyer,
  setSadeceStajyer
}) => {
  const departmanlar = ["Tümü", "Yazılım", "Tasarım", "Yönetim", "Pazarlama", "İnsan Kaynakları"];

  return (
    <div className="demo-card demo-card-3xl p-4">
      <h4 className="demo-section-title mb-3">Personel Ara ve Filtrele</h4>

      <div className="demo-responsive-grid-2">
        <div>
          <input
            type="text"
            placeholder="İsim veya rol ara..."
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            className="demo-input"
          />
        </div>

        <div>
          <select
            value={seciliDepartman}
            onChange={(e) => setSeciliDepartman(e.target.value)}
            className="demo-select"
          >
            {departmanlar.map(dep => (
              <option key={dep} value={dep}>{dep} Departmanı</option>
            ))}
          </select>
        </div>
      </div>

      <div className="demo-filter-actions">
        <label className="demo-filter-checkbox-label">
          <input
            type="checkbox"
            checked={sadeceAktif}
            onChange={(e) => setSadeceAktif(e.target.checked)}
            className="todo-checkbox"
          />
          Sadece Aktif Çalışanlar
        </label>

        <label className="demo-filter-checkbox-label">
          <input
            type="checkbox"
            checked={sadeceStajyer}
            onChange={(e) => setSadeceStajyer(e.target.checked)}
            className="todo-checkbox"
          />
          Sadece Stajyerler
        </label>
      </div>
    </div>
  );
};

const PersonelKart = ({ personel, sil, duzenle, aktiflikToggle }) => {
  return (
    <div className={`personel-card ${!personel.aktif ? "personel-card-passive" : ""}`}>
      <div>
        <div className="personel-card-header">
          <div>
            <h4 className="personel-name">{personel.ad} {personel.soyad}</h4>
            <span className="personel-role">{personel.rol}</span>
          </div>

          <div className="personel-badges-col">
            <button
              onClick={() => aktiflikToggle(personel.id)}
              className={`badge-status-btn ${
                personel.aktif ? "badge-status-btn-active" : "badge-status-btn-passive"
              }`}
            >
              {personel.aktif ? "Aktif" : "Pasif"}
            </button>
            {personel.stajyer && (
              <span className="badge-intern">
                Stajyer
              </span>
            )}
          </div>
        </div>

        <div className="personel-card-info">
          <div><strong>Departman:</strong> {personel.departman}</div>
          <div><strong>E-Posta:</strong> {personel.eposta}</div>
          <div><strong>Telefon:</strong> {personel.telefon || "Belirtilmedi"}</div>
        </div>
      </div>

      <div className="personel-card-actions">
        <button
          onClick={() => duzenle(personel)}
          className="btn-edit-personel"
        >
          Düzenle
        </button>
        <button
          onClick={() => sil(personel.id)}
          className="btn-delete-personel"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

const PersonelForm = ({ form, setForm, kaydet, duzenlenenId, iptalEt }) => {
  const [hatalar, setHatalar] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const guncelDeger = type === "checkbox" ? checked : value;

    setForm(prev => ({ ...prev, [name]: guncelDeger }));

    if (hatalar[name]) {
      setHatalar(prev => ({ ...prev, [name]: "" }));
    }
  };

  const formDogrula = () => {
    const yeniHatalar = {};
    if (form.ad.trim().length < 2) yeniHatalar.ad = "Ad en az 2 karakter olmalıdır.";
    if (form.soyad.trim().length < 2) yeniHatalar.soyad = "Soyad en az 2 karakter olmalıdır.";
    if (form.rol.trim().length < 2) yeniHatalar.rol = "Rol en az 2 karakter olmalıdır.";
    if (!form.eposta.includes("@") || form.eposta.trim().length < 5) {
      yeniHatalar.eposta = "Geçerli bir e-posta giriniz.";
    }

    setHatalar(yeniHatalar);
    return Object.keys(yeniHatalar).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formDogrula()) {
      kaydet();
      setHatalar({});
    }
  };

  return (
    <div className="demo-card demo-card-3xl p-5 sticky top-4">
      <h4 className="card-title-bordered">
        {duzenlenenId ? "Personel Bilgilerini Düzenle" : "Yeni Personel Ekle"}
      </h4>

      <form onSubmit={handleFormSubmit} className="space-y-3">

        <div className="demo-grid-2">
          <div>
            <label className="demo-label">Ad:</label>
            <input
              type="text"
              name="ad"
              value={form.ad}
              onChange={handleInputChange}
              className={`demo-input ${hatalar.ad ? "demo-input-error" : ""}`}
            />
            {hatalar.ad && <p className="demo-error-text">{hatalar.ad}</p>}
          </div>

          <div>
            <label className="demo-label">Soyad:</label>
            <input
              type="text"
              name="soyad"
              value={form.soyad}
              onChange={handleInputChange}
              className={`demo-input ${hatalar.soyad ? "demo-input-error" : ""}`}
            />
            {hatalar.soyad && <p className="demo-error-text">{hatalar.soyad}</p>}
          </div>
        </div>

        <div>
          <label className="demo-label">Rol / Unvan:</label>
          <input
            type="text"
            name="rol"
            value={form.rol}
            onChange={handleInputChange}
            placeholder="Örn: Jr. Full Stack Developer"
            className={`demo-input ${hatalar.rol ? "demo-input-error" : ""}`}
          />
          {hatalar.rol && <p className="demo-error-text">{hatalar.rol}</p>}
        </div>

        <div>
          <label className="demo-label">Departman:</label>
          <select
            name="departman"
            value={form.departman}
            onChange={handleInputChange}
            className="demo-select"
          >
            <option value="Yazılım">Yazılım</option>
            <option value="Tasarım">Tasarım</option>
            <option value="Yönetim">Yönetim</option>
            <option value="Pazarlama">Pazarlama</option>
            <option value="İnsan Kaynakları">İnsan Kaynakları</option>
          </select>
        </div>

        <div>
          <label className="demo-label">E-Posta:</label>
          <input
            type="email"
            name="eposta"
            value={form.eposta}
            onChange={handleInputChange}
            placeholder="ad.soyad@sirket.com"
            className={`demo-input ${hatalar.eposta ? "demo-input-error" : ""}`}
          />
          {hatalar.eposta && <p className="demo-error-text">{hatalar.eposta}</p>}
        </div>

        <div>
          <label className="demo-label">Telefon:</label>
          <input
            type="text"
            name="telefon"
            value={form.telefon}
            onChange={handleInputChange}
            placeholder="+90 5XX XXX XX XX"
            className="demo-input"
          />
        </div>

        <div className="demo-checkbox-group">
          <label className="demo-filter-checkbox-label">
            <input
              type="checkbox"
              name="aktif"
              checked={form.aktif}
              onChange={handleInputChange}
              className="todo-checkbox"
            />
            Aktif Çalışan
          </label>

          <label className="demo-filter-checkbox-label">
            <input
              type="checkbox"
              name="stajyer"
              checked={form.stajyer}
              onChange={handleInputChange}
              className="todo-checkbox"
            />
            Stajyer
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          {duzenlenenId && (
            <button
              type="button"
              onClick={iptalEt}
              className="btn-cancel-form"
            >
              Vazgeç
            </button>
          )}
          <button
            type="submit"
            className="btn-submit-form"
          >
            {duzenlenenId ? "Güncellemeyi Kaydet" : "Personel Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
};

const yedekPersoneller = [
  { id: 1, ad: "Görkem", soyad: "Kara", rol: "Team Leader", departman: "Yazılım", aktif: true, eposta: "gorkem.kara@sirket.com", telefon: "+90 533 123 4567", stajyer: false },
  { id: 2, ad: "Melis", soyad: "Kurt", rol: "Product Designer", departman: "Tasarım", aktif: true, eposta: "melis.kurt@sirket.com", telefon: "+90 535 765 4321", stajyer: false }
];

const Demo11Project = () => {
  const [personeller, setPersoneller] = useState([]);
  const [loading, setLoading] = useState(true);

  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliDepartman, setSeciliDepartman] = useState("Tümü");
  const [sadeceAktif, setSadeceAktif] = useState(false);
  const [sadeceStajyer, setSadeceStajyer] = useState(false);

  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    rol: "",
    departman: "Yazılım",
    eposta: "",
    telefon: "",
    aktif: true,
    stajyer: false
  });
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  useEffect(() => {
    fetch("/personeller.json")
      .then(res => {
        if (!res.ok) throw new Error("JSON veri alınamadı.");
        return res.json();
      })
      .then(data => {
        setPersoneller(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("JSON fetch hatası, yedek liste yüklendi:", err.message);
        setPersoneller(yedekPersoneller);
        setLoading(false);
      });
  }, []);

  const personelKaydet = () => {
    if (duzenlenenId) {
      setPersoneller(
        personeller.map(p => p.id === duzenlenenId ? { ...form, id: duzenlenenId } : p)
      );
      setDuzenlenenId(null);
    } else {
      const yeni = {
        ...form,
        id: Date.now()
      };
      setPersoneller([...personeller, yeni]);
    }

    setForm({
      ad: "",
      soyad: "",
      rol: "",
      departman: "Yazılım",
      eposta: "",
      telefon: "",
      aktif: true,
      stajyer: false
    });
  };

  const personelSil = (id) => {
    if (window.confirm("Bu personeli silmek istediğinize emin misiniz?")) {
      setPersoneller(personeller.filter(p => p.id !== id));
      if (duzenlenenId === id) {
        setDuzenlenenId(null);
        setForm({
          ad: "",
          soyad: "",
          rol: "",
          departman: "Yazılım",
          eposta: "",
          telefon: "",
          aktif: true,
          stajyer: false
        });
      }
    }
  };

  const personelDuzenleYukle = (p) => {
    setDuzenlenenId(p.id);
    setForm(p);
  };

  const duzenlemeIptal = () => {
    setDuzenlenenId(null);
    setForm({
      ad: "",
      soyad: "",
      rol: "",
      departman: "Yazılım",
      eposta: "",
      telefon: "",
      aktif: true,
      stajyer: false
    });
  };

  const personelAktiflikToggle = (id) => {
    setPersoneller(
      personeller.map(p => p.id === id ? { ...p, aktif: !p.aktif } : p)
    );
  };

  const filtrelenmisPersoneller = personeller.filter(p => {
    const adSoyadRol = `${p.ad} ${p.soyad} ${p.rol}`.toLowerCase();
    const aramaEslesiyor = adSoyadRol.includes(aramaMetni.toLowerCase());

    const departmanEslesiyor = seciliDepartman === "Tümü" || p.departman === seciliDepartman;
    const aktifEslesiyor = !sadeceAktif || p.aktif;
    const stajyerEslesiyor = !sadeceStajyer || p.stajyer;

    return aramaEslesiyor && departmanEslesiyor && aktifEslesiyor && stajyerEslesiyor;
  });

  if (loading) {
    return <div className="loading-indicator">Personel verileri yükleniyor...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="demo-title">Demo 11: Personel Kayıt ve Yönetim Paneli</h3>
      <p className="demo-desc">
        Bu kapsamlı gün sonu projesinde: <code>useState</code> ile nesne ve dizi yönetimi, kontrollü form girdileri, form doğrulama, dinamik arama, filtreleme, ekleme, silme ve düzenleme özelliklerini tek bir yapıda uyguluyoruz.
      </p>

      <div className="mt-6">
        <PersonelFiltre
          aramaMetni={aramaMetni}
          setAramaMetni={setAramaMetni}
          seciliDepartman={seciliDepartman}
          setSeciliDepartman={setSeciliDepartman}
          sadeceAktif={sadeceAktif}
          setSadeceAktif={setSadeceAktif}
          sadeceStajyer={sadeceStajyer}
          setSadeceStajyer={setSadeceStajyer}
        />
      </div>

      <div className="project-layout-grid">
        <div>
          <PersonelForm
            form={form}
            setForm={setForm}
            kaydet={personelKaydet}
            duzenlenenId={duzenlenenId}
            iptalEt={duzenlemeIptal}
          />
        </div>

        <div className="space-y-4">
          <h3 className="card-title-bordered">
            Kayıtlı Personel Listesi ({filtrelenmisPersoneller.length})
          </h3>

          {filtrelenmisPersoneller.length === 0 ? (
            <div className="empty-state-card">
              Eşleşen personel kaydı bulunamadı.
            </div>
          ) : (
            <div className="product-grid">
              {filtrelenmisPersoneller.map(p => (
                <PersonelKart
                  key={p.id}
                  personel={p}
                  sil={personelSil}
                  duzenle={personelDuzenleYukle}
                  aktiflikToggle={personelAktiflikToggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo11Project;