import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: 'hsl(125, 85%, 56%)', // Greenish-blue brand primary
        contrastText: '#121212',
      },
      secondary: {
        main: 'hsl(173, 72%, 42%)', // Refreshing Turquoise
      },
      background: {
        default: darkMode ? 'hsl(220, 15%, 13%)' : 'hsl(0, 0%, 98%)',
        paper: darkMode ? 'hsl(220, 15%, 16%)' : 'hsl(0, 0%, 100%)',
      },
      text: {
        primary: darkMode ? 'hsl(210, 40%, 98%)' : 'hsl(217, 19%, 27%)',
        secondary: darkMode ? 'hsl(210, 20%, 75%)' : 'hsl(217, 10%, 45%)',
      },
      success: {
        main: 'hsl(145, 63%, 43%)',
      },
      warning: {
        main: 'hsl(38, 92%, 50%)',
      },
      error: {
        main: 'hsl(0, 72%, 51%)',
      },
      info: {
        main: 'hsl(203, 89%, 53%)',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backdropFilter: 'blur(12px)',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(28, 33, 44, 0.75)' 
              : 'rgba(255, 255, 255, 0.75)',
            border: `1px solid ${
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(0, 0, 0, 0.08)'
            }`,
            borderRadius: '16px',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 20px 0 rgba(0, 0, 0, 0.3)'
              : '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 30px 0 rgba(0, 0, 0, 0.4)'
                : '0 8px 30px 0 rgba(0, 0, 0, 0.08)',
            }
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backdropFilter: 'blur(12px)',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(28, 33, 44, 0.7)'
              : 'rgba(255, 255, 255, 0.7)',
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)'
            }`,
            boxShadow: 'none',
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark'
              ? 'hsl(220, 15%, 11%)'
              : 'hsl(0, 0%, 100%)',
            borderRight: `1px solid ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)'
            }`,
          }),
        },
      },
    },
  });
};
