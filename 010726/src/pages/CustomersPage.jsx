import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  NoteAdd as NoteAddIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import {
  fetchCustomers,
  deleteCustomer,
  setCurrentCustomer,
  clearCurrentCustomer,
  fetchNotes,
  addNote
} from '../store/slices/customersSlice';
import { addNotification } from '../store/slices/uiSlice';
import CustomerModal from '../components/CustomerModal';

export default function CustomersPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { items: customers, currentCustomer, notes, status } = useSelector((state) => state.customers);

  // States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [custToDelete, setCustToDelete] = useState(null);

  // Filter States
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterGender, setFilterGender] = useState('All');

  // Notes state
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (location.state) {
      setFilterGroup(location.state.group || 'All');
      setFilterStatus(location.state.status || 'All');
      if (location.state.customerId && customers.length > 0) {
        const found = customers.find(c => c.id === location.state.customerId);
        if (found) {
          dispatch(setCurrentCustomer(found));
        }
      }
    }
  }, [location.state, customers, dispatch]);

  useEffect(() => {
    if (currentCustomer) {
      dispatch(fetchNotes(currentCustomer.id));
    }
  }, [currentCustomer, dispatch]);

  // Handle CRUD
  const handleOpenAddModal = () => {
    setSelectedCust(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (cust) => {
    setSelectedCust(cust);
    setModalOpen(true);
  };

  const handleDeleteClick = (cust) => {
    setCustToDelete(cust);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (custToDelete) {
      dispatch(deleteCustomer(custToDelete.id))
        .unwrap()
        .then(() => {
          dispatch(addNotification({ 
            message: `${custToDelete.title} başarıyla silindi.`, 
            type: 'success',
            redirectTo: '/customers'
          }));
          setDeleteConfirmOpen(false);
          setCustToDelete(null);
        })
        .catch((err) => {
          dispatch(addNotification({ message: `Müşteri silinirken hata oluştu: ${err}`, type: 'error' }));
        });
    }
  };

  const handleSelectCustomerRow = (cust) => {
    dispatch(setCurrentCustomer(cust));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !currentCustomer) return;

    dispatch(addNote({ customerId: currentCustomer.id, text: newNoteText }))
      .unwrap()
      .then(() => {
        setNewNoteText('');
        dispatch(addNotification({ 
          message: 'Not başarıyla eklendi.', 
          type: 'success',
          redirectTo: '/customers',
          actionState: { customerId: currentCustomer.id }
        }));
      })
      .catch((err) => {
        dispatch(addNotification({ message: `Not eklenirken hata oluştu: ${err}`, type: 'error' }));
      });
  };

  // Filter Logic
  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.title.toLowerCase().includes(search.toLowerCase()) ||
      cust.company.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase());

    const matchesGroup = filterGroup === 'All' || cust.group === filterGroup;
    const matchesStatus = filterStatus === 'All' || cust.status === filterStatus;
    const matchesGender = filterGender === 'All' || cust.gender === filterGender;

    return matchesSearch && matchesGroup && matchesStatus && matchesGender;
  });

  const columns = [
    { 
      field: 'title', 
      headerName: 'Müşteri Adı', 
      flex: 1.2, 
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
          <Avatar src={params.row.avatar} sx={{ width: 32, height: 32 }}>
            {params.value.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    { field: 'company', headerName: 'Şirket', flex: 1.2, minWidth: 150 },
    { field: 'email', headerName: 'E-posta', flex: 1.2, minWidth: 180 },
    { field: 'phone', headerName: 'Telefon', flex: 1, minWidth: 120 },
    {
      field: 'group',
      headerName: 'Grup',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => {
        const val = params.value;
        const color = val === 'VIP' ? 'warning' : val === 'Kurumsal' ? 'primary' : 'default';
        return <Chip label={val} size="small" color={color} />;
      }
    },
    { field: 'gender', headerName: 'Cinsiyet', flex: 0.8, minWidth: 100 },
    { field: 'age', headerName: 'Yaş', flex: 0.6, minWidth: 70, type: 'number' },
    {
      field: 'status',
      headerName: 'Durum',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => {
        const isActive = params.value === 'active';
        return (
          <Chip
            label={isActive ? 'Aktif' : 'Pasif'}
            size="small"
            color={isActive ? 'success' : 'default'}
            variant={isActive ? 'filled' : 'outlined'}
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      flex: 1.2,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEditModal(params.row);
            }}
            title="Düzenle"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(params.row);
            }}
            title="Sil"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <Button
            size="small"
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectCustomerRow(params.row);
            }}
            sx={{ fontSize: '11px', py: 0.2 }}
          >
            Notlar
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Müşteri Yönetimi</Typography>
          <Typography variant="body2" color="text.secondary">Müşteri listesini yönetin, filtreleyin ve müşteri notlarını inceleyin.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          sx={{ borderRadius: '10px' }}
        >
          Yeni Müşteri Ekle
        </Button>
      </Box>

      {/* Filter Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Müşteri, Şirket veya E-posta ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2.6}>
              <TextField
                fullWidth
                select
                size="small"
                label="Grup Filtresi"
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
              >
                <MenuItem value="All">Tüm Gruplar</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="Standart">Standart</MenuItem>
                <MenuItem value="Kurumsal">Kurumsal</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2.7}>
              <TextField
                fullWidth
                select
                size="small"
                label="Durum Filtresi"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="All">Tüm Durumlar</MenuItem>
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="passive">Pasif</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2.7}>
              <TextField
                fullWidth
                select
                size="small"
                label="Cinsiyet Filtresi"
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
              >
                <MenuItem value="All">Tüm Cinsiyetler</MenuItem>
                <MenuItem value="Kadın">Kadın</MenuItem>
                <MenuItem value="Erkek">Erkek</MenuItem>
                <MenuItem value="Belirtilmemiş">Belirtilmemiş</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main grid and notes drawer */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={currentCustomer ? 8 : 12}>
          <Paper 
            sx={{ 
              height: 520, 
              width: '100%', 
              boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.03)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <DataGrid
              rows={filteredCustomers}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7, 15, 30]}
              loading={status === 'loading'}
              disableSelectionOnClick
              onRowClick={(params) => handleSelectCustomerRow(params.row)}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell:focus': { outline: 'none' },
                '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'hsl(220, 15%, 11%)' : 'hsl(0, 0%, 96%)',
                  borderBottom: '1px solid rgba(0,0,0,0.08)'
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Side Panel: Customer Notes */}
        {currentCustomer && (
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: 520, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 650 }}>Müşteri Detayları & Notlar</Typography>
                  <IconButton size="small" onClick={() => dispatch(clearCurrentCustomer())}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={currentCustomer.avatar} sx={{ width: 50, height: 50 }}>
                    {currentCustomer.title.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{currentCustomer.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{currentCustomer.company}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      E-posta: {currentCustomer.email} | Tel: {currentCustomer.phone}
                    </Typography>
                  </Box>
                </Box>
                <Divider />

                {/* Notes List */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', my: 2, pr: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>Not Geçmişi</Typography>
                  {notes.length === 0 ? (
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Henüz bir not eklenmemiş.</Typography>
                    </Box>
                  ) : (
                    <List sx={{ p: 0 }}>
                      {notes.map((note) => (
                        <ListItem key={note.id} alignItems="flex-start" sx={{ px: 0, py: 1, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                          <ListItemText
                            primary={note.text}
                            primaryTypographyProps={{ variant: 'body2', sx: { wordBreak: 'break-word' } }}
                            secondary={
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                {note.date} tarihinde eklendi
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Add Note Form */}
                <Box component="form" onSubmit={handleAddNote} sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Yeni not ekleyin..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                  />
                  <IconButton type="submit" color="primary" sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}>
                    <NoteAddIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Reusable Customer Modals */}
      <CustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        customer={selectedCust}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ fontWeight: 650 }}>Müşteriyi Sil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{custToDelete?.title}</strong> isimli müşteriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined" color="inherit">İptal</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
