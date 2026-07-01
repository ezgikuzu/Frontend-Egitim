# RNA-seq Tool Sayfa Yapısı ve Veri Modeli

## 1. Sayfa Yapısı ve Yönlendirmeler

Projede sayfa geçişleri için **React Router** kullanılacaktır.

---

## `/login` - Login Sayfası

Kullanıcının sisteme giriş yaptığı sayfadır.

### Bileşenler

* Bootstrap form yapısı
* E-posta alanı
* Şifre alanı
* Giriş butonu
* Şifremi unuttum linki
* Alert ile hata mesajı

---

## `/dashboard` - Dashboard / Ana Sayfa

Kullanıcının giriş yaptıktan sonra karşılaşacağı ana paneldir.

### Bileşenler

* Toplam proje sayısı
* Toplam örnek sayısı
* Tamamlanan analiz sayısı
* Devam eden analiz sayısı
* Son oluşturulan projeler
* Bootstrap Card ile hızlı istatistik kartları
* Progress bar ile analiz durumu özeti
* Son raporlar

---

## `/projects` - RNA-seq Proje Yönetimi

Kullanıcının RNA-seq analiz projelerini görüntülediği ve yönettiği sayfadır.

### Bileşenler

* Bootstrap Table ile proje listesi
* Proje arama alanı
* Proje filtreleme
* Yeni proje oluşturma modalı
* Proje düzenleme modalı
* Proje silme butonu
* Proje durum badge'i
* Pagination

### Filtre Örnekleri

* Proje durumu
* Analiz tipi
* Oluşturulma tarihi
* Organizma
* Kullanılan referans genom

---

## `/projects/:id` - Proje Detay Sayfası

Seçili RNA-seq projesinin detaylarının görüntülendiği sayfadır.

### Bileşenler

* Proje genel bilgileri
* Örnek listesi
* Analiz adımları
* Kalite kontrol özeti
* Mapping / hizalama sonuçları
* Diferansiyel ekspresyon özeti
* Grafikler
* Notlar
* Rapor oluşturma butonu

---

## `/samples` - Örnek Yönetimi

RNA-seq analizinde kullanılan numunelerin yönetildiği sayfadır.

### Bileşenler

* Bootstrap Table ile örnek listesi
* Örnek arama alanı
* Örnek filtreleme
* Yeni örnek ekleme modalı
* Örnek düzenleme modalı
* Örnek silme butonu
* Pagination

### Filtre Örnekleri

* Kontrol grubu
* Deney grubu
* Doku tipi
* Organizma
* Kalite durumu
* Cinsiyet
* Yaş

---

## `/analysis` - Analiz Takip Sayfası

RNA-seq analiz adımlarının takip edildiği sayfadır.

### Bileşenler

* Bootstrap Card ile analiz adımları
* Progress bar ile işlem durumu
* Quality Control durumu
* Trimming durumu
* Alignment durumu
* Quantification durumu
* Differential Expression durumu
* Analiz başlatma butonu

### Analiz Adımları

```txt
Raw Data
Quality Control
Trimming
Alignment
Quantification
Differential Expression
Visualization
Report
```

---

## `/results` - Sonuçlar Sayfası

Analiz sonuçlarının tablo ve grafik olarak görüntülendiği sayfadır.

### Bileşenler

* Bootstrap Table ile diferansiyel gen ekspresyon tablosu
* Gen arama alanı
* Log2 fold change filtresi
* p-value filtresi
* adjusted p-value filtresi
* Upregulated genler
* Downregulated genler
* Volcano plot
* Heatmap
* PCA plot

---

## `/reports` - Raporlar Sayfası

Analiz raporlarının listelendiği ve görüntülendiği sayfadır.

### Bileşenler

* Bootstrap Card ile rapor listesi
* Rapor detay kartı
* Rapor oluşturma butonu
* Rapor indirme butonu
* Rapor tarihi
* Rapor durumu badge'i

---

## `/profile` - Profil Sayfası

Kullanıcının kendi bilgilerini görüntülediği ve güncellediği sayfadır.

### Bileşenler

* Profil bilgileri
* İletişim bilgileri
* Kurum bilgileri
* Bootstrap form ile profil güncelleme
* Şifre değiştirme formu

---

## `/settings` - Ayarlar Sayfası

Kullanıcının uygulama tercihlerini düzenlediği sayfadır.

### Bileşenler

* Dark mode açma / kapama
* Bildirim ayarları
* Grafik görünüm ayarları
* Varsayılan analiz parametreleri
* Oturumu kapatma butonu

---

# 2. Veri Modeli ve API Şeması

Projenin yerel API yapısı için **JSON Server** kullanılacaktır. Veriler `db.json` dosyası içerisinde tutulacaktır.

