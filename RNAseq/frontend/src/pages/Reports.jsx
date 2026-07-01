import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../store/resultSlice";
import { fetchProjects } from "../store/projectSlice";
import { Card, Button, Modal, Table } from "react-bootstrap";
import { FileText, Calendar, Printer, Download, Eye, Award } from "lucide-react";

export const Reports = () => {
  const dispatch = useDispatch();
  
  const { reports } = useSelector((state) => state.results);
  const { projects } = useSelector((state) => state.projects);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchProjects());
  }, [dispatch]);

  const getProjectTitle = (projId) => {
    const project = projects.find((p) => p.id === projId);
    return project ? project.title : `Proje #${projId}`;
  };

  const handleShowDetail = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 printable-hide">
        <div>
          <h2 className="fw-bold">Analiz Raporları</h2>
          <p className="text-muted mb-0">Analizler sonrasında otomatik üretilen özet raporları inceleyin ve indirin.</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="alert alert-info text-center py-4 border-0 shadow-sm printable-hide">
          Henüz oluşturulmuş analiz raporu bulunmamaktadır. Raporlar, proje analizi tamamlandığında otomatik olarak derlenir.
        </div>
      ) : (
        <div className="row g-4 printable-hide">
          {reports.map((r) => (
            <div key={r.id} className="col-12 col-md-6 col-xxl-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="bg-danger-subtle text-danger rounded p-3">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{r.title}</h5>
                      <small className="text-muted d-block">{getProjectTitle(r.projectId)}</small>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="flex-grow-1" style={{ fontSize: "0.85rem" }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Toplam Örnek:</span>
                      <span className="fw-bold">{r.totalSamples} Adet</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Analiz Edilen Gen:</span>
                      <span className="fw-bold">{r.totalGenes}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Anlamlı Gen Sayısı:</span>
                      <span className="fw-bold text-success">{r.significantGenes}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Artan (Upregulated):</span>
                      <span className="fw-bold text-danger">{r.upregulatedGenes}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Azalan (Downregulated):</span>
                      <span className="fw-bold text-primary">{r.downregulatedGenes}</span>
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-3 text-muted" style={{ fontSize: "0.75rem" }}>
                    <div className="d-flex align-items-center gap-1">
                      <Calendar size={14} />
                      <span>{r.createdAt ? r.createdAt.split('T')[0] : 'Bilinmiyor'}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      className="w-100 d-flex align-items-center justify-content-center gap-1"
                      onClick={() => handleShowDetail(r)}
                    >
                      <Eye size={16} /> Raporu Oku
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Report Detail Modal & Print view */}
      {selectedReport && (
        <Modal 
          show={showDetailModal} 
          onHide={() => setShowDetailModal(false)} 
          size="lg" 
          centered
          className="print-modal"
        >
          <Modal.Header closeButton className="printable-hide">
            <Modal.Title className="fw-bold">Rapor Ayrıntısı</Modal.Title>
          </Modal.Header>
          
          <Modal.Body className="p-5" id="printable-area">
            {/* Report Content */}
            <div className="text-center mb-5">
              <div className="d-inline-flex align-items-center justify-content-center bg-danger-subtle text-danger rounded-circle mb-3 p-3">
                <FileText size={48} />
              </div>
              <h2 className="fw-bold">{selectedReport.title}</h2>
              <h5 className="text-muted">{getProjectTitle(selectedReport.projectId)}</h5>
              <div className="text-muted mt-2" style={{ fontSize: "0.85rem" }}>
                Rapor Tarihi: {selectedReport.createdAt ? selectedReport.createdAt.split('T')[0] : ''}
              </div>
            </div>

            <h5 className="fw-bold border-bottom pb-2 mb-3">1. Deneysel Tasarım Özeti</h5>
            <Table bordered className="align-middle mb-4" style={{ fontSize: "0.9rem" }}>
              <tbody>
                <tr>
                  <th style={{ width: "30%" }} className="bg-light">Analiz Tipi</th>
                  <td>Diferansiyel Gen Ekspresyon Analizi (DGE)</td>
                </tr>
                <tr>
                  <th className="bg-light">Toplam Biyolojik Tekrar (Samples)</th>
                  <td>{selectedReport.totalSamples} Adet Numune</td>
                </tr>
              </tbody>
            </Table>

            <h5 className="fw-bold border-bottom pb-2 mb-3">2. Gen Ekspresyon İstatistikleri</h5>
            <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>
              Aşağıdaki istatistikler, Benjamini-Hochberg False Discovery Rate (FDR) düzeltmesi kullanılarak adjusted p-value &le; 0.05 ve |log2FoldChange| &ge; 1.0 kriterlerine göre hesaplanmıştır.
            </p>
            
            <div className="row g-3 mb-4 text-center">
              <div className="col-4">
                <div className="p-3 border rounded bg-light">
                  <div className="text-muted mb-1" style={{ fontSize: "0.75rem" }}>Analiz Edilen Gen</div>
                  <h3 className="fw-bold mb-0">{selectedReport.totalGenes}</h3>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 border rounded bg-danger-subtle text-danger">
                  <div className="text-danger mb-1" style={{ fontSize: "0.75rem" }}>Anlamlı Artan (Up)</div>
                  <h3 className="fw-bold mb-0">+{selectedReport.upregulatedGenes}</h3>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 border rounded bg-primary-subtle text-primary">
                  <div className="text-primary mb-1" style={{ fontSize: "0.75rem" }}>Anlamlı Azalan (Down)</div>
                  <h3 className="fw-bold mb-0">-{selectedReport.downregulatedGenes}</h3>
                </div>
              </div>
            </div>

            <h5 className="fw-bold border-bottom pb-2 mb-3">3. Biyoinformatik Pipeline Deklarasyonu</h5>
            <p className="text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
              Veri analiz sürecinde ham okumalar (fastq) FastQC aracı ile kalite kontrolünden geçirilmiş, Trimmomatic ile düşük kaliteli bazlar temizlenmiş, STAR hizalama yazılımı ile referans genoma eşlenmiş ve son olarak DESeq2 metodolojisiyle diferansiyel ekspresyon istatistikleri çıkarılmıştır.
            </p>
            
            <div className="mt-5 text-center d-flex flex-column align-items-center gap-2">
              <Award size={36} className="text-warning" />
              <div className="fw-bold" style={{ fontSize: "0.85rem" }}>RNA-seq Analiz Sistemi Onaylı Raporudur</div>
              <small className="text-muted">Biotechnology Lab & Bioinformatics Platform</small>
            </div>
          </Modal.Body>

          <Modal.Footer className="printable-hide">
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Kapat</Button>
            <Button variant="success" onClick={handlePrint} className="d-flex align-items-center gap-1">
              <Printer size={16} /> Yazdır veya PDF Kaydet
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Reports;
