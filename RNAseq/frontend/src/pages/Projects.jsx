import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProjects, createProject, deleteProject } from "../store/projectSlice";
import { createSample } from "../store/sampleSlice";
import { Modal, Button, Form, ProgressBar } from "react-bootstrap";
import {
  Search, Plus, Trash2, ExternalLink, Calendar,
  ChevronRight, ChevronLeft, Upload, CheckCircle,
  XCircle, Loader2, Dna, FileUp
} from "lucide-react";

// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────
const emptyRow = () => ({
  id: Date.now() + Math.random(),   // temp local id
  sampleName: "",
  group: "Control",
  tissue: "Cell Line",
  condition: "",
  replicate: 1,
  file: null,           // File object from <input>
  uploadStatus: "idle", // idle | uploading | done | error
  qc: null,
  error: null,
});

export const Projects = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { projects, loading } = useSelector((state) => state.projects);

  const [searchTerm, setSearchTerm]         = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ── Step state ──────────────────────────────
  const [step, setStep] = useState(1);

  // Step 1 — project fields
  const [title,           setTitle]           = useState("");
  const [description,     setDescription]     = useState("");
  const [organism,        setOrganism]        = useState("Homo sapiens");
  const [referenceGenome, setReferenceGenome] = useState("GRCh38");
  const [analysisType,    setAnalysisType]    = useState("Differential Expression");

  // Step 2 — sample rows
  const [sampleRows, setSampleRows] = useState([emptyRow(), emptyRow()]);

  // Overall submission state
  const [submitting,      setSubmitting]      = useState(false);
  const [submitProgress,  setSubmitProgress]  = useState(0);  // 0-100
  const [submitMsg,       setSubmitMsg]       = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // ── Modal helpers ────────────────────────────
  const openModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setStep(1);
    setTitle(""); setDescription("");
    setOrganism("Homo sapiens"); setReferenceGenome("GRCh38");
    setAnalysisType("Differential Expression");
    setSampleRows([emptyRow(), emptyRow()]);
    setSubmitting(false); setSubmitProgress(0); setSubmitMsg("");
  };

  const closeModal = () => {
    if (submitting) return;
    setShowCreateModal(false);
    setTimeout(resetForm, 300);
  };

  // ── Step 2 row CRUD ──────────────────────────
  const addRow = () => setSampleRows(rows => [...rows, emptyRow()]);

  const removeRow = (localId) =>
    setSampleRows(rows => rows.filter(r => r.id !== localId));

  const updateRow = (localId, field, value) =>
    setSampleRows(rows => rows.map(r => r.id === localId ? { ...r, [field]: value } : r));

  const handleFileSelect = (localId, file) => {
    setSampleRows(rows =>
      rows.map(r => r.id === localId ? { ...r, file, uploadStatus: "idle", qc: null, error: null } : r)
    );
  };

  // ── Main submit ──────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const validSamples = sampleRows.filter(r => r.sampleName.trim());
    if (validSamples.length === 0) {
      alert("En az bir örnek adı giriniz.");
      return;
    }

    setSubmitting(true);
    setSubmitProgress(5);
    setSubmitMsg("Proje oluşturuluyor...");

    try {
      // 1. Create project
      const projResult = await dispatch(createProject({
        title, description, organism, referenceGenome, analysisType
      })).unwrap();

      const projectId = projResult.id;
      setSubmitProgress(20);

      // 2. Create samples + upload FASTQ files
      const total = validSamples.length;
      for (let i = 0; i < total; i++) {
        const row = validSamples[i];
        setSubmitMsg(`Örnek oluşturuluyor: ${row.sampleName} (${i + 1}/${total})`);

        const sampleResult = await dispatch(createSample({
          projectId,
          sampleName: row.sampleName.trim(),
          group:      row.group,
          tissue:     row.tissue,
          condition:  row.condition || (row.group === "Control" ? "Untreated" : "Treated"),
          replicate:  parseInt(row.replicate),
          fastqFile:  row.file ? row.file.name : `${row.sampleName.toLowerCase()}.fastq.gz`,
        })).unwrap();

        const sampleId = sampleResult.id;

        // 3. Upload FASTQ if a file was selected
        if (row.file) {
          setSubmitMsg(`FASTQ yükleniyor: ${row.file.name}`);
          setSampleRows(prev =>
            prev.map(r => r.id === row.id ? { ...r, uploadStatus: "uploading" } : r)
          );

          const formData = new FormData();
          formData.append("file", row.file);

          try {
            const res = await fetch(
              `http://localhost:8000/samples/${sampleId}/upload-fastq`,
              { method: "POST", body: formData }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Yükleme hatası");

            setSampleRows(prev =>
              prev.map(r =>
                r.id === row.id
                  ? { ...r, uploadStatus: "done", qc: data.qc }
                  : r
              )
            );
          } catch (uploadErr) {
            setSampleRows(prev =>
              prev.map(r =>
                r.id === row.id
                  ? { ...r, uploadStatus: "error", error: uploadErr.message }
                  : r
              )
            );
          }
        }

        setSubmitProgress(20 + Math.round(((i + 1) / total) * 75));
      }

      setSubmitProgress(100);
      setSubmitMsg("Tamamlandı! Proje sayfasına yönlendiriliyorsunuz...");
      await new Promise(r => setTimeout(r, 1000));

      setShowCreateModal(false);
      navigate(`/projects/${projectId}`);

    } catch (err) {
      setSubmitMsg(`Hata: ${err || "Proje oluşturulamadı."}`);
      setSubmitting(false);
    }
  };

  // ── Misc ─────────────────────────────────────
  const handleDelete = (id, title) => {
    if (window.confirm(`"${title}" projesini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) {
      dispatch(deleteProject(id));
    }
  };

  const filteredProjects = (Array.isArray(projects) ? projects : []).filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.organism?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":   return <span className="badge bg-success-subtle text-success">Tamamlandı</span>;
      case "in_progress": return <span className="badge bg-primary-subtle text-primary">Analiz Ediliyor</span>;
      case "failed":      return <span className="badge bg-danger-subtle text-danger">Hata</span>;
      default:            return <span className="badge bg-secondary-subtle text-secondary">Oluşturuldu</span>;
    }
  };

  // ── Derived ──────────────────────────────────
  const step1Valid = title.trim().length > 0;
  const step2Valid = sampleRows.some(r => r.sampleName.trim().length > 0);

  // ─────────────────────────────────────────────
  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">RNA-seq Projeleri</h2>
          <p className="text-muted mb-0">Tüm projelerinizi görüntüleyin, yönetin ve analizlerini başlatın.</p>
        </div>
        <button onClick={openModal} className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Yeni Proje Oluştur
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Proje adı veya organizma ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 text-md-end text-muted" style={{ fontSize: "0.85rem" }}>
              Toplam {filteredProjects.length} proje listelendi.
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-5 card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="text-muted mb-3">Gösterilecek proje bulunamadı.</h5>
            <button className="btn btn-outline-primary" onClick={openModal}>
              İlk Projenizi Oluşturun
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProjects.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-xxl-4">
              <div className="card border-0 shadow-sm h-100 d-flex flex-column">
                <div className="card-body p-4 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: "80%" }}>{p.title}</h5>
                    {getStatusBadge(p.status)}
                  </div>
                  <p className="card-text text-muted" style={{ fontSize: "0.88rem", height: "3.6rem", overflow: "hidden" }}>
                    {p.description || "Açıklama girilmemiş."}
                  </p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge bg-light text-dark border">{p.organism}</span>
                    <span className="badge bg-light text-dark border">{p.referenceGenome}</span>
                    <span className="badge bg-light text-dark border">{p.analysisType}</span>
                  </div>
                  <div className="d-flex align-items-center text-muted" style={{ fontSize: "0.75rem" }}>
                    <Calendar size={14} className="me-1" />
                    <span>Oluşturulma: {p.createdAt ? p.createdAt.split("T")[0] : "Bilinmiyor"}</span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top-0 p-4 pt-0 d-flex gap-2">
                  <Link
                    to={`/projects/${p.id}`}
                    className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                  >
                    <ExternalLink size={16} /> Detay ve Yönetim
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                    style={{ width: "40px" }}
                    title="Proje Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════
          Create Project Modal — 2-step stepper
      ══════════════════════════════════════════ */}
      <Modal
        show={showCreateModal}
        onHide={closeModal}
        centered
        size="lg"
        backdrop={submitting ? "static" : true}
        keyboard={!submitting}
      >
        <Form onSubmit={handleSubmit}>
          {/* Header with step indicator */}
          <Modal.Header closeButton={!submitting}>
            <div className="w-100">
              <Modal.Title className="fw-bold mb-3">Yeni Proje Oluştur</Modal.Title>
              {/* Stepper indicator */}
              <div className="d-flex align-items-center gap-2">
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle fw-bold`}
                  style={{
                    width: 28, height: 28, fontSize: "0.8rem",
                    background: step >= 1 ? "var(--bs-primary)" : "#dee2e6",
                    color: step >= 1 ? "#fff" : "#6c757d"
                  }}
                >1</div>
                <span className="fw-semibold" style={{ fontSize: "0.85rem", color: step === 1 ? "var(--bs-primary)" : "#6c757d" }}>
                  Proje Bilgileri
                </span>
                <div style={{ flex: 1, height: 2, background: step >= 2 ? "var(--bs-primary)" : "#dee2e6", borderRadius: 2 }} />
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                  style={{
                    width: 28, height: 28, fontSize: "0.8rem",
                    background: step >= 2 ? "var(--bs-primary)" : "#dee2e6",
                    color: step >= 2 ? "#fff" : "#6c757d"
                  }}
                >2</div>
                <span className="fw-semibold" style={{ fontSize: "0.85rem", color: step === 2 ? "var(--bs-primary)" : "#6c757d" }}>
                  Örnek ve FASTQ
                </span>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body>
            {/* ── STEP 1: Project metadata ── */}
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Proje Başlığı <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Örn: Glioblastoma Hücrelerinde İlaç Direnci"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Açıklama</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Projenin amacını, veri kümesini ve hedeflerini kısaca açıklayın..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Organizma</Form.Label>
                      <Form.Select value={organism} onChange={(e) => {
                        setOrganism(e.target.value);
                        setReferenceGenome(
                          e.target.value === "Homo sapiens" ? "GRCh38" :
                          e.target.value === "Mus musculus" ? "GRCm39" : "Custom"
                        );
                      }}>
                        <option value="Homo sapiens">Homo sapiens (İnsan)</option>
                        <option value="Mus musculus">Mus musculus (Fare)</option>
                        <option value="Drosophila melanogaster">Drosophila melanogaster</option>
                        <option value="Saccharomyces cerevisiae">Saccharomyces cerevisiae</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Referans Genom</Form.Label>
                      <Form.Select value={referenceGenome} onChange={(e) => setReferenceGenome(e.target.value)}>
                        {organism === "Homo sapiens" ? (
                          <>
                            <option value="GRCh38">GRCh38 (Ensembl)</option>
                            <option value="hg38">hg38 (UCSC)</option>
                          </>
                        ) : organism === "Mus musculus" ? (
                          <>
                            <option value="GRCm39">GRCm39</option>
                            <option value="mm39">mm39</option>
                          </>
                        ) : (
                          <option value="Custom">Custom / Default</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-0">
                  <Form.Label className="fw-semibold">Analiz Tipi</Form.Label>
                  <Form.Select value={analysisType} onChange={(e) => setAnalysisType(e.target.value)}>
                    <option value="Differential Expression">Differential Gene Expression (DGE)</option>
                    <option value="Transcript Assembly">Transcript Assembly &amp; Quantification</option>
                    <option value="Alternative Splicing">Alternative Splicing Analysis</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}

            {/* ── STEP 2: Samples + FASTQ ── */}
            {step === 2 && !submitting && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Örnekler</h6>
                    <small className="text-muted">
                      Kontrol ve Treatment grubundan en az 1'er örnek ekleyin. FASTQ dosyası opsiyoneldir.
                    </small>
                  </div>
                  <button type="button" onClick={addRow} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                    <Plus size={14} /> Örnek Ekle
                  </button>
                </div>

                {/* Column headers */}
                <div className="row g-1 mb-1 px-1" style={{ fontSize: "0.72rem", color: "#6c757d", fontWeight: 600, textTransform: "uppercase" }}>
                  <div className="col-3">Örnek Adı *</div>
                  <div className="col-2">Grup</div>
                  <div className="col-2">Replikasyon</div>
                  <div className="col-4">FASTQ Dosyası</div>
                  <div className="col-1"></div>
                </div>

                <div style={{ maxHeight: "340px", overflowY: "auto" }}>
                  {sampleRows.map((row) => (
                    <div
                      key={row.id}
                      className="row g-1 align-items-center mb-2 p-2 rounded"
                      style={{ background: "#f8f9fa", border: "1px solid #e9ecef" }}
                    >
                      {/* Sample name */}
                      <div className="col-3">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Örn: Ctrl_1"
                          value={row.sampleName}
                          onChange={(e) => updateRow(row.id, "sampleName", e.target.value)}
                        />
                      </div>

                      {/* Group */}
                      <div className="col-2">
                        <select
                          className="form-select form-select-sm"
                          value={row.group}
                          onChange={(e) => updateRow(row.id, "group", e.target.value)}
                        >
                          <option value="Control">Control</option>
                          <option value="Treatment">Treatment</option>
                        </select>
                      </div>

                      {/* Replicate */}
                      <div className="col-2">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min={1} max={10}
                          value={row.replicate}
                          onChange={(e) => updateRow(row.id, "replicate", e.target.value)}
                        />
                      </div>

                      {/* FASTQ upload */}
                      <div className="col-4">
                        {row.uploadStatus === "done" && row.qc ? (
                          <div>
                            <div className="text-success fw-semibold text-truncate" style={{ fontSize: "0.72rem" }} title={row.file?.name}>
                              <CheckCircle size={11} /> {row.file?.name}
                            </div>
                            <div className="text-muted" style={{ fontSize: "0.68rem" }}>
                              Q30: %{row.qc.q30Rate} · GC: %{row.qc.gcContent}
                            </div>
                          </div>
                        ) : row.uploadStatus === "error" ? (
                          <div className="text-danger" style={{ fontSize: "0.72rem" }}>
                            <XCircle size={11} /> {row.error}
                          </div>
                        ) : row.file ? (
                          <div className="text-primary text-truncate" style={{ fontSize: "0.72rem" }} title={row.file.name}>
                            <FileUp size={11} /> {row.file.name}
                          </div>
                        ) : (
                          <span className="text-muted fst-italic" style={{ fontSize: "0.72rem" }}>Dosya seçilmedi</span>
                        )}

                        {/* Label triggers file picker */}
                        <label
                          htmlFor={`new-fastq-${row.id}`}
                          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 mt-1"
                          style={{ fontSize: "0.7rem", padding: "2px 8px", width: "fit-content", cursor: "pointer" }}
                        >
                          <Upload size={11} />
                          {row.file ? "Değiştir" : "FASTQ Seç"}
                        </label>
                        <input
                          id={`new-fastq-${row.id}`}
                          type="file"
                          accept=".fastq,.fastq.gz,.fq,.fq.gz"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const f = e.target.files[0];
                            e.target.value = "";
                            if (f) handleFileSelect(row.id, f);
                          }}
                        />
                      </div>

                      {/* Remove row */}
                      <div className="col-1 text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger p-0"
                          style={{ width: "26px", height: "26px" }}
                          onClick={() => removeRow(row.id)}
                          title="Sil"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {sampleRows.length === 0 && (
                    <div className="text-center py-4 text-muted">
                      <Dna size={32} className="mb-2" />
                      <p className="mb-0">Henüz örnek eklenmedi.</p>
                    </div>
                  )}
                </div>

                <div className="alert alert-info py-2 mt-3 mb-0" style={{ fontSize: "0.8rem" }}>
                  <strong>💡 İpucu:</strong> FASTQ dosyası seçmezseniz örnek yine oluşturulur; analiz simüle edilmiş verilerle yapılır.
                  Dosya seçerseniz gerçek QC hesaplaması otomatik çalışır.
                </div>
              </>
            )}

            {/* ── Submission progress ── */}
            {submitting && (
              <div className="py-3">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Loader2 size={20} className="text-primary" style={{ animation: "spin 1s linear infinite" }} />
                  <span className="fw-semibold">{submitMsg}</span>
                </div>
                <ProgressBar
                  now={submitProgress}
                  label={`${submitProgress}%`}
                  animated={submitProgress < 100}
                  variant={submitProgress === 100 ? "success" : "primary"}
                  style={{ height: "10px", borderRadius: "6px" }}
                />

                {/* Sample upload status list */}
                <div className="mt-3">
                  {sampleRows.filter(r => r.sampleName.trim()).map(row => (
                    <div key={row.id} className="d-flex align-items-center gap-2 py-1" style={{ fontSize: "0.82rem" }}>
                      {row.uploadStatus === "uploading" && <Loader2 size={13} className="text-primary" />}
                      {row.uploadStatus === "done"      && <CheckCircle size={13} className="text-success" />}
                      {row.uploadStatus === "error"     && <XCircle size={13} className="text-danger" />}
                      {row.uploadStatus === "idle"      && <div style={{ width: 13, height: 13, border: "2px solid #dee2e6", borderRadius: "50%" }} />}
                      <span>{row.sampleName}</span>
                      {row.file && <span className="text-muted">— {row.file.name}</span>}
                      {row.uploadStatus === "done" && row.qc &&
                        <span className="badge bg-success-subtle text-success">Q30: %{row.qc.q30Rate}</span>}
                      {row.uploadStatus === "error" && row.error &&
                        <span className="badge bg-danger-subtle text-danger">{row.error}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>

          {/* Footer buttons */}
          {!submitting && (
            <Modal.Footer className="border-0 pt-0">
              {step === 1 ? (
                <>
                  <Button variant="secondary" onClick={closeModal}>İptal</Button>
                  <Button
                    variant="primary"
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="d-flex align-items-center gap-1"
                  >
                    Sonraki: Örnekler <ChevronRight size={16} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setStep(1)}
                    className="d-flex align-items-center gap-1"
                  >
                    <ChevronLeft size={16} /> Geri
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!step2Valid}
                    className="d-flex align-items-center gap-1"
                  >
                    Projeyi Oluştur ve Yükle <Upload size={16} />
                  </Button>
                </>
              )}
            </Modal.Footer>
          )}
        </Form>
      </Modal>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Projects;
