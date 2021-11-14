import { reducer } from '@forms/form-redux';
import { combineReducers } from 'redux';

export const createRootReducer = () =>
  combineReducers({
    forms: reducer
  });
