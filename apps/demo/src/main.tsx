import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './app/app';

import configureStore from './app/store/configureStore';

const store = configureStore();

const theme = {};

ReactDOM.render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
