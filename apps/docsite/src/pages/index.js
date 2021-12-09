import React from 'react';
import { Provider } from 'react-redux';
// import configureStore from '../store/configureStore';
import Home from './home/home.component';

// const store = configureStore();

function App() {
  return (
    // <Provider store={store}>
    <Home />
    // </Provider>
  );
}

export default App;
