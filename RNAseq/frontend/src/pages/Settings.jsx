import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, updateSettings } from "../store/settingsSlice";
import { logout } from "../store/authSlice";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Sliders, 
  LogOut, 
  Save,
  CheckCircle
} from "lucide-react";

export const Settings = () => {
  const dispatch = useDispatch();
  
  const settingsState = useSelector((state) => state.settings);
  const { loading } = settingsState;

  // Local state to manage form controls
  const [darkMode, setDarkMode] = useState(settingsState.darkMode);
  const [notificationsEnabled, setNotificationsEnabled] = useState(settingsState.notificationsEnabled);
  const [defaultPValue, setDefaultPValue] = useState(settingsState.defaultPValue);
  const [defaultLog2FoldChange, setDefaultLog2FoldChange] = useState(settingsState.defaultLog2FoldChange);
  
  const [successMsg, setSuccessMsg] = useState("");

  // Sync local state when redux loads settings
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    setDarkMode(settingsState.darkMode);
    setNotificationsEnabled(settingsState.notificationsEnabled);
    setDefaultPValue(settingsState.defaultPValue);
    setDefaultLog2FoldChange(settingsState.defaultLog2FoldChange);
  }, [settingsState]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    
    try {
      await dispatch(updateSettings({
        darkMode,
        notificationsEnabled,
        defaultPValue: parseFloat(defaultPValue),
        defaultLog2FoldChange: parseFloat(defaultLog2FoldChange)
      })).unwrap();
      setSuccessMsg("Uygulama tercihleri başarıyla kaydedildi.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Sistem ve Grafik Tercihleri</h2>
        <p className="text-muted mb-0">Genel arayüz temasını ve varsayılan analiz eşik değerlerini özelleştirin.</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <SettingsIcon className="text-primary" size={20} />
                <span>Uygulama Ayarları</span>
              </h5>

              {successMsg && (
                <Alert variant="success" className="d-flex align-items-center mb-4">
                  <CheckCircle size={18} className="me-2" />
                  <div>{successMsg}</div>
                </Alert>
              )}

              <Form onSubmit={handleSaveSettings}>
                {/* Theme switch */}
                <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-3">
                  <div className="d-flex align-items-center gap-3">
                    {darkMode ? <Moon size={22} className="text-primary" /> : <Sun size={22} className="text-warning" />}
                    <div>
                      <div className="fw-bold">Koyu Tema (Dark Mode)</div>
                      <small className="text-muted">Arayüz renklerini koyu arka plana uyarlar.</small>
                    </div>
                  </div>
                  <Form.Check 
                    type="switch"
                    id="darkmode-switch"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    style={{ scale: "1.2" }}
                  />
                </div>

                {/* Notifications switch */}
                <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <Bell size={22} className="text-info" />
                    <div>
                      <div className="fw-bold">E-posta Bildirimleri</div>
                      <small className="text-muted">Analizler tamamlandığında bildirim gönderir.</small>
                    </div>
                  </div>
                  <Form.Check 
                    type="switch"
                    id="notifications-switch"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    style={{ scale: "1.2" }}
                  />
                </div>

                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <Sliders size={18} className="text-primary" />
                  <span>Analiz Varsayılan Parametreleri</span>
                </h6>

                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-6">
                    <Form.Group>
                      <Form.Label className="fw-semibold">Varsayılan p-value Eşiği</Form.Label>
                      <Form.Select 
                        value={defaultPValue} 
                        onChange={(e) => setDefaultPValue(e.target.value)}
                      >
                        <option value="0.05">0.05 (Önerilen)</option>
                        <option value="0.01">0.01</option>
                        <option value="0.001">0.001</option>
                      </Form.Select>
                      <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                        Grafiklerde anlamlı kabul edilecek p-value değeri.
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-12 col-sm-6">
                    <Form.Group>
                      <Form.Label className="fw-semibold">Varsayılan Log2FC Sınırı</Form.Label>
                      <Form.Select 
                        value={defaultLog2FoldChange} 
                        onChange={(e) => setDefaultLog2FoldChange(e.target.value)}
                      >
                        <option value="0.5">0.5</option>
                        <option value="1.0">1.0 (Önerilen)</option>
                        <option value="1.5">1.5</option>
                        <option value="2.0">2.0</option>
                      </Form.Select>
                      <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                        Upregulated/Downregulated kesim eşiği.
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <Button variant="primary" type="submit" className="d-flex align-items-center gap-2 px-4 py-2" disabled={loading}>
                  <Save size={18} />
                  Ayarları Kaydet
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-lg-4">
          <Card className="border-0 shadow-sm bg-danger-subtle bg-opacity-10 border-danger border-opacity-25">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3 text-danger">Oturum İşlemleri</h5>
              <p className="text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                Uygulama oturumunu kapatmak veya başka bir hesapla giriş yapmak istiyorsanız oturumu kapatabilirsiniz.
              </p>
              <Button 
                variant="outline-danger" 
                onClick={handleLogout}
                className="w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <LogOut size={16} /> Oturumu Kapat
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
