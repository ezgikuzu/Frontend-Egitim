import React from 'react';

// Sarmalayici Kart Bileseni (Wrapper Component)
const Kart = (props) => {
  return (
    <div className="card">
      {props.children}
    </div>
  );
};

// Ana Bilesen
const Demo4PropsChildren = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 4: props.children Kullanimi</h3>
      <p className="mt-2 text-gray-600">Bilesenleri sarmalayici (wrapper) kutular olarak kullanip icerik yerlestirmeyi ogreniyoruz.</p>
      
      <div className="product-grid">
        <Kart>
          <h4 className="font-bold">Kart 1 Baslik</h4>
          <p className="text-sm">Bu birinci kartin icerik metnidir.</p>
        </Kart>
        
        <Kart>
          <h4 className="font-bold">Kart 2 Baslik</h4>
          <button className="btn-blue">Kart Butonu</button>
        </Kart>
      </div>
    </div>
  );
};

export default Demo4PropsChildren;
