import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as ActiveIcon,
  RemoveCircle as PassiveIcon,
  TrendingUp as TrendIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

import { fetchCustomers } from '../store/slices/customersSlice';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: customers, status } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const totalCount = customers.length;
  const activeCount = customers.filter(c => c.status === 'active').length;
  const passiveCount = customers.filter(c => c.status === 'passive').length;
  const vipCount = customers.filter(c => c.group === 'VIP').length;

  // Get last 4 added customers
  const recentCustomers = [...customers]
    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
    .slice(0, 4);

  const getMonthlyData = () => {
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const counts = {};
    monthNames.forEach(m => { counts[m] = 0; });
    
    customers.forEach(cust => {
      if (cust.createAt) {
        const date = new Date(cust.createAt);
        const monthIndex = date.getMonth();
        if (monthIndex >= 0 && monthIndex < 12) {
          const monthName = monthNames[monthIndex];
          counts[monthName] += 1;
        }
      }
    });

    const currentMonth = new Date().getMonth();
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const idx = (currentMonth - i + 12) % 12;
      const mName = monthNames[idx];
      last6Months.push({
        month: mName,
        count: counts[mName]
      });
    }

    const maxCount = Math.max(...last6Months.map(m => m.count), 1);
    
    return last6Months.map(m => ({
      month: m.month,
      count: m.count,
      heightPct: Math.max((m.count / maxCount) * 100, 6)
    }));
  };

  const monthlyData = getMonthlyData();

  const kpis = [
    {
      title: 'Toplam Müşteri',
      value: totalCount,
      icon: <PeopleIcon sx={{ fontSize: 32 }} />,
      color: 'hsl(203, 89%, 53%)',
      desc: 'Sistemde kayıtlı toplam firma/kişi',
      filterState: null
    },
    {
      title: 'Aktif Müşteriler',
      value: activeCount,
      icon: <ActiveIcon sx={{ fontSize: 32 }} />,
      color: 'hsl(145, 63%, 43%)',
      desc: 'Aktif görüşme veya iş yapılan',
      filterState: { status: 'active' }
    },
    {
      title: 'Pasif Müşteriler',
      value: passiveCount,
      icon: <PassiveIcon sx={{ fontSize: 32 }} />,
      color: 'hsl(0, 72%, 51%)',
      desc: 'Beklemede olan veya pasif',
      filterState: { status: 'passive' }
    },
    {
      title: 'VIP Müşteriler',
      value: vipCount,
      icon: <TrendIcon sx={{ fontSize: 32 }} />,
      color: 'hsl(38, 92%, 50%)',
      desc: 'Özel öncelikli müşteri grubu',
      filterState: { group: 'VIP' }
    }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Gösterge Paneli</Typography>
          <Typography variant="body2" color="text.secondary">Mini CRM uygulamanızın anlık veri ve istatistikleri.</Typography>
        </Box>
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/customers')}
          sx={{ borderRadius: '10px' }}
        >
          Müşterileri Yönet
        </Button>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.title}>
            <Card 
              onClick={() => navigate('/customers', { state: kpi.filterState })}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {kpi.title}
                  </Typography>
                  <Avatar sx={{ bgcolor: `${kpi.color}15`, color: kpi.color, width: 48, height: 48 }}>
                    {kpi.icon}
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {status === 'loading' ? '...' : kpi.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {kpi.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Mock Chart Area */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 650, mb: 3 }}>Müşteri Kazanım Trendi</Typography>
              
              <Box sx={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2, pb: 1 }}>
                {monthlyData.map((bar, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      flex: 1, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'flex-end', 
                      alignItems: 'center', 
                      gap: 0.5 
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600, opacity: bar.count > 0 ? 0.9 : 0.2, fontSize: '11px' }}>
                      {bar.count} Müşteri
                    </Typography>
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: `${bar.heightPct * 0.7}%`, 
                        background: bar.count > 0
                          ? 'linear-gradient(180deg, hsl(125, 85%, 56%) 0%, hsl(173, 72%, 42%) 100%)'
                          : (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        borderRadius: '6px 6px 0 0',
                        opacity: 0.85,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 1,
                          transform: 'scaleY(1.05)',
                        }
                      }} 
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px', mt: 0.5 }}>{bar.month}</Typography>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Geçen aya göre müşteri artış oranı: <strong>+20%</strong>
                </Typography>
                <Box sx={{ width: 100 }}>
                  <LinearProgress variant="determinate" value={80} sx={{ height: 6, borderRadius: 3 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Customers List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 650, mb: 2 }}>Son Eklenen Müşteriler</Typography>
              
              {status === 'loading' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                  <LinearProgress sx={{ width: '100%' }} />
                </Box>
              ) : recentCustomers.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, py: 5 }}>
                  <Typography variant="body2" color="text.secondary">Kayıtlı müşteri bulunamadı.</Typography>
                </Box>
              ) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, flexGrow: 1 }}>
                  {recentCustomers.map((cust, index) => (
                    <React.Fragment key={cust.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar 
                            src={cust.avatar}
                            sx={{ bgcolor: 'secondary.main', color: '#fff', fontSize: '14px', fontWeight: 600 }}
                          >
                            {cust.title.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{cust.title}</Typography>
                              <Chip 
                                label={cust.group} 
                                size="small" 
                                color={cust.group === 'VIP' ? 'warning' : cust.group === 'Kurumsal' ? 'primary' : 'default'}
                                sx={{ height: 18, fontSize: '10px' }} 
                              />
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="caption" sx={{ display: 'block' }} color="text.secondary">
                                {cust.company}
                              </Typography>
                              <Typography component="span" variant="caption" color="text.secondary">
                                {cust.createAt} tarihinde eklendi
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index < recentCustomers.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 7 }} />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
