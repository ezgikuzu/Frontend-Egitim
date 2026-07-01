# RNA-seq Tool Proje Tanıtımı

## 1. Genel Proje Bilgileri

### Proje Adı

`RNA-seq Tool`

### Kısa Açıklama

RNA-seq Tool, RNA dizileme verilerinin analiz süreçlerini daha düzenli, anlaşılır ve kullanıcı dostu hale getirmek amacıyla geliştirilecek bir web uygulamasıdır.

Bu uygulama sayesinde kullanıcılar RNA-seq analiz projeleri oluşturabilir, örnek bilgilerini sisteme ekleyebilir, analiz adımlarını takip edebilir, kalite kontrol sonuçlarını görüntüleyebilir, diferansiyel gen ekspresyon analiz sonuçlarını inceleyebilir ve analiz raporlarını düzenli şekilde yönetebilir.

Proje; **React**, **Redux Toolkit**, **React Router**, **Bootstrap**, **React-Bootstrap**, **JSON Server** ve grafik kütüphaneleri kullanılarak geliştirilecektir.

---

## 2. Projenin Amacı

Bu projenin temel amacı, RNA-seq analiz sürecinde kullanılan proje, örnek, analiz ve sonuç verilerini tek bir panel üzerinden yönetilebilir hale getirmektir.

RNA-seq analizlerinde birçok farklı adım bulunur. Bu adımlar genellikle kalite kontrol, hizalama, gen sayımı, diferansiyel ekspresyon analizi ve sonuç görselleştirme şeklinde ilerler.

RNA-seq Tool, bu süreci web arayüzü üzerinden daha anlaşılır hale getirmeyi amaçlar.

Kullanıcı sistem üzerinden:

* RNA-seq projesi oluşturabilir.
* Projeye bağlı örnekler ekleyebilir.
* Analiz adımlarının durumunu takip edebilir.
* Kalite kontrol sonuçlarını görüntüleyebilir.
* Diferansiyel ekspresyon sonuçlarını tablo halinde inceleyebilir.
* Volcano plot, heatmap ve PCA gibi grafiklerle sonuçları değerlendirebilir.
* Analiz raporu oluşturabilir.

---

## 3. Hedef Kitle

RNA-seq Tool aşağıdaki kullanıcı grupları için geliştirilecektir:

* Biyoloji öğrencileri
* Biyoteknoloji öğrencileri
* Moleküler biyoloji ve genetik öğrencileri
* Biyoinformatik alanında çalışan araştırmacılar
* Yüksek lisans ve doktora öğrencileri
* Laboratuvar ekipleri
* RNA-seq analiz sürecini görsel olarak takip etmek isteyen kullanıcılar

---

## 4. Kullanılacak Teknolojiler

Projede kullanılacak temel teknolojiler şunlardır:

```txt
React
React Router
Redux Toolkit
Bootstrap
React-Bootstrap
JSON Server
Axios veya Fetch API
LocalStorage
Chart.js veya Recharts
CSS
```

---

## 5. Proje Özellikleri

RNA-seq Tool içerisinde bulunması planlanan temel özellikler:

* Kullanıcı giriş ekranı
* Dashboard / analiz özeti
* RNA-seq proje yönetimi
* Numune / örnek yönetimi
* Analiz adımları takibi
* Kalite kontrol sonuçları
* Gen ekspresyon tablosu
* Diferansiyel ekspresyon sonuçları
* Grafikler
* Raporlama
* Profil sayfası
* Ayarlar sayfası
* Dark mode desteği

---

## 6. Temel Kullanıcı Akışı

Kullanıcı uygulamaya giriş ekranı üzerinden giriş yapar. Giriş başarılı olursa dashboard sayfasına yönlendirilir.

Dashboard ekranında toplam proje sayısı, toplam örnek sayısı, tamamlanan analizler ve devam eden analizler görüntülenir.

Kullanıcı daha sonra proje yönetimi sayfasından yeni bir RNA-seq projesi oluşturabilir. Oluşturduğu projeye örnek bilgileri ekleyebilir.

Analiz sayfasında kalite kontrol, hizalama, sayım ve diferansiyel ekspresyon gibi adımları takip edebilir.

Sonuçlar sayfasında gen ekspresyon sonuçlarını tablo ve grafikler üzerinden inceleyebilir.

Raporlar sayfasında analiz sonucuna ait özet raporları görüntüleyebilir.

---

## 7. Projenin Öğrenme Katkısı

Bu proje sayesinde aşağıdaki konular pekiştirilecektir:

* React component yapısı
* React Router ile sayfa yönlendirme
* Redux Toolkit ile global state yönetimi
* Async thunk ile API işlemleri
* JSON Server ile sahte backend kullanımı
* Bootstrap ile responsive arayüz geliştirme
* Tablo, modal, form ve kart yapıları oluşturma
* Grafiklerle veri görselleştirme
* Biyoinformatik verileri frontend arayüzünde temsil etme

---

## 8. Projenin Kapsamı

Bu proje gerçek RNA-seq analizi yapan bir backend sistemi yerine, RNA-seq analiz sürecini simüle eden bir frontend uygulaması olarak geliştirilecektir.

JSON Server üzerinden proje, örnek, analiz adımı ve sonuç verileri yönetilecektir.

Amaç, gerçek biyoinformatik pipeline çalıştırmak değil; RNA-seq analiz sürecini kullanıcı dostu bir arayüzle temsil etmektir.
