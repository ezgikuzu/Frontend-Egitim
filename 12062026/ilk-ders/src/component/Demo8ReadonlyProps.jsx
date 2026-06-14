import React from 'react';

// Alt Bilesen
const DegistirilemeyenKart = (props) => {
  const deneVeHataGoster = () => {
    try {
      // Bu islem React tarafindan engellenir veya JavaScript hata firlatir.
      props.baslik = "Yeni Baslik";
    } catch (hata) {
      alert("Hata Yakalandi! Props degistirilemez: " + hata.message);
    }
  };

  return (
    <div className="card">
      <h4 className="font-bold">{props.baslik}</h4>
      <p className="text-gray-500">Gelen Prop Degeri: {props.baslik}</p>
      <button 
        onClick={deneVeHataGoster} 
        className="btn-red"
      >
        Prop Degistirmeyi Dene
      </button>
    </div>
  );
};

// Ana Bilesen
const Demo8ReadonlyProps = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 8: Salt Okunur (Readonly) Props</h3>
      <p className="mt-2 text-gray-600">Props (Ozellikler) tek yonlu veri akisi saglar ve dogrudan degistirilemez. Bu denemeyi yaparak bunu goruyoruz.</p>
      
      <div className="mt-4">
        <DegistirilemeyenKart baslik="Degistirilemeyen Baslik" />
      </div>
    </div>
  );
};

export default Demo8ReadonlyProps;
