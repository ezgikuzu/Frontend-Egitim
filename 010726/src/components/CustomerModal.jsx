import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  IconButton,
  Typography,
  Divider,
  Avatar
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { addCustomer, updateCustomer } from '../store/slices/customersSlice';
import { addNotification } from '../store/slices/uiSlice';

const groups = ['VIP', 'Standart', 'Kurumsal'];
const statuses = [
  { value: 'active', label: 'Aktif' },
  { value: 'passive', label: 'Pasif' }
];
const genders = ['Kadın', 'Erkek', 'Belirtilmemiş'];

export default function CustomerModal({ open, onClose, customer }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    email: '',
    phone: '',
    status: 'active',
    group: 'Standart',
    age: '',
    gender: 'Belirtilmemiş',
    avatar: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        title: customer.title || '',
        company: customer.company || '',
        email: customer.email || '',
        phone: customer.phone || '',
        status: customer.status || 'active',
        group: customer.group || 'Standart',
        age: customer.age || '',
        gender: customer.gender || 'Belirtilmemiş',
        avatar: customer.avatar || ''
      });
    } else {
      setFormData({
        title: '',
        company: '',
        email: '',
        phone: '',
        status: 'active',
        group: 'Standart',
        age: '',
        gender: 'Belirtilmemiş',
        avatar: ''
      });
    }
    setErrors({});
  }, [customer, open]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        dispatch(addNotification({ message: 'Lütfen geçerli bir görsel dosyası seçin.', type: 'error' }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        dispatch(addNotification({ message: 'Görsel boyutu en fazla 2MB olabilir.', type: 'error' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Müşteri adı gereklidir.';
    if (!formData.company.trim()) newErrors.company = 'Şirket adı gereklidir.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçersiz e-posta formatı.';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Telefon numarası gereklidir.';

    if (formData.age !== '') {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        newErrors.age = 'Geçersiz yaş.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dataToSubmit = {
      ...formData,
      age: formData.age !== '' ? parseInt(formData.age, 10) : null
    };

    if (customer) {
      dispatch(updateCustomer({ id: customer.id, data: dataToSubmit }))
        .unwrap()
        .then((res) => {
          dispatch(addNotification({ 
            message: `${formData.title} başarıyla güncellendi.`, 
            type: 'success',
            redirectTo: '/customers',
            actionState: { customerId: res.id }
          }));
          onClose();
        })
        .catch((err) => {
          dispatch(addNotification({ message: `Güncelleme hatası: ${err}`, type: 'error' }));
        });
    } else {
      dispatch(addCustomer(dataToSubmit))
        .unwrap()
        .then((res) => {
          dispatch(addNotification({ 
            message: `${formData.title} başarıyla eklendi.`, 
            type: 'success',
            redirectTo: '/customers',
            actionState: { customerId: res.id }
          }));
          onClose();
        })
        .catch((err) => {
          dispatch(addNotification({ message: `Ekleme hatası: ${err}`, type: 'error' }));
        });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0px 10px 40px rgba(0,0,0,0.15)',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 650 }}>
          {customer ? 'Müşteriyi Düzenle' : 'Yeni Müşteri Ekle'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 1 }}>
              <Avatar src={formData.avatar} sx={{ width: 56, height: 56 }}>
                {formData.title ? formData.title.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'M'}
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                >
                  Fotoğraf Yükle
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Maksimum 2MB görsel seçebilirsiniz.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="avatar"
                label="Veya Fotoğraf Web Adresi (URL)"
                fullWidth
                value={formData.avatar && !formData.avatar.startsWith('data:') ? formData.avatar : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                placeholder="https://example.com/gorsel.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Müşteri Ad Soyad"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="company"
                label="Şirket"
                fullWidth
                required
                value={formData.company}
                onChange={handleChange}
                error={!!errors.company}
                helperText={errors.company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Telefon"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="E-posta"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="group"
                select
                label="Müşteri Grubu"
                fullWidth
                value={formData.group}
                onChange={handleChange}
              >
                {groups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="status"
                select
                label="Durum"
                fullWidth
                value={formData.status}
                onChange={handleChange}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Yaş"
                type="number"
                fullWidth
                value={formData.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gender"
                select
                label="Cinsiyet"
                fullWidth
                value={formData.gender}
                onChange={handleChange}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5, gap: 1.5 }}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            İptal
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {customer ? 'Değişiklikleri Kaydet' : 'Müşteriyi Kaydet'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
