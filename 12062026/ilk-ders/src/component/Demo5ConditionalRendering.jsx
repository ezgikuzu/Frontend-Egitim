import React from 'react';

// Bilesenler
const UrunKutusu = (props) => {
  return (
    <div className="card">
      <h4 className="font-bold">{props.ad}</h4>
      
      <div className="mt-2">
        {/* Ternary ile Kosullu Render */}
        {props.stokAdedi > 0 ? (
          <span className="badge-success">Stokta Var ({props.stokAdedi} adet)</span>
        ) : (
          <span className="badge-danger">Stokta Yok - Tukendi</span>
        )}
      </div>

      <div className="mt-2">
        {/* && ile Kosullu Render */}
        {props.indirimdeMi && (
          <span className="badge-danger">Kampanyali Urun</span>
        )}
      </div>
    </div>
  );
};

// Ana Bilesen
const Demo5ConditionalRendering = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 5: Kosullu Render</h3>
      <p className="mt-2 text-gray-600">Kosullara gore ekranda farkli HTML/JSX yapilarini gostermeyi ogreniyoruz.</p>
      
      <div className="product-grid">
        <UrunKutusu ad="Televizyon" stokAdedi={5} indirimdeMi={true} />
        <UrunKutusu ad="Mikrodalga" stokAdedi={0} indirimdeMi={false} />
        <UrunKutusu ad="Firin" stokAdedi={2} indirimdeMi={false} />
      </div>
    </div>
  );
};

export default Demo5ConditionalRendering;
