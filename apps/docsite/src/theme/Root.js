import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import configureStore from '../store/configureStore';

const store = configureStore();

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7a02',
    },
    secondary: {
      main: '#1c1c1c',
    },
  },
});

function Root({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}

export default Root;
