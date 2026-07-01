# RNA-seq Tool Redux, Bootstrap ve Klasör Yapısı

## 1. Global State Yönetimi

Projede global state yönetimi için **Redux Toolkit** kullanılacaktır.

Redux Toolkit sayesinde API'den veri çekme, veri ekleme, veri güncelleme ve veri silme işlemleri daha düzenli şekilde yönetilecektir.

---

# 2. Redux Slice Yapıları

Projede aşağıdaki slice yapıları kullanılacaktır:

```txt
authSlice
projectsSlice
samplesSlice
analysisSlice
resultsSlice
uiSlice
```

---

## 2.1 `projectsSlice`

RNA-seq projelerinin yönetildiği slice yapısıdır.

### State Yapısı

```javascript
{
  items: [],
  currentProject: null,
  status: "idle",
  error: null
}
```

### Açıklama

```javascript
items: [] // Proje listesi
currentProject: null // Seçili proje
status: "idle" // "idle" | "loading" | "succeeded" | "failed"
error: null // Hata mesajı
```

### Async Thunk Actions

```javascript
fetchProjects()
addProject(projectData)
updateProject({ id, data })
deleteProject(id)
```

### API Karşılıkları

```txt
GET /projects
POST /projects
PATCH /projects/:id
DELETE /projects/:id
```

---

## 2.2 `samplesSlice`

RNA-seq örneklerinin yönetildiği slice yapısıdır.

### State Yapısı

```javascript
{
  items: [],
  selectedSample: null,
  status: "idle",
  error: null
}
```

### Açıklama

```javascript
items: [] // Örnek listesi
selectedSample: null // Seçili örnek
status: "idle" // "idle" | "loading" | "succeeded" | "failed"
error: null // Hata mesajı
```

### Async Thunk Actions

```javascript
fetchSamples()
fetchSamplesByProject(projectId)
addSample(sampleData)
updateSample({ id, data })
deleteSample(id)
```

### API Karşılıkları

```txt
GET /samples
GET /samples?projectId=:projectId
POST /samples
PATCH /samples/:id
DELETE /samples/:id
```

---

## 2.3 `analysisSlice`

Analiz adımlarının yönetildiği slice yapısıdır.

### State Yapısı

```javascript
{
  steps: [],
  currentStep: null,
  pipelineStatus: "idle",
  status: "idle",
  error: null
}
```

### Açıklama

```javascript
steps: [] // Analiz adımları
currentStep: null // Aktif analiz adımı
pipelineStatus: "idle" // Pipeline genel durumu
status: "idle" // API istek durumu
error: null // Hata mesajı
```

### Async Thunk Actions

```javascript
fetchAnalysisSteps(projectId)
updateAnalysisStep({ id, data })
```

### API Karşılıkları

```txt
GET /analysisSteps?projectId=:projectId
PATCH /analysisSteps/:id
```

---

## 2.4 `resultsSlice`

RNA-seq analiz sonuçlarının yönetildiği slice yapısıdır.

### State Yapısı

```javascript
{
  expressionResults: [],
  selectedGene: null,
  filters: {
    search: "",
    pValue: 0.05,
    log2FoldChange: 1,
    regulation: "all"
  },
  status: "idle",
  error: null
}
```

### Açıklama

```javascript
expressionResults: [] // Gen ekspresyon sonuçları
selectedGene: null // Seçili gen
filters: {} // Sonuç filtreleri
status: "idle" // API istek durumu
error: null // Hata mesajı
```

### Async Thunk Actions

```javascript
fetchExpressionResults(projectId)
fetchGeneResult(geneSymbol)
```

### API Karşılıkları

```txt
GET /expressionResults?projectId=:projectId
GET /expressionResults?geneSymbol=:geneSymbol
```

### Reducers / Actions

```javascript
setSearchFilter(value)
setPValueFilter(value)
setLog2FoldChangeFilter(value)
setRegulationFilter(value)
clearResultFilters()
setSelectedGene(gene)
```

---

## 2.5 `authSlice`

Kullanıcı giriş ve çıkış işlemlerinin yönetildiği slice yapısıdır.

### State Yapısı

```javascript
{
  user: null,
  token: null,
  status: "idle",
  error: null
}
```

### Açıklama

```javascript
user: null // Giriş yapan kullanıcı bilgisi
token: null // Token bilgisi, opsiyonel
status: "idle" // "idle" | "loading" | "succeeded" | "failed"
error: null // Hata mesajı
```

### Async Thunk Actions

