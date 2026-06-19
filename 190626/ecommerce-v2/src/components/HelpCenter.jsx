import { useState } from "react";
import { FAQ_DATA } from "../productsMock";

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState(null);

  const handleToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <main className="help-container">
        <div className="faq-section">
          <h2 className="form-title">Sıkça Sorulan Sorular</h2>
          {FAQ_DATA.map((faq, index) => (
            <div
              key={index}
              className="faq-card"
              onClick={() => handleToggle(index)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="text-gray-400">
                  {activeFaq === index ? "-" : "+"}
                </span>
              </div>
              {activeFaq === index && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
        <div className="support-section">
          <h2 className="form-title">Destek Talebi Oluştur</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Adınız Soyadınız</label>
              <input
                className="form-input"
                placeholder="Örn: Ahmet Yılmaz"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="form-label">E-Posta Adresiniz</label>
              <input
                className="form-input"
                placeholder="ahmet@yilmaz.com"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mesajınız</label>
              <textarea
                className="form-textarea"
                placeholder="Talebinizi buraya detaylıca yazınız..."
              />
            </div>
            <button type="submit" className="form-submit">
              Talebi Gönder
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
