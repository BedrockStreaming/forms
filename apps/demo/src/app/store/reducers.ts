import { reducer } from '@bedrockstreaming/form-redux';
import { combineReducers } from 'redux';
import { reducer as generator } from '@bedrockstreaming/form-editor';

export const createRootReducer = () =>
  combineReducers({
    forms: reducer,
    generator
  });
