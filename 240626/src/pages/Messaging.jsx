import React from 'react'

export default function Messaging() {
  return (
    <div className="tab-content messages-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Sistem İçi Mesajlaşma</h1>
          <p className="page-subtitle">Departmanlar ve teknik personel arası anlık koordinasyon.</p>
        </div>
      </div>

      <div className="chat-container">
        <div className="contact-sidebar">
          <div className="contact-search">
            <input type="text" placeholder="Personel ara..." className="form-input w-full" />
          </div>

          <div className="contact-list">
            <div className="contact-item contact-item-active">
              <div className="avatar-wrapper avatar-indigo">
                <span>AY</span>
                <span className="status-dot-active"></span>
              </div>
              <div className="flex-1">
                <div className="contact-meta-row">
                  <h4 className="contact-name">Ahmet Yılmaz</h4>
                  <span className="text-[9px] text-slate-400">10:42</span>
                </div>
                <p className="contact-preview">Yeni müşterinin sözleşmesini...</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="avatar-wrapper avatar-slate">
                <span>MH</span>
                <span className="status-dot-active"></span>
              </div>
              <div className="flex-1">
                <div className="contact-meta-row">
                  <h4 className="contact-name">Muhasebe Grubu</h4>
                  <span className="text-[9px] text-slate-400">Dün</span>
                </div>
                <p className="contact-preview">Haziran ayı faturaları hazırlandı.</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="avatar-wrapper avatar-orange">
                <span>TD</span>
                <span className="status-dot-offline"></span>
              </div>
              <div className="flex-1">
                <div className="contact-meta-row">
                  <h4 className="contact-name">Teknik Destek (Can)</h4>
                  <span className="text-[9px] text-slate-400">22 Haz</span>
                </div>
                <p className="contact-preview">Depodaki arızalı monitör kaydı...</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="avatar-wrapper avatar-blue">
                <span>SD</span>
                <span className="status-dot-offline"></span>
              </div>
              <div className="flex-1">
                <div className="contact-meta-row">
                  <h4 className="contact-name">Seda Demir (Satış)</h4>
                  <span className="text-[9px] text-slate-400">18 Haz</span>
                </div>
                <p className="contact-preview">Yeni ürünler ne zaman stoklara...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="message-area">
          <div className="chat-header">
            <div className="chat-user-row">
              <div className="avatar-wrapper avatar-indigo">
                <span>AY</span>
              </div>
              <div>
                <h4 className="contact-name">Ahmet Yılmaz</h4>
                <span className="active-status-bar">
                  <span className="active-status-dot"></span>
                  Anlık Aktif
                </span>
              </div>
            </div>
            <div>
              <button type="button" className="icon-btn">
                <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-thread">
            <div className="bubble-received">
              <p>Selam Selahaddin Bey, yeni eklediğimiz müşterimiz Yılmaz Mühendislik için teklif taslağı hazırlandı mı acaba?</p>
              <span className="chat-time text-slate-400">10:30</span>
            </div>

            <div className="bubble-sent">
              <p>Selamlar Ahmet Bey, evet taslağı hazırladım. Detayları ciro ve finans raporları sayfasından da görebilirsiniz. Fiyat teklifini PDF olarak çıkartıp size de iletiyorum şimdi.</p>
              <span className="chat-time text-indigo-200">10:35 ✓✓</span>
            </div>

            <div className="bubble-received">
              <p>Süper! Eline sağlık. Ayrıca teknik personel depodan yeni Macbook Pro ürünlerinin teslim alındığını bildirdi, stok girişini yaptık mı?</p>
              <span className="chat-time text-slate-400">10:40</span>
            </div>

            <div className="bubble-sent">
              <p>Evet, Macbook Pro 14" M3 stok girişleri Merkez Depo (Depo-A) raf B3 konumuna yapıldı. Bilgisayar kategorisinde 45 adet olarak güncellendi.</p>
              <span className="chat-time text-indigo-200">10:41 ✓✓</span>
            </div>

            <div className="bubble-received">
              <p>Harika, çok teşekkürler. Yeni müşterinin sözleşmesini imzalandığında buraya yükleyeceğim.</p>
              <span className="chat-time text-slate-400">10:42</span>
            </div>
          </div>

          <div className="chat-input-bar">
            <button type="button" className="icon-btn">
              📎
            </button>
            <input type="text" placeholder="Mesajınızı yazın..." className="form-input flex-1" defaultValue="Sözleşme taslağını bekliyorum." />
            <button type="button" className="btn-primary">Gönder</button>
          </div>
        </div>
      </div>
    </div>
  )
}
