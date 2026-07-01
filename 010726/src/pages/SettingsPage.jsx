import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Divider,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Brightness4 as ThemeIcon,
  NotificationsActive as NotificationIcon,
  ExitToApp as LogoutIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

import { toggleDarkMode, addNotification } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.ui);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    const modeName = !darkMode ? 'Koyu' : 'Açık';
    dispatch(addNotification({ 
      message: `${modeName} tema aktif edildi.`, 
      type: 'info',
      redirectTo: '/settings'
    }));
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    dispatch(addNotification({ 
      message: `Sistem bildirimleri ${!notificationsEnabled ? 'açıldı' : 'kapatıldı'}.`, 
      type: 'info',
      redirectTo: '/settings'
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Ayarlar</Typography>
        <Typography variant="body2" color="text.secondary">Uygulama ayarlarını ve tercihlerinizi yönetin.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 650, mb: 3 }}>Görünüm ve Tema</Typography>
              
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <ThemeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Koyu Tema (Dark Mode)" 
                    secondary="Karanlık veya loş ortamlarda rahat bir kullanım sunar."
                  />
                  <Switch
                    edge="end"
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 650, mb: 3 }}>Bildirim Tercihleri</Typography>
              
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <NotificationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Sistem Bildirimleri" 
                    secondary="İşlem sonuçları ve güncellemeler hakkında anlık bildirim alırsınız."
                  />
                  <Switch
                    edge="end"
                    checked={notificationsEnabled}
                    onChange={handleNotificationsToggle}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 650, mb: 1, color: 'error.main' }}>Oturumu Kapat</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Aktif cihazınızdaki oturumunuzu güvenli bir şekilde sonlandırabilirsiniz.
              </Typography>
              <Button 
                variant="contained" 
                color="error" 
                startIcon={<LogoutIcon />} 
                onClick={handleLogout}
                sx={{ borderRadius: '8px' }}
              >
                Çıkış Yap
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
