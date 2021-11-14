import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import App from './app';

const store = configureStore();

const renderWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(renderWithStore());

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(renderWithStore());

    expect(getByText('Welcome to demo!')).toBeTruthy();
  });
});
