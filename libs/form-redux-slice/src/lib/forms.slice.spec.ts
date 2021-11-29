import { fetchForms, formsAdapter, formsReducer } from './forms.slice';

describe('forms reducer', () => {
  it('should handle initial state', () => {
    const expected = formsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(formsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchFormss', () => {
    let state = formsReducer(undefined, fetchForms.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = formsReducer(state, fetchForms.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = formsReducer(
      state,
      fetchForms.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
