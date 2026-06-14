import React from 'react';

// Bilesenler
const SayfaBasligi = () => {
  return (
    <header className="p-4 bg-gray-200">
      <h4 className="text-lg font-bold">Uygulama Ust Basligi</h4>
    </header>
  );
};

const SayfaIcerigi = () => {
  return (
    <main className="p-4 border">
      <p>Burasi sayfanin ana icerik alanidir. Kompozisyon yapisi ile tasarlandi.</p>
    </main>
  );
};

const SayfaAlti = () => {
  return (
    <footer className="p-3 bg-gray-100">
      <p className="text-xs text-gray-500">Tum Haklari Saklidir (C) 2026</p>
    </footer>
  );
};

// Ana Bilesen
const Demo10Composition = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 10: Bilesen Kompozisyonu</h3>
      <p className="mt-2 text-gray-600">Farkli kucuk bilesenleri birlestirerek tam bir sayfa duzeni (layout) olusturuyoruz.</p>
      
      <div className="mt-4 border">
        <SayfaBasligi />
        <SayfaIcerigi />
        <SayfaAlti />
      </div>
    </div>
  );
};

export default Demo10Composition;
