/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { createRootReducer } from './reducers';

const windowProxy = typeof window === 'undefined' ? {} : window;
const composeEnhancers =
  windowProxy.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
    ? windowProxy.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default function configureStore(preloadedState = {}) {
  const store = createStore(createRootReducer(), preloadedState, composeEnhancers(applyMiddleware(thunk)));

  return store;
}
