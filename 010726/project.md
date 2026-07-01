## 1. Genel Proje Bilgileri
- **Proje Adı:** `mini CRM`
- **Kısa Açıklama:** `Mini CRM, müşteri bilgilerini yönetmek ve temel müşteri süreçlerini kolaylaştırmak amacıyla geliştirilmiş bir web uygulamasıdır. Kullanıcılar müşteri eklemei listelemei güncelleme ve silme işlemlerini gerçekleştirebilir. Proje, React, Redux toolkit ve Materyal Uı kullanılarak geliştirilmiştir. `
- **Hedef Kitle:** `küçük ve orta ölçekli işletmeler, satış ekipleri, müşteri ilişkileri yöneticileri ve müşteri bilgilerini düzenli bir şekilde takip etmek isteyen kullanıcılar için geliştirilmiştir. `

--

### Renk Paleti (Harmonious Palette)
Tasarımda doğrudan standart kırmızı/mavi kullanmak yerine modern HSL renklerini tercih edin.

- **Primary (Ana Renk - Örn. Marka Kimliği, Butonlar):**
  - HSL: `hsl(125, 85%, 56%)` (Güven Mavisi / Ana Renk)
  - Kullanım Alanı: Butonlar, aktif münü elemanları, odaklanan kartlar
- **Secondary (İkinci Renk - Örn. Accent, Vurgu):**
  - HSL: `hsl(173, 72%, 42%)` (Canlandırıcı Turkuaz)
  - Kullanım Alanı: Bildirimler, badge'ler, dikkat çekici etiketler.
- **Neutral Background (Arka Plan Renkleri):**
  - Light Mode: `hsl(0, 0%, 100%)` (Çok Açık Gri / Beyazımsı)
  - Dark Mode: `hsl(220, 15%, 13%)` (Koyu Lacivert)
- **Neutral Text (Yazı Renkleri):**
  - Light Mode: `hsl(217, 19%, 27%)` (Koyu Gri)
  - Dark Mode: `hsl(210, 40%, 98%)` (Beyaza yakın)
- **Semantic Colors (Durum Renkleri):**
  - Success (Başarı): `hsl(145, 63%, 43%)` (Yeşil)
  - Warning (Uyarı): `hsl(38, 92%, 50%)` (Amber Sarısı)
  - Error (Hata): `hsl(0, 72%, 51%)` (Kırmızı)
  - Info (Bilgi): ` hsl(203, 89%, 53%)` (Mavi)

