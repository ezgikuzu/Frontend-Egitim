import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider
} from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';

import { addNotification } from '../store/slices/uiSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    name: user?.name || 'CRM Admin',
    email: user?.email || 'admin@crm.com',
    phone: '0555 555 5555' // default mock profile detail
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const errors = {};
    if (!profileData.name.trim()) errors.name = 'Ad Soyad gereklidir.';
    if (!profileData.email.trim()) errors.email = 'E-posta gereklidir.';
    
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Simulate saving profile details
    dispatch(addNotification({ message: 'Profil bilgileri başarıyla güncellendi.', type: 'success' }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Mevcut şifre gereklidir.';
    if (!passwordData.newPassword) errors.newPassword = 'Yeni şifre gereklidir.';
    if (passwordData.newPassword.length < 6) errors.newPassword = 'Şifre en az 6 karakter olmalıdır.';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Şifreler uyuşmuyor.';
    }

    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Simulate saving password
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    dispatch(addNotification({ message: 'Şifreniz başarıyla değiştirildi.', type: 'success' }));
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Profilim</Typography>
        <Typography variant="body2" color="text.secondary">Kişisel bilgilerinizi ve şifrenizi güncelleyin.</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card & Edit Form */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
                  <PersonIcon sx={{ fontSize: 32, color: 'primary.contrastText' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 650 }}>{profileData.name}</Typography>
                  <Typography variant="body2" color="text.secondary">CRM Yöneticisi</Typography>
                </Box>
              </Box>

              <Box component="form" onSubmit={handleSaveProfile} noValidate>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="name"
                      label="Ad Soyad"
                      fullWidth
                      value={profileData.name}
                      onChange={handleProfileChange}
                      error={!!profileErrors.name}
                      helperText={profileErrors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="phone"
                      label="Telefon"
                      fullWidth
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="E-posta"
                      type="email"
                      fullWidth
                      value={profileData.email}
                      onChange={handleProfileChange}
                      error={!!profileErrors.email}
                      helperText={profileErrors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
                      Profil Bilgilerini Kaydet
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Change Password Card */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 44, height: 44 }}>
                  <LockIcon sx={{ fontSize: 22, color: '#fff' }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 650 }}>Şifre Değiştir</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleSavePassword} noValidate>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      name="currentPassword"
                      label="Mevcut Şifre"
                      type="password"
                      fullWidth
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.currentPassword}
                      helperText={passwordErrors.currentPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="newPassword"
                      label="Yeni Şifre"
                      type="password"
                      fullWidth
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.newPassword}
                      helperText={passwordErrors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="confirmPassword"
                      label="Yeni Şifre (Tekrar)"
                      type="password"
                      fullWidth
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.confirmPassword}
                      helperText={passwordErrors.confirmPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="secondary" sx={{ mt: 1 }}>
                      Şifreyi Güncelle
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
