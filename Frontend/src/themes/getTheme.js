import { createTheme } from '@mui/material/styles'

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9C27B0',
        light: '#CE93D8',
        dark: '#7B1FA2',
        contrastText: '#fff',
      },
      error: {
        main: '#EF5350',
        light: '#E57373',
        dark: '#C62828',
        contrastText: '#fff',
      },
      warning: {
        main: '#FFC107',
        light: '#FFD54F',
        dark: '#FF8F00',
        contrastText: '#212121',
      },
      info: {
        main: '#03A9F4',
        light: '#4FC3F7',
        dark: '#0288D1',
        contrastText: '#fff',
      },
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
        contrastText: '#fff',
      },
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#212121' : '#ffffff',
        secondary: mode === 'light' ? '#757575' : '#BDBDBD',
        disabled: '#BDBDBD',
      },
      action: {
        active: '#1976D2',
        hover: '#E3F2FD',
        selected: '#BBDEFB',
        disabled: '#BDBDBD',
        disabledBackground: '#E0E0E0',
      },
    },
    typography: {
      fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      h1: { fontSize: '3rem', fontWeight: 700 },
      h2: { fontSize: '2.5rem', fontWeight: 700 },
      h3: { fontSize: '2rem', fontWeight: 600 },
      h4: { fontSize: '1.75rem', fontWeight: 600 },
      h5: { fontSize: '1.5rem', fontWeight: 500 },
      h6: { fontSize: '1.25rem', fontWeight: 500 },
      body1: { fontSize: '1rem' },
      body2: { fontSize: '0.9rem' },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#1e1e1e',
            color: mode === 'light' ? '#212121' : '#fff',
            boxShadow: 'none',
            borderBottom: '1px solid #E0E0E0',
            borderRadius: 0,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'light' ? '#212121' : '#333',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#E3F2FD',
              color: '#1976D2',
              '&:hover': {
                backgroundColor: '#BBDEFB',
              },
            },
            '&.Mui-selected .MuiListItemIcon-root': {
              color: '#1976D2',
            },
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
          containedPrimary: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
          },
        },
      },
    },
  })
