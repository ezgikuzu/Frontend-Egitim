import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

import { toggleDarkMode, toggleSidebar, clearNotifications, markAllNotificationsAsRead } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';

const DRAWER_WIDTH = 260;

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const { darkMode, sidebarOpen, notifications } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  // Notifications Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const isNotificationsOpen = Boolean(anchorEl);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(markAllNotificationsAsRead());
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const handleClearNotifications = () => {
    dispatch(clearNotifications());
    handleNotificationsClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: 'Müşteriler', path: '/customers', icon: <PeopleIcon /> },
    { text: 'Profil', path: '/profile', icon: <PersonIcon /> },
    { text: 'Ayarlar', path: '/settings', icon: <SettingsIcon /> },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      
      {/* Header (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(toggleSidebar())}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
              Mini <span style={{ color: 'hsl(125, 85%, 56%)' }}>CRM</span>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle */}
            <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Notifications */}
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Notifications Menu */}
            <Menu
              anchorEl={anchorEl}
              open={isNotificationsOpen}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: {
                  width: 320,
                  maxHeight: 400,
                  mt: 1.5,
                  boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Bildirimler</Typography>
                {notifications.length > 0 && (
                  <Button size="small" onClick={handleClearNotifications} sx={{ color: 'text.secondary' }}>
                    Temizle
                  </Button>
                )}
              </Box>
              <Divider />
              {notifications.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Yeni bildirim bulunmuyor.</Typography>
                </Box>
              ) : (
                notifications.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    onClick={() => {
                      handleNotificationsClose();
                      if (item.redirectTo) {
                        navigate(item.redirectTo, { state: item.actionState });
                      }
                    }} 
                    sx={{ 
                      py: 1.5, 
                      borderBottom: '1px solid rgba(0,0,0,0.04)',
                      cursor: item.redirectTo ? 'pointer' : 'default'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: item.read ? 400 : 600 }}>
                        {item.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.type.toUpperCase()}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Menu>

            {/* User Profile Info */}
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, gap: 1 }}>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
                  {user.name}
                </Typography>
                <IconButton color="inherit" onClick={handleLogout} title="Çıkış Yap">
                  <LogoutIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        <Box sx={{ height: 64 }} />
        <Divider />
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    dispatch(toggleSidebar());
                  }}
                  selected={isSelected}
                  sx={{
                    borderRadius: '8px',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                      '&:hover': { bgcolor: 'primary.main' }
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: isSelected ? 'inherit' : 'text.secondary', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isSelected ? 600 : 400 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: sidebarOpen ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            transform: sidebarOpen ? 'none' : `translateX(-${DRAWER_WIDTH}px)`,
            transition: theme.transitions.create(['transform', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box sx={{ height: 64 }} />
        <Divider />
        <List sx={{ px: 1.5, py: 2 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.8 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isSelected}
                  sx={{
                    borderRadius: '10px',
                    py: 1.2,
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                      '&:hover': { bgcolor: 'primary.main' }
                    },
                    '&:hover': {
                      bgcolor: isSelected ? 'primary.main' : 'rgba(0,0,0,0.04)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <ListItemIcon sx={{ color: isSelected ? 'inherit' : 'text.secondary', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isSelected ? 600 : 500 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mt: 8
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
