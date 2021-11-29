import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FORMS_FEATURE_KEY = 'forms';

/*
 * Update these interfaces according to your requirements.
 */
export interface FormsEntity {
  id: number;
}

export interface FormsState extends EntityState<FormsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const formsAdapter = createEntityAdapter<FormsEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchForms())
 * }, [dispatch]);
 * ```
 */
export const fetchForms = createAsyncThunk(
  'forms/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getFormss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialFormsState: FormsState = formsAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const formsSlice = createSlice({
  name: FORMS_FEATURE_KEY,
  initialState: initialFormsState,
  reducers: {
    add: formsAdapter.addOne,
    remove: formsAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state: FormsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchForms.fulfilled,
        (state: FormsState, action: PayloadAction<FormsEntity[]>) => {
          formsAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchForms.rejected, (state: FormsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const formsReducer = formsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(formsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const formsActions = formsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllForms);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = formsAdapter.getSelectors();

export const getFormsState = (rootState: unknown): FormsState =>
  rootState[FORMS_FEATURE_KEY];

export const selectAllForms = createSelector(getFormsState, selectAll);

export const selectFormsEntities = createSelector(
  getFormsState,
  selectEntities
);
