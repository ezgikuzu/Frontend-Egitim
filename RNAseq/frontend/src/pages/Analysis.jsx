import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, runProjectAnalysis } from "../store/projectSlice";
import { fetchAnalysisSteps, fetchQualityControls } from "../store/analysisSlice";
import { fetchSamples } from "../store/sampleSlice";
import { Card, ProgressBar, Form, Table } from "react-bootstrap";
import { 
  Play, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Dna,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export const Analysis = () => {
  const dispatch = useDispatch();
  
  const { projects } = useSelector((state) => state.projects);
  const { steps, qualityControls, loading: stepsLoading } = useSelector((state) => state.analysis);
  const { samples } = useSelector((state) => state.samples);

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchProjects()).then((res) => {
      const projs = res.payload || [];
      if (projs.length > 0) {
        setSelectedProjectId(projs[0].id.toString());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(fetchSamples(selectedProjectId));
      dispatch(fetchAnalysisSteps(selectedProjectId));
      dispatch(fetchQualityControls(selectedProjectId));
    }
  }, [selectedProjectId, dispatch]);

  // Polling for progress
  useEffect(() => {
    let interval = null;
    const selectedProject = projects.find(p => p.id === parseInt(selectedProjectId));
    
    if (selectedProjectId && selectedProject && selectedProject.status === "in_progress") {
      interval = setInterval(() => {
        dispatch(fetchProjects());
        dispatch(fetchAnalysisSteps(selectedProjectId));
        dispatch(fetchQualityControls(selectedProjectId));
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedProjectId, projects, dispatch]);

  const activeProject = projects.find(p => p.id === parseInt(selectedProjectId));

  const handleStartAnalysis = async () => {
    if (!selectedProjectId) return;
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      await dispatch(runProjectAnalysis(selectedProjectId)).unwrap();
      setSuccessMessage("Analiz arka planda başarıyla başlatıldı.");
      dispatch(fetchProjects());
      dispatch(fetchAnalysisSteps(selectedProjectId));
    } catch (err) {
      setErrorMessage(err || "Analiz başlatma başarısız.");
    }
  };

  // Stats calculation
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
        return <Clock className="text-muted" size={20} />;
    }
  };

  const getSampleName = (sampleId) => {
    const s = samples.find(x => x.id === sampleId);
    return s ? s.sampleName : `Örnek #${sampleId}`;
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "-";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Analiz Takip Paneli</h2>
          <p className="text-muted mb-0">Seçtiğiniz projenin RNA-seq analiz aşamalarını canlı takip edin.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Project Selector & Actions */}
        <div className="col-12 col-lg-4">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Proje Seçimi</h5>
              
              <Form.Group className="mb-4">
                <Form.Label className="text-muted" style={{ fontSize: "0.85rem" }}>Çalışılan Proje</Form.Label>
                <Form.Select 
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                  {projects.length === 0 ? (
                    <option value="">Önce Proje Oluşturun</option>
                  ) : (
                    projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>

              {activeProject && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: "0.9rem" }}>
                    <span className="text-muted">Proje Durumu:</span>
                    <span className="fw-bold">
                      {activeProject.status === "completed" && <span className="text-success">Tamamlandı</span>}
                      {activeProject.status === "in_progress" && <span className="text-primary">Devam Ediyor</span>}
                      {activeProject.status === "failed" && <span className="text-danger">Başarısız</span>}
                      {activeProject.status === "created" && <span className="text-secondary">Oluşturuldu</span>}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4" style={{ fontSize: "0.9rem" }}>
                    <span className="text-muted">Eklenen Örnek:</span>
                    <span className="fw-bold">{samples.length} Adet</span>
                  </div>

                  {errorMessage && (
                    <div className="alert alert-danger d-flex align-items-center p-2 mb-3" style={{ fontSize: "0.85rem" }}>
                      <AlertCircle size={16} className="me-2" />
                      <div>{errorMessage}</div>
                    </div>
                  )}

                  {successMessage && (
                    <div className="alert alert-success d-flex align-items-center p-2 mb-3" style={{ fontSize: "0.85rem" }}>
                      <CheckCircle size={16} className="me-2" />
                      <div>{successMessage}</div>
                    </div>
                  )}

                  <button
                    onClick={handleStartAnalysis}
                    disabled={
                      !selectedProjectId || 
                      activeProject.status === "in_progress" || 
                      samples.length === 0
                    }
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                  >
                    <Play size={18} />
                    {activeProject.status === "in_progress" ? "Analiz Yürütülüyor" : "Analizi Başlat"}
                  </button>
                  
                  {samples.length === 0 && (
                    <small className="text-danger d-block mt-2 text-center" style={{ fontSize: "0.75rem" }}>
                      Analiz başlatmak için önce örnek tanımlamalısınız.
                    </small>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Pipeline Tracker */}
        <div className="col-12 col-lg-8">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Analiz Süreci İlerlemesi</h5>
                {activeProject?.status === "in_progress" && (
                  <span className="badge bg-primary-subtle text-primary py-2 px-3 d-flex align-items-center gap-1">
                    <Loader2 size={14} className="spin-animation" /> Güncelleniyor...
                  </span>
                )}
              </div>

              {selectedProjectId && activeProject?.status !== "created" && steps.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.85rem" }}>
                    <span>Pipeline Tamamlanma Yüzdesi</span>
                    <span className="fw-bold">{progressPercent}%</span>
                  </div>
                  <ProgressBar now={progressPercent} variant="primary" style={{ height: "10px" }} animated={activeProject.status === "in_progress"} />
                </div>
              )}

              {stepsLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : steps.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <Dna size={40} className="mb-2" />
                  <p>Henüz analiz başlatılmamış. Soldaki panelden analiz sürecini tetikleyebilirsiniz.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
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
                          <div className="fw-bold" style={{ fontSize: "0.95rem" }}>{step.stepName}</div>
                          <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                            Biyoinformatik Araç: {step.tool || "Sistem"}
                          </small>
                        </div>
                      </div>
                      <div className="text-end text-muted" style={{ fontSize: "0.8rem" }}>
                        {step.completedAt ? (
                          <span>Süreç Tamamlandı</span>
                        ) : step.status === "in_progress" ? (
                          <span className="text-primary fw-semibold">Hesaplanıyor...</span>
                        ) : (
                          <span>Bekleniyor</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Quality Control Details */}
          {qualityControls.length > 0 && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <ShieldCheck className="text-success" size={22} />
                  <h5 className="fw-bold mb-0">Kalite Kontrol (QC) Sonuçları</h5>
                </div>
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Örnek Adı</th>
                        <th>Toplam Okuma (Reads)</th>
                        <th>GC Oranı (%)</th>
                        <th>Q30 Oranı (%)</th>
                        <th>Adaptör Oranı (%)</th>
                        <th>Sonuç</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qualityControls.map((qc) => (
                        <tr key={qc.id}>
                          <td className="fw-semibold">{getSampleName(qc.sampleId)}</td>
                          <td>{formatNumber(qc.totalReads)}</td>
                          <td>%{qc.gcContent}</td>
                          <td>%{qc.q30Rate}</td>
                          <td>%{qc.adapterContent}</td>
                          <td>
                            {qc.status === "passed" ? (
                              <span className="badge bg-success-subtle text-success">GEÇTİ</span>
                            ) : (
                              <span className="badge bg-danger-subtle text-danger">KALDI</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
