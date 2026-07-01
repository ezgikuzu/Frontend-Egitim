# Mini CRM Development Agenda

## 1. Proje Dokümanlarını Oku
- `project.md` dosyasını incele.
- `.agents/AGENTS.md` kurallarını oku.
- Geliştirme sırasında bu kurallara uygun ilerle.

## 2. Proje Kurulumu
- React + Vite projesini hazırla.
- Gerekli paketleri yükle:
  - react-router-dom
  - @reduxjs/toolkit
  - react-redux
  - axios
  - json-server
  - @mui/material
  - @emotion/react
  - @emotion/styled

## 3. Klasör Yapısı
- `src/pages`
- `src/components`
- `src/store`
- `src/hooks`
- `src/services`
- `src/routes`

## 4. JSON Server
- `db.json` dosyasını oluştur.
- Müşteri verilerini ekle.
- JSON Server ile fake API başlat.
- `/customers`, `/notes`, `/reports`, `/settings` endpointlerini kullan.

## 5. Redux Toolkit
- `store/index.js` dosyasını oluştur.
- `customersSlice.js` oluştur.
- `authSlice.js` oluştur.
- `uiSlice.js` oluştur.
- Async thunk işlemlerini ekle.

## 6. Sayfalar
- Login
- Dashboard
- Customers
- Reports
- Profile
- Settings

## 7. Müşteri Yönetimi
- Müşterileri listele.
- Yeni müşteri ekle.
- Müşteri düzenle.
- Müşteri sil.
- Müşteri arama ve filtreleme ekle.

## 8. Arayüz Tasarımı
- Material UI bileşenlerini kullan.
- Dashboard kartları hazırla.
- Customers sayfasında tablo yapısı kur.
- Light/Dark theme desteği ekle.

## 9. API Bağlantısı
- Axios instance oluştur.
- JSON Server endpointlerine istek at.
- Hata ve loading durumlarını Redux içinde yönet.

## 10. Antigravity Talimatları
- Kod yazmadan önce `AGENTS.md` kurallarını dikkate al.
- Redux slice oluştururken `redux-slice-generator/SKILL.md` yönergelerini takip et.
- Yeni sayfa veya bileşen oluştururken proje yapısına uygun isimlendirme kullan.

## 11. Test ve Kontrol
- Sayfa yönlendirmelerini kontrol et.
- CRUD işlemlerini test et.
- Responsive görünümü kontrol et.
- Hata mesajlarını test et.

## 12. Son Teslim
- Kodları düzenle.
- Kullanılmayan importları temizle.
- README veya proje açıklamasını güncelle.
- GitHub’a yükle.