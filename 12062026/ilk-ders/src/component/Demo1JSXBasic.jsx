import React from 'react';

const Demo1JSXBasic = () => {
  const dersAdi = "React ve JSX Temelleri";
  const ogrenciSayisi = 24;
  const aktifMi = true;
  const dersYili = 2026;

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 1: Temel JSX Kullanimi</h3>
      <p className="mt-2 text-gray-600">Bu bolumde degiskenleri ve JavaScript ifadelerini JSX icinde nasil gosterecegimizi ogreniyoruz.</p>
      
      <div className="mt-4">
        <p className="border-b"><strong>Ders Adi:</strong> {dersAdi}</p>
        <p className="border-b"><strong>Ogrenci Sayisi:</strong> {ogrenciSayisi}</p>
        <p className="border-b"><strong>Ders Yili:</strong> {dersYili}</p>
        <p className="border-b"><strong>Matematiksel Islem (2 + 2):</strong> {2 + 2}</p>
        <p className="border-b"><strong>Metin Donusturme:</strong> {dersAdi.toUpperCase()}</p>
        <p className="border-b"><strong>Ders Durumu:</strong> {aktifMi ? "Aktif" : "Pasif"}</p>
      </div>
    </div>
  );
};

export default Demo1JSXBasic;
