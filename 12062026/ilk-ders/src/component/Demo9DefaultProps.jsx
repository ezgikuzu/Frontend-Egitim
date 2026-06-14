import React from 'react';

// Alt Bilesen (Modern Varsayilan Deger Atama)
const ProfilKarti = ({ isim = "Misafir Kullanici", rol = "Ziyaretci" }) => {
  return (
    <div className="card">
      <h4 className="font-bold">{isim}</h4>
      <p className="text-gray-500">Rol: {rol}</p>
    </div>
  );
};

// Ana Bilesen
const Demo9DefaultProps = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 9: Varsayilan (Default) Props</h3>
      <p className="mt-2 text-gray-600">Bilesene veri gonderilmediginde varsayilan parametre degerlerinin nasil calistigini ogreniyoruz.</p>
      
      <div className="product-grid">
        {/* Ad ve Rol Gonderilmis */}
        <ProfilKarti isim="Ahmet Yilmaz" rol="Yonetici" />
        
        {/* Sadece Ad Gonderilmis (Rol varsayilan olacak) */}
        <ProfilKarti isim="Elif Demir" />
        
        {/* Hicbir veri gonderilmemis (Hepsi varsayilan olacak) */}
        <ProfilKarti />
      </div>
    </div>
  );
};

export default Demo9DefaultProps;
