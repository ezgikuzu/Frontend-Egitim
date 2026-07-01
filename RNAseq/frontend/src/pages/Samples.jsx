import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSamples, deleteSample } from "../store/sampleSlice";
import { fetchProjects } from "../store/projectSlice";
import { Search, Dna, Trash2, ExternalLink } from "lucide-react";

export const Samples = () => {
  const dispatch = useDispatch();
  
  const { samples, loading: samplesLoading } = useSelector((state) => state.samples);
  const { projects } = useSelector((state) => state.projects);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");

  useEffect(() => {
    dispatch(fetchSamples());
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    if (window.confirm(`"${name}" örneğini silmek istediğinize emin misiniz?`)) {
      dispatch(deleteSample(id));
    }
  };

  // Get project title by ID
  const getProjectTitle = (projId) => {
    const project = projects.find((p) => p.id === projId);
    return project ? project.title : `Proje #${projId}`;
  };

  // Filter logic
  const filteredSamples = samples.filter((s) => {
    const matchesSearch = s.sampleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.tissue && s.tissue.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.condition && s.condition.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesProject = selectedProjectId === "all" || s.projectId === parseInt(selectedProjectId);
    const matchesGroup = selectedGroup === "all" || s.group === selectedGroup;

    return matchesSearch && matchesProject && matchesGroup;
  });

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Numune & Örnek Yönetimi</h2>
          <p className="text-muted mb-0">Projelerinizde tanımlanmış olan tüm RNA-seq biyolojik numunelerini inceleyin.</p>
        </div>
      </div>

      {/* Filters Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3">
            {/* Search */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Örnek adı, doku, koşul ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Project Filter */}
            <div className="col-12 col-sm-6 col-md-4">
              <select 
                className="form-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                <option value="all">Tüm Projeler</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            {/* Group Filter */}
            <div className="col-12 col-sm-6 col-md-4">
              <select 
                className="form-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="all">Tüm Gruplar</option>
                <option value="Control">Kontrol (Control)</option>
                <option value="Treatment">Deney (Treatment)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Samples Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {samplesLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : filteredSamples.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <Dna size={40} className="mb-2" />
              <p>Eşleşen örnek bulunamadı.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr className="bg-light">
                    <th className="ps-4">Örnek Adı</th>
                    <th>Ait Olduğu Proje</th>
                    <th>Grup</th>
                    <th>Replikasyon</th>
                    <th>Doku Tipi</th>
                    <th>Koşul</th>
                    <th>Dosya Adı</th>
                    <th>Kalite QC</th>
                    <th className="text-end pe-4">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSamples.map((s) => (
                    <tr key={s.id}>
                      <td className="ps-4 fw-semibold">{s.sampleName}</td>
                      <td>
                        <span className="text-truncate d-inline-block" style={{ maxWidth: "200px" }} title={getProjectTitle(s.projectId)}>
                          {getProjectTitle(s.projectId)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${s.group === "Control" ? "bg-info-subtle text-info" : "bg-warning-subtle text-warning"}`}>
                          {s.group === "Control" ? "Kontrol" : "Deney"}
                        </span>
                      </td>
                      <td>{s.replicate}. Tekrar</td>
                      <td>{s.tissue || "-"}</td>
                      <td>{s.condition || "-"}</td>
                      <td className="text-muted" style={{ fontSize: "0.8rem" }}>{s.fastqFile || "-"}</td>
                      <td>
                        {s.qualityStatus === "passed" ? (
                          <span className="text-success badge bg-success-subtle">Geçti</span>
                        ) : s.qualityStatus === "failed" ? (
                          <span className="text-danger badge bg-danger-subtle">Kaldı</span>
                        ) : (
                          <span className="text-muted badge bg-light border">Bekliyor</span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          <Link 
                            to={`/projects/${s.projectId}`} 
                            className="btn btn-sm btn-outline-primary"
                            title="Proje Detayına Git"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(s.id, s.sampleName)}
                            className="btn btn-sm btn-outline-danger"
                            title="Örneği Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Samples;
