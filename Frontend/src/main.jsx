import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './stores';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/themes/theme'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <BrowserRouter> 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
        </BrowserRouter>
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);