## Örnek `db.json`

```json
{
  "users": [
    {
      "id": "1",
      "name": "Ezgi Kuzu",
      "email": "ezgi@example.com",
      "password": "123456",
      "role": "researcher",
      "institution": "Biotechnology Lab"
    }
  ],
  "projects": [
    {
      "id": "1",
      "title": "GBM TRAIL RNA-seq Analizi",
      "description": "Glioblastoma hücrelerinde TRAIL yanıtına bağlı gen ekspresyon değişimlerinin analizi.",
      "organism": "Homo sapiens",
      "referenceGenome": "GRCh38",
      "analysisType": "Differential Expression",
      "status": "in_progress",
      "createdAt": "2026-07-15",
      "updatedAt": "2026-07-15"
    }
  ],
  "samples": [
    {
      "id": "1",
      "projectId": "1",
      "sampleName": "Control_1",
      "group": "Control",
      "tissue": "Cell Line",
      "condition": "Untreated",
      "replicate": 1,
      "qualityStatus": "passed",
      "fastqFile": "control_1.fastq.gz"
    },
    {
      "id": "2",
      "projectId": "1",
      "sampleName": "TRAIL_1",
      "group": "Treatment",
      "tissue": "Cell Line",
      "condition": "TRAIL",
      "replicate": 1,
      "qualityStatus": "passed",
      "fastqFile": "trail_1.fastq.gz"
    }
  ],
  "analysisSteps": [
    {
      "id": "1",
      "projectId": "1",
      "stepName": "Quality Control",
      "tool": "FastQC",
      "status": "completed",
      "startedAt": "2026-07-15",
      "completedAt": "2026-07-15"
    },
    {
      "id": "2",
      "projectId": "1",
      "stepName": "Alignment",
      "tool": "STAR",
      "status": "in_progress",
      "startedAt": "2026-07-15",
      "completedAt": null
    }
  ],
  "qualityControls": [
    {
      "id": "1",
      "sampleId": "1",
      "projectId": "1",
      "totalReads": 24500000,
      "gcContent": 51.2,
      "q30Rate": 92.4,
      "adapterContent": 0.8,
      "status": "passed"
    }
  ],
  "expressionResults": [
    {
      "id": "1",
      "projectId": "1",
      "geneId": "ENSG00000141510",
      "geneSymbol": "TP53",
      "baseMean": 1200.5,
      "log2FoldChange": 1.8,
      "pValue": 0.0004,
      "adjustedPValue": 0.002,
      "regulation": "upregulated"
    },
    {
      "id": "2",
      "projectId": "1",
      "geneId": "ENSG00000171862",
      "geneSymbol": "PTEN",
      "baseMean": 845.2,
      "log2FoldChange": -1.3,
      "pValue": 0.003,
      "adjustedPValue": 0.01,
      "regulation": "downregulated"
    }
  ],
  "reports": [
    {
      "id": "1",
      "projectId": "1",
      "title": "GBM TRAIL RNA-seq Raporu",
      "totalSamples": 2,
      "totalGenes": 18000,
      "significantGenes": 245,
      "upregulatedGenes": 130,
      "downregulatedGenes": 115,
      "createdAt": "2026-07-15"
    }
  ],
  "settings": {
    "darkMode": false,
    "notificationsEnabled": true,
    "defaultPValue": 0.05,
    "defaultLog2FoldChange": 1
  }
}
```

---

# 3. API Endpoint Şeması

## Users API

```txt
GET /users
POST /users
PATCH /users/:id
```

## Projects API

```txt
GET /projects
GET /projects/:id
POST /projects
PATCH /projects/:id
DELETE /projects/:id
```

## Samples API

```txt
GET /samples
GET /samples?projectId=:projectId
POST /samples
PATCH /samples/:id
DELETE /samples/:id
```

## Analysis Steps API

```txt
GET /analysisSteps
GET /analysisSteps?projectId=:projectId
POST /analysisSteps
PATCH /analysisSteps/:id
DELETE /analysisSteps/:id
```

## Quality Control API

```txt
GET /qualityControls
GET /qualityControls?projectId=:projectId
GET /qualityControls?sampleId=:sampleId
POST /qualityControls
PATCH /qualityControls/:id
DELETE /qualityControls/:id
```

## Expression Results API

```txt
GET /expressionResults
GET /expressionResults?projectId=:projectId
GET /expressionResults?geneSymbol=:geneSymbol
POST /expressionResults
PATCH /expressionResults/:id
DELETE /expressionResults/:id
```

## Reports API

```txt
GET /reports
GET /reports?projectId=:projectId
POST /reports
PATCH /reports/:id
DELETE /reports/:id
```

## Settings API

```txt
GET /settings
PATCH /settings
```
