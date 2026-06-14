import React from 'react';

const Demo6ListRendering = () => {
  const dersler = [
    { id: 101, ad: "Matematik" },
    { id: 102, ad: "Fen Bilgisi" },
    { id: 103, ad: "Sosyal Bilgiler" },
    { id: 104, ad: "Ingilizce" }
  ];

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 6: Liste Listeleme ve Key Prop</h3>
      <p className="mt-2 text-gray-600">JavaScript map() metodunu kullanarak verileri listelemeyi ve key propunun kullanimini ogreniyoruz.</p>
      
      <div className="mt-4">
        <h4 className="font-bold">Ders Listesi:</h4>
        <ul className="list-disc pl-5">
          {dersler.map((ders) => (
            <li key={ders.id} className="p-1">
              {ders.ad} (ID: {ders.id})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Demo6ListRendering;
