import React from 'react';

const Demo7EventHandling = () => {
  const butonaTiklandi = (mesaj) => {
    alert(mesaj);
  };

  const formGonder = (event) => {
    event.preventDefault();
    alert("Form gonderildi, sayfa yenilenmedi!");
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Demo 7: Olay Yonetimi</h3>
      <p className="mt-2 text-gray-600">React onClick ve onSubmit gibi olaylari nasil dinledigimizi ogreniyoruz.</p>
      
      <div className="mt-4">
        <h4 className="font-bold">Buton Tiklama Olaylari</h4>
        <div className="flex flex-col">
          <button 
            onClick={() => butonaTiklandi("Basit tiklama!")} 
            className="p-2 bg-blue-500"
          >
            Tikla - Mesaj Ver
          </button>
          
          <button 
            onClick={() => butonaTiklandi("Parametreli tiklama yapildi!")} 
            className="p-2 bg-green-500"
          >
            Parametreli Tiklama
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-bold">Form Olayi (Submit)</h4>
        <form onSubmit={formGonder} className="p-4 border">
          <input 
            type="text" 
            placeholder="Metin girin..." 
            className="p-2 border" 
          />
          <button type="submit" className="p-2 bg-purple-500">
            Formu Gonder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Demo7EventHandling;
