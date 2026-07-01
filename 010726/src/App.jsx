import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from './store';
import { getTheme } from './theme/theme';
import AppRoutes from './routes/AppRoutes';

function MainApp() {
  const { darkMode } = useSelector((state) => state.ui);
  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </Provider>
  );
}