```javascript
login(credentials)
logout()
fetchAuth()
```

Not: JSON Server gerçek JWT yapısı sağlamadığı için auth işlemleri proje seviyesinde simüle edilebilir. Kullanıcı bilgisi `localStorage` içinde tutulabilir.

---

## 2.6 `uiSlice`

Arayüz durumlarının yönetildiği slice yapısıdır.

### State Yapısı

```javascript
{
  darkMode: false,
  sidebarOpen: true,
  notifications: []
}
```

### Açıklama

```javascript
darkMode: false // Tema modu
sidebarOpen: true // Sidebar açık / kapalı durumu
notifications: [] // Bildirim listesi
```

### Reducers / Actions

```javascript
toggleDarkMode()
toggleSidebar()
setNotifications(list)
clearNotifications()
```

---

# 3. Bootstrap Kullanımı

Projede arayüz geliştirme için **Bootstrap** ve **React-Bootstrap** kullanılacaktır.

## Bootstrap Kurulum Komutu

```bash
npm install bootstrap react-bootstrap
```

## Bootstrap CSS Import

`main.jsx` dosyasında Bootstrap CSS dosyası import edilmelidir.

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
```

Örnek `main.jsx`:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Kullanılabilecek Bootstrap Componentleri

```txt
Container
Row
Col
Card
Button
Form
Table
Modal
Badge
Navbar
Offcanvas
Alert
ProgressBar
Dropdown
Pagination
```

## Örnek Bootstrap Card

```jsx
import Card from "react-bootstrap/Card";

function StatsCard() {
  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body>
        <Card.Title>Toplam Proje</Card.Title>
        <Card.Text>12</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default StatsCard;
```

## Örnek Bootstrap Table

```jsx
import Table from "react-bootstrap/Table";

function ProjectTable() {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Proje Adı</th>
          <th>Organizma</th>
          <th>Durum</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GBM TRAIL RNA-seq Analizi</td>
          <td>Homo sapiens</td>
          <td>Devam Ediyor</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ProjectTable;
```

---

# 4. Proje Klasör Yapısı

RNA-seq Tool için önerilen React klasör yapısı aşağıdaki gibidir.

```txt
src/
├── app/
│   └── store.js
│
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   │
│   ├── projects/
│   │   └── projectsSlice.js
│   │
│   ├── samples/
│   │   └── samplesSlice.js
│   │
│   ├── analysis/
│   │   └── analysisSlice.js
│   │
│   ├── results/
│   │   └── resultsSlice.js
│   │
│   └── ui/
│       └── uiSlice.js
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx
│   ├── Samples.jsx
│   ├── Analysis.jsx
│   ├── Results.jsx
│   ├── Reports.jsx
│   ├── Profile.jsx
│   └── Settings.jsx
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   │
│   ├── dashboard/
│   │   ├── StatsCard.jsx
│   │   ├── RecentProjects.jsx
│   │   └── AnalysisSummary.jsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectForm.jsx
│   │   └── ProjectModal.jsx
│   │
│   ├── samples/
│   │   ├── SampleTable.jsx
│   │   ├── SampleForm.jsx
│   │   └── SampleModal.jsx
│   │
│   ├── analysis/
│   │   ├── PipelineStepper.jsx
│   │   ├── AnalysisStepCard.jsx
│   │   └── QualityControlCard.jsx
│   │
│   ├── results/
│   │   ├── ExpressionTable.jsx
│   │   ├── VolcanoPlot.jsx
│   │   ├── HeatmapChart.jsx
│   │   └── PcaPlot.jsx
│   │
│   └── common/
│       ├── PageHeader.jsx
│       ├── Loading.jsx
│       ├── ErrorMessage.jsx
│       └── EmptyState.jsx
│
├── services/
│   └── api.js
│
├── utils/
│   ├── formatters.js
│   └── filters.js
│
├── data/
│   └── mockChartData.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 5. Klasör Açıklamaları

## `app/`

Redux store dosyasının bulunduğu klasördür.

## `features/`

Redux Toolkit slice dosyaları burada tutulur.

## `pages/`

Route ile açılan ana sayfalar burada bulunur.

## `components/`

Sayfalarda kullanılan tekrar kullanılabilir bileşenler burada tutulur.

## `services/`

API isteklerinin yönetildiği dosyalar burada bulunur.

## `utils/`

Formatlama, filtreleme ve yardımcı fonksiyonlar burada tutulur.

## `data/`

Grafikler veya test ekranları için kullanılacak mock veriler burada bulunur.
