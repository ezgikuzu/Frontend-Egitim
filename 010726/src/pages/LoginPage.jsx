import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Visibility, VisibilityOff } from '@mui/icons-material';

import { login, clearError } from '../store/slices/authSlice';
import { addNotification } from '../store/slices/uiSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('admin@crm.com'); // default mock credential
  const [password, setPassword] = useState('password123'); // default mock credential
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Redirect if already logged in
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [token, navigate, from, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email.trim() || !password.trim()) {
      setValidationError('Lütfen tüm alanları doldurun.');
      return;
    }

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        dispatch(addNotification({ message: `Hoş geldiniz, ${res.user.name}!`, type: 'success' }));
      })
      .catch(() => {
        // error handled in slice
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, hsl(220, 15%, 13%) 0%, hsl(220, 15%, 8%) 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Blur Circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(125, 85%, 56%, 0.15) 0%, rgba(0,0,0,0) 70%)',
          top: '10%',
          left: '15%',
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(173, 72%, 42%, 0.1) 0%, rgba(0,0,0,0) 70%)',
          bottom: '10%',
          right: '15%',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />

      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          zIndex: 1,
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          borderRadius: '24px',
          overflow: 'hidden',
          '&:hover': {
            transform: 'none', // Disable the normal MuiCard hover translation
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', mb: 1 }}>
              Mini <span style={{ color: 'hsl(125, 85%, 56%)' }}>CRM</span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Müşteri yönetim sistemine giriş yapın
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {(validationError || error) && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                {validationError || error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                    <EmailIcon />
                  </InputAdornment>
                ),
                sx: {
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                }
              }}
              InputLabelProps={{
                sx: { color: 'rgba(255,255,255,0.5)' }
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                }
              }}
              InputLabelProps={{
                sx: { color: 'rgba(255,255,255,0.5)' }
              }}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={status === 'loading'}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '12px',
                background: 'linear-gradient(90deg, hsl(125, 85%, 56%) 0%, hsl(173, 72%, 42%) 100%)',
                color: '#121212',
                '&:hover': {
                  background: 'linear-gradient(90deg, hsl(125, 85%, 60%) 0%, hsl(173, 72%, 48%) 100%)',
                }
              }}
            >
              {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
