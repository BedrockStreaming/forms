import { reducer } from '@bedrockstreaming/form-redux';
import { combineReducers } from 'redux';
import { reducer as generator } from '../generator/generator.reducer';

export const createRootReducer = () =>
  combineReducers({
    forms: reducer,
    generator
  });
