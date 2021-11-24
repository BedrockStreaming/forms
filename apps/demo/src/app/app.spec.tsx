import { render, act, RenderResult } from '@testing-library/react';
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
  let wrapper: RenderResult;

  beforeEach(async () => {
    await act(async () => {
      wrapper = await render(renderWithStore());
    });
  });
  it('should render successfully', () => {
    const { baseElement } = wrapper;

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = wrapper;

    expect(getByText('Welcome to demo!')).toBeTruthy();
  });
});
