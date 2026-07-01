import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../store/projectSlice";
import { fetchSamples } from "../store/sampleSlice";
import { fetchReports } from "../store/resultSlice";
import { 
  FolderGit2, 
  Dna, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowRight, 
  FileText 
} from "lucide-react";

export const Dashboard = () => {
  const dispatch = useDispatch();
  
  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { samples, loading: samplesLoading } = useSelector((state) => state.samples);
  const { reports } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSamples());
    dispatch(fetchReports());
  }, [dispatch]);

  // Compute metrics
  const totalProjects = projects.length;
  const totalSamples = samples.length;
  const completedAnalyses = projects.filter((p) => p.status === "completed").length;
  const inProgressAnalyses = projects.filter((p) => p.status === "in_progress").length;

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4);

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="badge bg-success-subtle text-success">Tamamlandı</span>;
      case "in_progress":
        return <span className="badge bg-primary-subtle text-primary">Devam Ediyor</span>;
      case "failed":
        return <span className="badge bg-danger-subtle text-danger">Hata</span>;
      default:
        return <span className="badge bg-secondary-subtle text-secondary">Oluşturuldu</span>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Kontrol Paneli</h2>
          <p className="text-muted mb-0">RNA-seq veri analizi projelerinizin anlık durum özeti.</p>
        </div>
        <Link to="/projects" className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} />
          Yeni Proje
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center">
            <div className="bg-primary-subtle text-primary rounded-circle p-3 me-3">
              <FolderGit2 size={24} />
            </div>
            <div>
              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.75rem" }}>Toplam Proje</small>
              <h3 className="fw-bold mb-0">{projectsLoading ? "..." : totalProjects}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center">
            <div className="bg-info-subtle text-info rounded-circle p-3 me-3">
              <Dna size={24} />
            </div>
            <div>
              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.75rem" }}>Toplam Örnek</small>
              <h3 className="fw-bold mb-0">{samplesLoading ? "..." : totalSamples}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center">
            <div className="bg-success-subtle text-success rounded-circle p-3 me-3">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.75rem" }}>Tamamlanan Analiz</small>
              <h3 className="fw-bold mb-0">{completedAnalyses}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center">
            <div className="bg-warning-subtle text-warning rounded-circle p-3 me-3">
              <Clock size={24} />
            </div>
            <div>
              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.75rem" }}>Aktif Analiz</small>
              <h3 className="fw-bold mb-0">{inProgressAnalyses}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="row g-4">
        {/* Recent Projects */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pt-3 px-3">
              <h5 className="fw-bold mb-0">Son Çalışılan Projeler</h5>
              <Link to="/projects" className="text-decoration-none d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                Tümünü Gör <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card-body px-3 pb-3">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Proje Adı</th>
                      <th scope="col">Organizma</th>
                      <th scope="col">Referans</th>
                      <th scope="col">Durum</th>
                      <th scope="col" className="text-end">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">Henüz proje oluşturulmamış.</td>
                      </tr>
                    ) : (
                      recentProjects.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="fw-semibold">{p.title}</div>
                            <small className="text-muted" style={{ fontSize: "0.75rem" }}>{p.analysisType}</small>
                          </td>
                          <td>{p.organism}</td>
                          <td>{p.referenceGenome}</td>
                          <td>{getStatusBadge(p.status)}</td>
                          <td className="text-end">
                            <Link to={`/projects/${p.id}`} className="btn btn-sm btn-outline-primary px-3">Detay</Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports & Progress */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-transparent border-0 pt-3 px-3">
              <h5 className="fw-bold mb-0">Genel Analiz Durumu</h5>
            </div>
            <div className="card-body px-3">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.85rem" }}>
                  <span>Tamamlanma Oranı</span>
                  <span className="fw-bold">
                    {totalProjects > 0 ? Math.round((completedAnalyses / totalProjects) * 100) : 0}%
                  </span>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${totalProjects > 0 ? (completedAnalyses / totalProjects) * 100 : 0}%` }}
                    aria-valuenow={totalProjects > 0 ? (completedAnalyses / totalProjects) * 100 : 0} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              
              <div className="d-flex flex-column gap-2" style={{ fontSize: "0.85rem" }}>
                <div className="d-flex justify-content-between p-2 bg-body-tertiary rounded">
                  <span>Tamamlanan Projeler</span>
                  <span className="fw-bold text-success">{completedAnalyses}</span>
                </div>
                <div className="d-flex justify-content-between p-2 bg-body-tertiary rounded">
                  <span>Analiz Edilen Örnekler</span>
                  <span className="fw-bold text-info">{totalSamples}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pt-3 px-3">
              <h5 className="fw-bold mb-0">Son Raporlar</h5>
              <Link to="/reports" className="text-decoration-none d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                Tümünü Gör <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card-body px-3 pb-3">
              {recentReports.length === 0 ? (
                <div className="text-center text-muted py-4" style={{ fontSize: "0.9rem" }}>Henüz rapor üretilmemiş.</div>
              ) : (
                <div className="list-group list-group-flush">
                  {recentReports.map((r) => (
                    <Link 
                      key={r.id} 
                      to="/reports" 
                      className="list-group-item list-group-item-action d-flex align-items-center p-2 border-0 rounded mb-1"
                    >
                      <div className="bg-danger-subtle text-danger rounded p-2 me-2">
                        <FileText size={18} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold" style={{ fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                        <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                          {r.significantGenes} Anlamlı Gen • {r.createdAt.split('T')[0]}
                        </small>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
