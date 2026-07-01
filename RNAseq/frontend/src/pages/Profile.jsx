import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../store/authSlice";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { User, Mail, School, Lock, Save, CheckCircle } from "lucide-react";

export const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [institution, setInstitution] = useState(user?.institution || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [successMsg, setSuccessMsg] = useState("");
  const [localError, setLocalError] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setLocalError("");

    if (!name || !email) {
      setLocalError("İsim ve e-posta alanları zorunludur.");
      return;
    }

    const updateData = { name, email, institution };
    
    try {
      await dispatch(updateUserProfile({ userId: user.id, data: updateData })).unwrap();
      setSuccessMsg("Profil bilgileriniz başarıyla güncellendi.");
    } catch (err) {
      setLocalError(err || "Profil güncellenemedi.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setLocalError("");

    if (!password) {
      setLocalError("Şifre boş olamaz.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Girilen şifreler eşleşmiyor.");
      return;
    }

    try {
      await dispatch(updateUserProfile({ userId: user.id, data: { password } })).unwrap();
      setSuccessMsg("Şifreniz başarıyla değiştirildi.");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setLocalError(err || "Şifre değiştirilemedi.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Profil Ayarlarım</h2>
        <p className="text-muted mb-0">Hesap bilgilerinizi ve şifrenizi bu sayfadan güncelleyebilirsiniz.</p>
      </div>

      <div className="row g-4">
        {/* Profile Info Card */}
        <div className="col-12 col-lg-6">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <User className="text-primary" size={20} />
                <span>Genel Kullanıcı Bilgileri</span>
              </h5>

              {successMsg && !password && (
                <Alert variant="success" className="d-flex align-items-center">
                  <CheckCircle size={18} className="me-2" />
                  <div>{successMsg}</div>
                </Alert>
              )}

              {localError && !password && (
                <Alert variant="danger">
                  {localError}
                </Alert>
              )}

              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tam Adınız</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      className="border-start-0 ps-0"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">E-posta Adresi</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <Mail size={16} className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      className="border-start-0 ps-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Çalıştığınız Kurum / Laboratuvar</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <School size={16} className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      className="border-start-0 ps-0"
                      placeholder="Kurum adı girilmemiş..."
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="d-flex align-items-center gap-2 px-4 py-2" disabled={loading}>
                  <Save size={18} />
                  Değişiklikleri Kaydet
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        {/* Change Password Card */}
        <div className="col-12 col-lg-6">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <Lock className="text-danger" size={20} />
                <span>Şifre Değiştir</span>
              </h5>

              {successMsg && password && (
                <Alert variant="success" className="d-flex align-items-center">
                  <CheckCircle size={18} className="me-2" />
                  <div>{successMsg}</div>
                </Alert>
              )}

              {localError && password && (
                <Alert variant="danger">
                  {localError}
                </Alert>
              )}

              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Yeni Şifre</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <Form.Control
                      type="password"
                      className="border-start-0 ps-0"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Yeni Şifre (Tekrar)</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <Form.Control
                      type="password"
                      className="border-start-0 ps-0"
                      placeholder="••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Button variant="danger" type="submit" className="d-flex align-items-center gap-2 px-4 py-2" disabled={loading}>
                  <Lock size={18} />
                  Şifreyi Güncelle
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
