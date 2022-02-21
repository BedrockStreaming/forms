// eslint-disable-next-line import/no-unresolved
import { reducer } from '@bedrockstreaming/form-redux';
import { combineReducers } from 'redux';

export const createRootReducer = () =>
  combineReducers({
    forms: reducer,
  });
