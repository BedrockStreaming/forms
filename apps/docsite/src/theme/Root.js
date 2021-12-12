import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const store = configureStore();

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB5742'
    },
    secondary: {
      main: '#1c1c1c'
    }
  }
});

function Root({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}

export default Root;
