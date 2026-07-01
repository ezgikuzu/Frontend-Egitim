import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, runProjectAnalysis } from "../store/projectSlice";
import { fetchSamples, createSample, deleteSample } from "../store/sampleSlice";
import { fetchAnalysisSteps } from "../store/analysisSlice";
import { Tabs, Tab, Modal, Button, Form, ProgressBar } from "react-bootstrap";
import { 
  ArrowLeft, 
  Play, 
  Dna, 
  ListOrdered, 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Loader2,
  FileCheck2,
  Settings,
  Upload,
  FileUp
} from "lucide-react";

export const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentProject, loading: projectLoading } = useSelector((state) => state.projects);
  const { samples, loading: samplesLoading } = useSelector((state) => state.samples);
  const { steps, loading: stepsLoading } = useSelector((state) => state.analysis);

  const [activeTab, setActiveTab] = useState("overview");
  const [showAddSampleModal, setShowAddSampleModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // FASTQ upload state
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadResults, setUploadResults] = useState({});

  // New Sample Form State
  const [sampleName, setSampleName] = useState("");
  const [group, setGroup] = useState("Control");
  const [tissue, setTissue] = useState("Cell Line");
  const [condition, setCondition] = useState("");
  const [replicate, setReplicate] = useState(1);
  const [fastqFile, setFastqFile] = useState("");

  // Load project details
  useEffect(() => {
    dispatch(fetchProjectById(id));
    dispatch(fetchSamples(id));
    dispatch(fetchAnalysisSteps(id));
  }, [dispatch, id]);

  // Polling mechanism if project is analyzing
  useEffect(() => {
    let interval = null;
    if (currentProject && currentProject.status === "in_progress") {
      interval = setInterval(() => {
        dispatch(fetchProjectById(id));
        dispatch(fetchAnalysisSteps(id));
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentProject, dispatch, id]);

  const handleStartAnalysis = async () => {
    setErrorMessage("");
    try {
      const response = await dispatch(runProjectAnalysis(id)).unwrap();
      dispatch(fetchProjectById(id));
      dispatch(fetchAnalysisSteps(id));
      setActiveTab("pipeline");
    } catch (err) {
      setErrorMessage(err || "Analiz başlatılamadı.");
    }
  };

  const handleAddSample = (e) => {
    e.preventDefault();
    if (!sampleName) return;

    dispatch(createSample({
      projectId: parseInt(id),
      sampleName,
      group,
      tissue,
      condition: condition || (group === "Control" ? "Untreated" : "Treated"),
      replicate: parseInt(replicate),
      fastqFile: fastqFile || `${sampleName.toLowerCase()}.fastq.gz`
    }));

    // Reset Form
    setSampleName("");
    setGroup("Control");
    setTissue("Cell Line");
    setCondition("");
    setReplicate(1);
    setFastqFile("");
    setShowAddSampleModal(false);
  };

  const handleDeleteSample = (sampleId, name) => {
    if (window.confirm(`"${name}" örneğini silmek istediğinize emin misiniz?`)) {
      dispatch(deleteSample(sampleId));
    }
  };

  // FASTQ upload — uses fetch with FormData
  const handleFastqUpload = async (sampleId, file) => {
    if (!file) return;
    setUploadingId(sampleId);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(
        `http://localhost:8000/samples/${sampleId}/upload-fastq`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Yükleme hatası");
      setUploadResults(prev => ({ ...prev, [sampleId]: { ...data.qc, filename: data.filename } }));
      dispatch(fetchSamples(id));
    } catch (err) {
      setUploadResults(prev => ({ ...prev, [sampleId]: { error: err.message || "Dosya yüklenemedi." } }));
    } finally {
      setUploadingId(null);
    }
  };

  if (projectLoading && !currentProject) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="alert alert-danger" role="alert">
        Proje bulunamadı. <Link to="/projects">Projelere geri dön</Link>
      </div>
    );
  }

  // Calculate pipeline progress percentage
  const completedSteps = steps.filter(s => s.status === "completed").length;
  const progressPercent = steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;

  const getStepIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-success" size={20} />;
      case "in_progress":
        return <Loader2 className="text-primary spin-animation" size={20} />;
      case "failed":
        return <XCircle className="text-danger" size={20} />;
      default:
        return <ClockIcon className="text-muted" size={20} />;
    }
  };

  const ClockIcon = ({ className, size }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  return (
    <div>
      {/* Back Button */}
      <Link to="/projects" className="btn btn-link text-decoration-none p-0 d-inline-flex align-items-center gap-1 mb-3 text-secondary">
        <ArrowLeft size={16} /> Projelere Geri Dön
      </Link>

      {/* Project Banner Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <h2 className="fw-bold mb-1">{currentProject.title}</h2>
              <p className="text-muted mb-0">{currentProject.description || "Açıklama girilmemiş."}</p>
            </div>
            
            <div className="d-flex flex-wrap gap-2 align-self-start align-self-md-center">
              {currentProject.status === "completed" ? (
                <Link to="/results" className="btn btn-success d-flex align-items-center gap-2">
                  <FileCheck2 size={18} />
                  Sonuçları İncele
                </Link>
              ) : (
                <button 
                  onClick={handleStartAnalysis}
                  disabled={currentProject.status === "in_progress" || samples.length === 0}
                  className="btn btn-primary d-flex align-items-center gap-2"
                >
                  <Play size={18} />
                  {currentProject.status === "in_progress" ? "Analiz Ediliyor..." : "Analizi Başlat"}
                </button>
              )}
            </div>
          </div>
          
          {errorMessage && (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              {errorMessage}
            </div>
          )}

          {currentProject.status === "in_progress" && (
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.85rem" }}>
                <span>Analiz İlerleme Durumu</span>
                <span className="fw-bold">{progressPercent}%</span>
              </div>
              <ProgressBar now={progressPercent} variant="primary" style={{ height: "10px" }} animated />
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4 custom-tabs border-0">
        {/* Overview Tab */}
        <Tab eventKey="overview" title="Genel Bakış">
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3 border-bottom pb-2">Proje Parametreleri</h5>
                  
                  <div className="row g-3">
                    <div className="col-6 col-md-4">
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>Organizma</div>
                      <div className="fw-semibold fs-5">{currentProject.organism}</div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>Referans Genom</div>
                      <div className="fw-semibold fs-5">{currentProject.referenceGenome}</div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>Analiz Tipi</div>
                      <div className="fw-semibold fs-5">{currentProject.analysisType}</div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>Örnek Sayısı</div>
                      <div className="fw-semibold fs-5">{samples.length}</div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>Durum</div>
                      <div className="fw-semibold fs-5">
                        {currentProject.status === "completed" && <span className="text-success">Tamamlandı</span>}
                        {currentProject.status === "in_progress" && <span className="text-primary">Devam Ediyor</span>}
                        {currentProject.status === "failed" && <span className="text-danger">Başarısız</span>}
                        {currentProject.status === "created" && <span className="text-secondary">Oluşturuldu</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3 border-bottom pb-2">Hızlı İpuçları</h5>
                  <ul className="text-muted ps-3 mb-0" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                    <li className="mb-2">Analizi başlatmak için hem **Control** hem de **Treatment** grubunda en az 1 örnek bulunmalıdır.</li>
                    <li className="mb-2">FASTQ dosya adı girilmezse, simüle edilmiş veri analizi deterministik olarak üretilecektir.</li>
                    <li>Tamamlanan analizlerin sonuç grafikleri volcano plot ve ısı haritası şeklinde **Sonuçlar** sekmesinden görüntülenebilir.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        {/* Samples Tab */}
        <Tab eventKey="samples" title={`Örnek Yönetimi (${samples.length})`}>
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pt-3 px-4">
              <h5 className="fw-bold mb-0">Örnek Listesi</h5>
              <button 
                onClick={() => setShowAddSampleModal(true)}
                disabled={currentProject.status === "in_progress"}
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
              >
                <Plus size={16} /> Örnek Ekle
              </button>
            </div>
            <div className="card-body px-4 pb-4">
              {samplesLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : samples.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <Dna size={40} className="mb-2" />
                  <p>Henüz örnek eklenmemiş. Lütfen "Örnek Ekle" butonu ile numunelerinizi tanımlayın.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Örnek Adı</th>
                        <th>Grup</th>
                        <th>Replikasyon</th>
                        <th>Doku Tipi</th>
                        <th>Koşul</th>
                        <th>Fastq Dosyası</th>
                        <th>Kalite Durumu</th>
                        <th className="text-end">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {samples.map((s) => (
                        <tr key={s.id}>
                          <td className="fw-semibold">{s.sampleName}</td>
                          <td>
                            <span className={`badge ${s.group === "Control" ? "bg-info-subtle text-info" : "bg-warning-subtle text-warning"}`}>
                              {s.group === "Control" ? "Kontrol" : "Treatment"}
                            </span>
                          </td>
                          <td>{s.replicate}. Replikasyon</td>
                          <td>{s.tissue || "Bilinmiyor"}</td>
                          <td>{s.condition || "Belirtilmemiş"}</td>
                          {/* FASTQ upload column — label+input approach (most reliable) */}
                          <td style={{ minWidth: "180px" }}>
                            {/* Show result if uploaded */}
                            {uploadResults[s.id] && !uploadResults[s.id].error && (
                              <div className="d-flex flex-column gap-1 mb-1">
                                <span
                                  className="text-success fw-semibold text-truncate"
                                  style={{ fontSize: "0.78rem", maxWidth: "160px" }}
                                  title={uploadResults[s.id].filename}
                                >
                                  ✓ {uploadResults[s.id].filename}
                                </span>
                                <span className="badge bg-success-subtle text-success" style={{ fontSize: "0.7rem" }}>
                                  Q30: %{uploadResults[s.id].q30Rate} &middot; GC: %{uploadResults[s.id].gcContent}
                                </span>
                              </div>
                            )}
                            {uploadResults[s.id]?.error && (
                              <div className="badge bg-danger-subtle text-danger mb-1" style={{ fontSize: "0.7rem", whiteSpace: "normal" }}>
                                {uploadResults[s.id].error}
                              </div>
                            )}
                            {!uploadResults[s.id] && (
                              <div className="text-muted mb-1" style={{ fontSize: "0.8rem" }}>
                                {s.fastqFile
                                  ? s.fastqFile.split("/").pop().split("\\").pop()
                                  : <em>Dosya yüklenmedi</em>}
                              </div>
                            )}

                            {/* Label wraps the input — click on label opens file picker */}
                            <label
                              htmlFor={`fastq-upload-${s.id}`}
                              className={`btn btn-sm ${
                                uploadingId === s.id ? "btn-secondary disabled" : "btn-outline-primary"
                              } d-flex align-items-center gap-1`}
                              style={{ fontSize: "0.75rem", padding: "3px 10px", cursor: "pointer", width: "fit-content" }}
                            >
                              {uploadingId === s.id ? (
                                <>
                                  <span className="spinner-border spinner-border-sm" style={{ width: "10px", height: "10px" }} />
                                  Yükleniyor...
                                </>
                              ) : (
                                <>
                                  <Upload size={12} />
                                  FASTQ Yükle
                                </>
                              )}
                            </label>
                            <input
                              id={`fastq-upload-${s.id}`}
                              type="file"
                              accept=".fastq,.fastq.gz,.fq,.fq.gz"
                              style={{ display: "none" }}
                              disabled={uploadingId === s.id || currentProject.status === "in_progress"}
                              onChange={e => {
                                const file = e.target.files[0];
                                e.target.value = ""; // reset so same file can be re-uploaded
                                handleFastqUpload(s.id, file);
                              }}
                            />
                          </td>
                          <td>
                            {s.qualityStatus === "passed" ? (
                              <span className="text-success d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                                <CheckCircle size={14} /> Passed
                              </span>
                            ) : s.qualityStatus === "failed" ? (
                              <span className="text-danger d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                                <XCircle size={14} /> Failed
                              </span>
                            ) : (
                              <span className="text-muted" style={{ fontSize: "0.85rem" }}>Pending</span>
                            )}
                          </td>
                          <td className="text-end">
                            <button 
                              onClick={() => handleDeleteSample(s.id, s.sampleName)}
                              disabled={currentProject.status === "in_progress"}
                              className="btn btn-sm btn-outline-danger"
                              title="Sil"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Tab>

        {/* Pipeline Tab */}
        <Tab eventKey="pipeline" title="Analiz Aşamaları">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Pipeline İlerleme Aşamaları</h5>
              
              {steps.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  Analiz henüz başlatılmamış.
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {steps.map((step) => (
                    <div 
                      key={step.id} 
                      className={`d-flex align-items-center justify-content-between p-3 rounded border ${
                        step.status === "in_progress" 
                          ? "border-primary bg-primary-subtle bg-opacity-10" 
                          : step.status === "completed" 
                          ? "border-success bg-success-subtle bg-opacity-10" 
                          : step.status === "failed"
                          ? "border-danger bg-danger-subtle bg-opacity-10"
                          : "border-light bg-light"
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <div className="me-3">{getStepIcon(step.status)}</div>
                        <div>
                          <div className="fw-bold">{step.stepName}</div>
                          <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                            Araç: {step.tool || "Sistem"}
                          </small>
                        </div>
                      </div>
                      
                      <div className="text-end" style={{ fontSize: "0.85rem" }}>
                        {step.status === "completed" && (
                          <span className="text-success">Tamamlandı</span>
                        )}
                        {step.status === "in_progress" && (
                          <span className="text-primary fw-semibold">Yürütülüyor...</span>
                        )}
                        {step.status === "failed" && (
                          <span className="text-danger">Hata Oluştu</span>
                        )}
                        {step.status === "pending" && (
                          <span className="text-muted">Beklemede</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>

      {/* Add Sample Modal */}
      <Modal show={showAddSampleModal} onHide={() => setShowAddSampleModal(false)} centered>
        <Form onSubmit={handleAddSample}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Projeye Örnek Ekle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Örnek Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Örn: Control_Replicate_1 veya Treatment_A"
                value={sampleName}
                onChange={(e) => setSampleName(e.target.value)}
                required
              />
            </Form.Group>

            <div className="row g-3">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Grup</Form.Label>
                  <Form.Select value={group} onChange={(e) => setGroup(e.target.value)}>
                    <option value="Control">Control (Kontrol)</option>
                    <option value="Treatment">Treatment (Deney)</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Replikasyon No</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={replicate}
                    onChange={(e) => setReplicate(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Doku Tipi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Örn: Cell Line, Brain"
                    value={tissue}
                    onChange={(e) => setTissue(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Koşul / Tedavi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Örn: Untreated, TRAIL, DMSO"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">FASTQ Dosya Adı (Opsiyonel)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Örn: sample_r1.fastq.gz"
                value={fastqFile}
                onChange={(e) => setFastqFile(e.target.value)}
              />
              <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                Girilmezse, analiz başlatıldığında sistem deterministik sahte bir dosya üzerinden QC hesaplayacaktır.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Header>
            <div className="d-flex justify-content-end gap-2 w-100">
              <Button variant="secondary" onClick={() => setShowAddSampleModal(false)}>İptal</Button>
              <Button variant="primary" type="submit">Örneği Ekle</Button>
            </div>
          </Modal.Header>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