### Tipografi ve Fontlar
- **Birincil Yazı Tipi:** `Poppins` veya `Inter` (Google Fonts'tan otomatik çekilecek)
- **Başlıklar (Headings):** `font-semibold` veya `font-bold`
- **Gövde Metni (Body):** `font-normal` ve `antialiased`

### UI Özellikleri ve Efektler
- **Glassmorphic Kartlar:** Arka planda `backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm` kullanımı.
- **Gölgeler (Shadows):** Butonlar ve kartlar için yumuşak gölgeler (`shadow-sm` `shadow-md` `shadow-lg`).
- **Mikro Etkileşimler:** `transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5` hover ve tıklama efektleri.

--

## 3. Sayfa Yapısı ve Yönlendirmeler (Page Routes)

Uygulamanızda yer alacak sayfaları ve bunların alt bileşenlerini listeleyin.

- **`/` (Login Sayfası):**
  - Bileşenler: Giriş Formu, e-posta ve şifre alanları, giriş butonu, "Şifremi Unuttum" linki.
- **`/` (Dashboard / Ana Sayfa):**
  - Bileşenler: Toplam müşteri sayısı, aktif müşteri sayısı, son eklenen müşteriler, hızlı istatistik kartları. 

- **`/customers` (Müşteri Yönetimi):**
  - Bileşenler: Müşteri listesi (Material UI DataGrid) , müşteri arama, müşteri filtreleme (Müşteri Grubu, Müşteri Durumu, Müşteri Yaşı, Müşteri Cinsiyeti), yeni müşteri ekleme modalı, müşteri düzenleme modalı, müşteri silme butonu, pagination.

- **`/profile` (Profil Sayfası):**
  - Bileşenler: Profil Bilgileri, İletişim Bilgileri, Adres Bilgileri, profil güncelleme, şifre değiştirme.

- **`/settings` (Ayarlar Sayfası):**
  - Bileşenler: Dark mode açma/kapama, profil bilgileri düzenleme formu, uygulama ayarları ve oturumu kapatma. 

  ## 4. Veri Modeli ve Veritabanı Şeması (`db.json`)

JSON Server kullanarak ayağa kaldıracağımız yerel API'nin veri yapısını burada tanımlayın.

```json
{
  "customers": [
    {
      "id": "1",
      "title": "Ayşe Demir",
      "company": "Demir Teknoloji",
      "email": "ayse@demirteknoloji.com",
      "phone": "0555 555 5555",
      "status": "active",
      "createAt": "2026-07-15",
    }
  ],
  "notes": [
    {
      "id": "1",
      "customerId": "1",
      "text": "İlk Görüşme Yapıldı",
      "date": "2026-07-15"
    }
  ],


  "reports":   [ {
    "id": "1",
    "title": "Aylık Müşteri Raporu",
    "totalCustomers": 1,
    "activeCustomers": 1,
    "passiveCustomers": 1, 
  } 

], 
"settings":{

    "darkMode": false, 
    "notificationsEnabled": true, 
} 
    
}

---

## 5. Global State Yönetimi (Redux Toolkit)

Uygulamada kullanılacak global slice (state) yapılarını ve içerdikleri anahtar değerleri listeleyin.

### 1. `customersSlice`
- **State Yapısı:**
  ```javascript
  {
    items: [], //Müşteri Listesi,
    currentCustomer: null, //Seçili Müşteri
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null //Hata Mesajı 
  }
  ```
- **Async Thunk Eylemleri (Actions):**
  - `fetchCustomers()` -> `GET /customers`.  //Tüm müşterileri getir
  - `addCustomer(customerData)` -> `POST /customers` //Yeni müşteri ekle
  - `updateCustomer({ id, data })` -> `PATCH /customers/:id` //Müşteri güncelle
  - `deleteCustomer(id)` -> `DELETE /customers/:id` // Müşteri sil 

### 2. `authSlice`
- **State Yapısı:**
  ```javascript
  {
    user: null, // Giriş yapan kullanıcı bilgisi
    token: null, // JWT token (opsiyonel)
    satatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null , // Hata Mesajı 
  }
  ```
- **Async Thunk Eylemleri:**
  - `login(credentials)`  -> POST `/auth/login. //giriş yap 
  -  `logout()` -> POST ` /auth/logut` //Çıkış yap 
  -  `fetchAuth()` -> GET `auth/me` //Giriş yapan kullanıcı bilgisini getir 
   
---

### 3.`uiSlice`
***State Yapısı:***

```javascript

{
    darkMode: false, // Temel ayar
    sidebarOpen: true, // Yan menü açık/kapalı durumu
    notifications: [] // Bildirim listesi
}```

**Reducers /Actions:**

- `toggleDarkMode()`
- `toogleSidebar()`
- `setNotifications(list)`
- `clearNotifications()`

---

## 6. Json Server ile veri Modeli ve API Şeması ('db.json')

JSON server kullanılarak aşağıdaki veri modeli oluşturulacaktır:

```json

{
    "customers:" [],  //müşteriler 
    "notes:" [],  //notlar
    "deals:" [], //anlaşmalar
    "tasks:" [],  //tasks
    "users:" [],  //kullanıcılar
    "settings:" { //uygulama ayarları
        "darkMode": false,
        "notificationsEnabled" true, 
    } 
}
