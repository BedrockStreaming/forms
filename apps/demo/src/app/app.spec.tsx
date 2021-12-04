import { render, act, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './store/configureStore';

import App from './app';

const store = configureStore();

const renderWithStore = () => (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
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

  it('should display the organisation and repo name', () => {
    const { getByText } = wrapper;

    expect(getByText('@BedrockStreaming/forms')).toBeTruthy();
  });
});
