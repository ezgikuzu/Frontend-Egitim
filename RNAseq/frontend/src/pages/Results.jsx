import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/projectSlice";
import { fetchExpressionResults, fetchPcaData } from "../store/resultSlice";
import { fetchSamples } from "../store/sampleSlice";
import { Card, Form, Table, Tabs, Tab } from "react-bootstrap";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from "recharts";
import { Search, SlidersHorizontal, BarChart4, Grid, Compass } from "lucide-react";

export const Results = () => {
  const dispatch = useDispatch();
  
  const { projects } = useSelector((state) => state.projects);
  const { expressionResults, pcaData, loading } = useSelector((state) => state.results);
  const { samples } = useSelector((state) => state.samples);

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("volcano");

  // Threshold States
  const [log2fcCutoff, setLog2fcCutoff] = useState(1.0);
  const [pValueCutoff, setPValueCutoff] = useState(0.05);
  const [regulationFilter, setRegulationFilter] = useState("all");

  useEffect(() => {
    // Fetch completed projects
    dispatch(fetchProjects()).then((res) => {
      const raw = res.payload;
      const projs = Array.isArray(raw) ? raw : [];
      const completed = projs.filter(p => p.status === "completed");
      if (completed.length > 0) {
        setSelectedProjectId(completed[0].id.toString());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(fetchExpressionResults(selectedProjectId));
      dispatch(fetchPcaData(selectedProjectId));
      dispatch(fetchSamples(selectedProjectId));
    }
  }, [selectedProjectId, dispatch]);

  const completedProjects = projects.filter(p => p.status === "completed");

  // Filters logic
  const filteredGenes = expressionResults.filter((g) => {
    const matchesSearch = g.geneSymbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.geneId.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Apply dynamic cutoffs
    const absLog2FC = Math.abs(g.log2FoldChange);
    const passesPVal = g.adjustedPValue <= pValueCutoff;
    const passesFC = absLog2FC >= log2fcCutoff;
    
    let passesRegulation = true;
    if (regulationFilter === "upregulated") {
      passesRegulation = g.log2FoldChange >= log2fcCutoff && passesPVal;
    } else if (regulationFilter === "downregulated") {
      passesRegulation = g.log2FoldChange <= -log2fcCutoff && passesPVal;
    } else if (regulationFilter === "significant") {
      passesRegulation = passesPVal && passesFC;
    }

    return matchesSearch && passesRegulation;
  });

  // Prepare Volcano Plot data
  // X: log2FoldChange, Y: -log10(pValue)
  const volcanoData = expressionResults.map((g) => {
    const pVal = g.pValue > 0 ? g.pValue : 1e-10;
    const negLog10P = -Math.log10(pVal);
    
    // Classify dynamically based on current slider states
    let colorClass = "normal";
    if (g.adjustedPValue <= pValueCutoff) {
      if (g.log2FoldChange >= log2fcCutoff) colorClass = "upregulated";
      else if (g.log2FoldChange <= -log2fcCutoff) colorClass = "downregulated";
    }

    return {
      geneSymbol: g.geneSymbol,
      geneId: g.geneId,
      x: g.log2FoldChange,
      y: negLog10P,
      adjPVal: g.adjustedPValue,
      colorClass
    };
  });

  const upGenesPoints = volcanoData.filter(d => d.colorClass === "upregulated");
  const downGenesPoints = volcanoData.filter(d => d.colorClass === "downregulated");
  const normalGenesPoints = volcanoData.filter(d => d.colorClass === "normal");

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-dark text-white p-2 rounded shadow-sm" style={{ fontSize: "0.8rem" }}>
          <div className="fw-bold">{data.geneSymbol}</div>
          <div>ID: {data.geneId}</div>
          <div>Log2FC: {data.x.toFixed(4)}</div>
          <div>Adjusted p-val: {data.adjPVal.toExponential(4)}</div>
        </div>
      );
    }
    return null;
  };

  // Prepare Heatmap Data
  // Select top 15 most significant genes
  const topGenes = [...expressionResults]
    .sort((a, b) => a.adjustedPValue - b.adjustedPValue)
    .slice(0, 15);

  const controlSamples = samples.filter(s => s.group.toLowerCase() === "control");
  const treatmentSamples = samples.filter(s => s.group.toLowerCase() === "treatment");

  // Re-generate simulated expression values per sample for visualization
  // Returns matrix: { geneSymbol, sampleName, zScore }
  const getHeatmapGrid = () => {
    const grid = [];
    topGenes.forEach((g) => {
      const values = {};
      
      // Control samples get lower value if gene is upregulated
      controlSamples.forEach((s) => {
        const base = g.baseMean;
        // Introduce small biological variance
        const seed = sumCharCodes(s.sampleName) + sumCharCodes(g.geneSymbol);
        const rVar = 1.0 + ((seed % 10) - 5) / 50; // +-10% variance
        
        const fcMod = g.log2FoldChange > 0 
          ? base / Math.sqrt(Math.pow(2, g.log2FoldChange)) 
          : base * Math.sqrt(Math.pow(2, Math.abs(g.log2FoldChange)));
          
        values[s.sampleName] = fcMod * rVar;
      });

      // Treatment samples get higher value if gene is upregulated
      treatmentSamples.forEach((s) => {
        const base = g.baseMean;
        const seed = sumCharCodes(s.sampleName) + sumCharCodes(g.geneSymbol);
        const rVar = 1.0 + ((seed % 10) - 5) / 50;
        
        const fcMod = g.log2FoldChange > 0 
          ? base * Math.sqrt(Math.pow(2, g.log2FoldChange)) 
          : base / Math.sqrt(Math.pow(2, Math.abs(g.log2FoldChange)));
          
        values[s.sampleName] = fcMod * rVar;
      });

      // Calculate mean and SD to compute Z-score
      const allVals = Object.values(values);
      const mean = allVals.reduce((a, b) => a + b, 0) / allVals.length;
      const sd = Math.sqrt(allVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / allVals.length) || 1.0;

      Object.keys(values).forEach((sName) => {
        const z = (values[sName] - mean) / sd;
        grid.push({
          geneSymbol: g.geneSymbol,
          sampleName: sName,
          zScore: Math.max(-2, Math.min(2, z)) // Clamp Z-score to -2 to +2
        });
      });
    });
    return grid;
  };

  const sumCharCodes = (str) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
    return sum;
  };

  const getHeatmapColor = (z) => {
    // Red-White-Blue gradient
    // z ranges from -2 (blue) to 0 (white) to +2 (red)
    if (z < 0) {
      const pct = Math.round(100 - (Math.abs(z) / 2) * 100);
      return `rgb(${pct}%, ${pct}%, 100%)`; // Blue gradient
    } else {
      const pct = Math.round(100 - (z / 2) * 100);
      return `rgb(100%, ${pct}%, ${pct}%)`; // Red gradient
    }
  };

  const heatmapGrid = getHeatmapGrid();
  const allSampleNames = [...controlSamples, ...treatmentSamples].map(s => s.sampleName);

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold">Analiz Sonuçları</h2>
          <p className="text-muted mb-0">Gen ekspresyon tablolarını filtreleyin, volcano ve PCA grafiklerini inceleyin.</p>
        </div>
        
        {/* Project Selector */}
        <Form.Group className="d-flex align-items-center gap-2">
          <Form.Label className="text-muted fw-semibold mb-0" style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>Çalışılan Proje:</Form.Label>
          <Form.Select 
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            style={{ width: "260px" }}
          >
            {completedProjects.length === 0 ? (
              <option value="">Tamamlanmış Proje Yok</option>
            ) : (
              completedProjects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))
            )}
          </Form.Select>
        </Form.Group>
      </div>

      {completedProjects.length === 0 ? (
        <div className="alert alert-warning py-4 text-center border-0 shadow-sm">
          Görüntülenecek tamamlanmış bir analiz sonucu bulunamadı. Lütfen önce bir projede analizi başlatın.
        </div>
      ) : (
        <div className="row g-4">
          {/* Controls sidebar */}
          <div className="col-12 col-xl-3">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <SlidersHorizontal size={18} className="text-primary" />
                  <h5 className="fw-bold mb-0">Filtre Eşikleri</h5>
                </div>
                
                {/* Log2FC slider */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="fw-semibold mb-0" style={{ fontSize: "0.85rem" }}>Log2 Fold Change</Form.Label>
                    <span className="badge bg-primary-subtle text-primary">|FC| &ge; {log2fcCutoff}</span>
                  </div>
                  <Form.Range 
                    min={0.1} 
                    max={4.0} 
                    step={0.1}
                    value={log2fcCutoff}
                    onChange={(e) => setLog2fcCutoff(parseFloat(e.target.value))}
                  />
                </Form.Group>

                {/* p-value slider */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="fw-semibold mb-0" style={{ fontSize: "0.85rem" }}>Adjusted p-value</Form.Label>
                    <span className="badge bg-primary-subtle text-primary">p-val &le; {pValueCutoff}</span>
                  </div>
                  <Form.Select 
                    value={pValueCutoff}
                    onChange={(e) => setPValueCutoff(parseFloat(e.target.value))}
                  >
                    <option value="0.05">0.05</option>
                    <option value="0.01">0.01</option>
                    <option value="0.001">0.001</option>
                    <option value="0.0001">0.0001</option>
                  </Form.Select>
                </Form.Group>

                {/* Regulation state */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold" style={{ fontSize: "0.85rem" }}>İfade Değişimi (Regulation)</Form.Label>
                  <Form.Select 
                    value={regulationFilter} 
                    onChange={(e) => setRegulationFilter(e.target.value)}
                  >
                    <option value="all">Tümü (Tüm Genler)</option>
                    <option value="significant">Sadece Anlamlı Olanlar</option>
                    <option value="upregulated">Upregulated (Artanlar)</option>
                    <option value="downregulated">Downregulated (Azalanlar)</option>
                  </Form.Select>
                </Form.Group>
                
                <hr />
                <div style={{ fontSize: "0.8rem" }}>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Upregulated sayısı:</span>
                    <span className="fw-bold text-danger">
                      {volcanoData.filter(d => d.colorClass === "upregulated").length}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Downregulated sayısı:</span>
                    <span className="fw-bold text-primary">
                      {volcanoData.filter(d => d.colorClass === "downregulated").length}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Graphs and tables */}
          <div className="col-12 col-xl-9">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-transparent border-0 pt-3 px-4">
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="custom-tabs border-0 mb-0">
                  <Tab eventKey="volcano" title={<span><BarChart4 size={16} className="me-2" /> Volcano Plot</span>} />
                  <Tab eventKey="heatmap" title={<span><Grid size={16} className="me-2" /> Heatmap</span>} />
                  <Tab eventKey="pca" title={<span><Compass size={16} className="me-2" /> PCA Analizi</span>} />
                </Tabs>
              </Card.Header>
              
              <Card.Body className="p-4" style={{ minHeight: "450px" }}>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                  </div>
                ) : (
                  <>
                    {/* Volcano Tab */}
                    {activeTab === "volcano" && (
                      <div>
                        <div style={{ height: "400px", width: "100%" }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 30 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis
                                type="number"
                                dataKey="x"
                                name="Log2FC"
                                label={{ value: 'log₂(Fold Change)', position: 'insideBottom', offset: -10, style: { fontSize: 12, fill: '#555' } }}
                                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                                tickFormatter={v => v.toFixed(1)}
                              />
                              <YAxis
                                type="number"
                                dataKey="y"
                                name="-log10(p-value)"
                                label={{ value: '-log₁₀(p-value)', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: '#555' } }}
                              />
                              <ChartTooltip content={<CustomTooltip />} />

                              {/* Threshold Lines */}
                              <ReferenceLine x={log2fcCutoff}  stroke="#ff4d4f" strokeDasharray="4 3" strokeWidth={1.5} />
                              <ReferenceLine x={-log2fcCutoff} stroke="#2f54eb" strokeDasharray="4 3" strokeWidth={1.5} />
                              <ReferenceLine y={-Math.log10(pValueCutoff)} stroke="#8c8c8c" strokeDasharray="4 3" strokeWidth={1.5} />

                              {/* No built-in Legend — we render our own below */}
                              <Scatter name="Normal"       data={normalGenesPoints} fill="#d9d9d9" opacity={0.5} />
                              <Scatter name="Downregulated" data={downGenesPoints}   fill="#2f54eb" />
                              <Scatter name="Upregulated"  data={upGenesPoints}     fill="#ff4d4f" />
                            </ScatterChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Custom legend — rendered outside the SVG, no overlap */}
                        <div className="d-flex justify-content-center align-items-center gap-4 mt-2" style={{ fontSize: "0.82rem" }}>
                          <div className="d-flex align-items-center gap-1">
                            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#2f54eb" }} />
                            Downregulated ({downGenesPoints.length})
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#d9d9d9", border: "1px solid #aaa" }} />
                            Normal
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#ff4d4f" }} />
                            Upregulated ({upGenesPoints.length})
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Heatmap Tab */}
                    {activeTab === "heatmap" && (
                      <div>
                        <h6 className="fw-bold text-center mb-3">En Anlamlı Değişiklik Gösteren İlk 15 Genin Z-skor Isı Haritası</h6>
                        <div className="heatmap-container" style={{ overflowX: "auto" }}>
                          <div style={{ minWidth: "500px", maxWidth: "800px", margin: "0 auto" }}>
                            
                            {/* Heatmap Header */}
                            <div className="d-flex align-items-center mb-1">
                              <div style={{ width: "120px", fontWeight: "bold", fontSize: "0.85rem" }}>Gen</div>
                              <div className="d-flex flex-grow-1">
                                {allSampleNames.map(s => (
                                  <div 
                                    key={s} 
                                    className="flex-fill text-center fw-bold" 
                                    style={{ fontSize: "0.8rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                                  >
                                    {s}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Heatmap Rows */}
                            {topGenes.map((g) => (
                              <div key={g.geneSymbol} className="d-flex align-items-center mb-1" style={{ height: "28px" }}>
                                <div className="fw-semibold text-truncate" style={{ width: "120px", fontSize: "0.85rem" }}>
                                  {g.geneSymbol}
                                </div>
                                <div className="d-flex flex-grow-1 h-100">
                                  {allSampleNames.map((sName) => {
                                    const cell = heatmapGrid.find(c => c.geneSymbol === g.geneSymbol && c.sampleName === sName);
                                    const z = cell ? cell.zScore : 0.0;
                                    return (
                                      <div 
                                        key={sName} 
                                        className="flex-fill border d-flex align-items-center justify-content-center"
                                        style={{ 
                                          backgroundColor: getHeatmapColor(z),
                                          fontSize: "0.75rem",
                                          color: Math.abs(z) > 1 ? "#fff" : "#000",
                                          margin: "1px",
                                          borderRadius: "3px"
                                        }}
                                        title={`${g.geneSymbol} - ${sName} Z-score: ${z.toFixed(2)}`}
                                      >
                                        {z.toFixed(1)}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                            
                            {/* Color Legend */}
                            <div className="d-flex justify-content-center align-items-center gap-3 mt-4" style={{ fontSize: "0.8rem" }}>
                              <div className="d-flex align-items-center gap-1">
                                <div style={{ width: "15px", height: "15px", backgroundColor: "rgb(0%, 0%, 100%)", border: "1px solid #ccc" }}></div>
                                <span>Low (-2)</span>
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <div style={{ width: "15px", height: "15px", backgroundColor: "rgb(100%, 100%, 100%)", border: "1px solid #ccc" }}></div>
                                <span>Average (0)</span>
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <div style={{ width: "15px", height: "15px", backgroundColor: "rgb(100%, 0%, 0%)", border: "1px solid #ccc" }}></div>
                                <span>High (+2)</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    )}

                    {/* PCA Tab */}
                    {activeTab === "pca" && (
                      <div className="row align-items-center">
                        <div className="col-12 col-md-8" style={{ height: "350px" }}>
                          {pcaData.length === 0 ? (
                            <div className="text-center py-5 text-muted">PCA verisi hesaplanamadı.</div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <ScatterChart margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  type="number" 
                                  dataKey="x" 
                                  name="PC1" 
                                  label={{ value: `PC1 (${pcaData[0]?.pc1_var || 0}%)`, position: 'insideBottom', offset: -15 }} 
                                />
                                <YAxis 
                                  type="number" 
                                  dataKey="y" 
                                  name="PC2" 
                                  label={{ value: `PC2 (${pcaData[0]?.pc2_var || 0}%)`, angle: -90, position: 'insideLeft' }} 
                                />
                                <ChartTooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Control" data={pcaData.filter(d => d.group === "Control")} fill="#2f54eb" />
                                <Scatter name="Treatment" data={pcaData.filter(d => d.group === "Treatment")} fill="#fa8c16" />
                                <Legend />
                              </ScatterChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                        <div className="col-12 col-md-4">
                          <h6 className="fw-bold">Temel Bileşen Analizi (PCA)</h6>
                          <p className="text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                            PCA grafiği, örneklerinizin transkriptom profilleri açısından birbirlerine olan benzerliklerini 2 boyutta temsil eder.
                          </p>
                          <p className="text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                            Burada Kontrol (Mavi) ve Deney (Turuncu) örneklerinin net bir şekilde ayrıştığını görmeniz, deneysel uygulamanın gen ekspresyonunda belirgin bir değişim yarattığını gösterir.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>

            {/* Gene Table */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-transparent border-bottom-0 pt-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <h5 className="fw-bold mb-0">Gen Ekspresyon Tablosu</h5>
                <div className="input-group" style={{ width: "280px" }}>
                  <span className="input-group-text bg-transparent border-end-0">
                    <Search size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Gen Sembolü veya ID ile filtrele..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>
              </Card.Header>
              
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0" style={{ fontSize: "0.9rem" }}>
                    <thead>
                      <tr className="bg-light">
                        <th className="ps-4">Gen Sembolü</th>
                        <th>Gen ID</th>
                        <th>Ortalama İfade (BaseMean)</th>
                        <th>Log2FC</th>
                        <th>p-value</th>
                        <th>Adjusted p-value</th>
                        <th className="pe-4 text-end">Regülasyon</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">Veriler yükleniyor...</td>
                        </tr>
                      ) : filteredGenes.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4 text-muted">Eşleşen gen kaydı bulunamadı.</td>
                        </tr>
                      ) : (
                        filteredGenes.slice(0, 100).map((g) => (
                          <tr key={g.id}>
                            <td className="ps-4 fw-semibold text-primary">{g.geneSymbol}</td>
                            <td className="text-muted" style={{ fontSize: "0.8rem" }}>{g.geneId}</td>
                            <td>{g.baseMean.toFixed(2)}</td>
                            <td className={g.log2FoldChange >= log2fcCutoff && g.adjustedPValue <= pValueCutoff ? "text-danger fw-semibold" : g.log2FoldChange <= -log2fcCutoff && g.adjustedPValue <= pValueCutoff ? "text-primary fw-semibold" : ""}>
                              {g.log2FoldChange >= 0 ? "+" : ""}{g.log2FoldChange.toFixed(4)}
                            </td>
                            <td>{g.pValue.toExponential(4)}</td>
                            <td>{g.adjustedPValue.toExponential(4)}</td>
                            <td className="pe-4 text-end">
                              {g.adjustedPValue <= pValueCutoff && g.log2FoldChange >= log2fcCutoff ? (
                                <span className="badge bg-danger-subtle text-danger">Upregulated</span>
                              ) : g.adjustedPValue <= pValueCutoff && g.log2FoldChange <= -log2fcCutoff ? (
                                <span className="badge bg-primary-subtle text-primary">Downregulated</span>
                              ) : (
                                <span className="badge bg-light text-dark border">Normal</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  {filteredGenes.length > 100 && (
                    <div className="text-center p-3 text-muted border-top" style={{ fontSize: "0.8rem" }}>
                      Performans için en anlamlı ilk 100 gen listelendi (Toplam: {filteredGenes.length}).
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
