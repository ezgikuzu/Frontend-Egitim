import React from 'react';

// Alt Bilesen (Urun Karti)
const UrunKarti = (props) => {
  return (
    <div className="card">
      <h4 className="font-bold">{props.ad}</h4>
      <p className="text-gray-600">Fiyat: {props.fiyat} TL</p>
      <p className="text-sm">
        Stokta: {props.stoktaVar ? "Var" : "Yok"}
      </p>
    </div>
  );
};

// Ana Bilesen
const Demo3PropsBasic = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 3: Props Kullanimi</h3>
      <p className="mt-2 text-gray-600">Ust bilesenden alt bilesene props (ozellik) kullanarak veri aktarmayi ogreniyoruz.</p>
      
      <div className="product-grid">
        <UrunKarti ad="Laptop" fiyat={15000} stoktaVar={true} />
        <UrunKarti ad="Telefon" fiyat={8000} stoktaVar={false} />
        <UrunKarti ad="Kulaklik" fiyat={1200} stoktaVar={true} />
      </div>
    </div>
  );
};

export default Demo3PropsBasic;
