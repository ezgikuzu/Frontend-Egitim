import React from 'react';

// Alt Bilesen (Child Component)
const Selamla = () => {
  return (
    <div className="p-3 border">
      <h4 className="font-bold">Merhaba Dunya!</h4>
      <p className="text-gray-500">Ben bir alt bilesenim. Beni istediginiz kadar cagirabilirsiniz.</p>
    </div>
  );
};

// Ana Bilesen (Parent Component)
const Demo2Component = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 2: Bilesen (Component) Yapisi</h3>
      <p className="mt-2 text-gray-600">Buyuk kodlari kucuk ve tekrar kullanilabilir parcalara bolmeyi ogreniyoruz.</p>
      
      <div className="mt-4">
        <Selamla />
        <Selamla />
        <Selamla />
      </div>
    </div>
  );
};

export default Demo2Component;
