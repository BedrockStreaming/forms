import deepFreeze from 'deep-freeze';
import {
  reducer,
  initialState,
  DefaultFormState,
  FormAction
} from '../forms.reducer';
import {
  PREVIOUS_STEP,
  NEXT_STEP,
  UPDATE_FORM_DATA,
  INIT_FORM,
  RESET_FORM,
  SET_STEP
} from '../forms.actions';

const formId = 'foo';
const emptyObject = {};
const zero = 0;
const one = 1;
const defaultState = {
  [formId]: {
    data: emptyObject,
    currentStepIndex: zero,
    isLastStep: true,
    stepsCount: 1
  }
};

interface FormValues {
  foo?: string;
  bar?: string;
}

describe('forms.reducer', () => {
  const freezedReducer = (
    state: DefaultFormState<FormValues>,
    action: FormAction
  ) => reducer(deepFreeze(state), action);

  it('should init store', () => {
    expect(reducer(undefined, { type: '@@redux/INIT' })).toEqual(initialState);
  });

  describe(INIT_FORM, () => {
    it('should set a default form state under its formId', () => {
      const action = {
        type: INIT_FORM,
        formId,
        schema: { stepsById: ['foo'] }
      };
      expect(freezedReducer(initialState, action)).toEqual(defaultState);
    });
  });

  describe(PREVIOUS_STEP, () => {
    it('should decrement currentStepIndex', () => {
      const action = {
        type: PREVIOUS_STEP,
        formId
      };

      expect(
        freezedReducer(
          {
            ...defaultState,
            [formId]: { ...defaultState[formId], currentStepIndex: one }
          },
          action
        )
      ).toEqual(defaultState);
    });

    it('should not decrement currentStepIndex when it does not exist', () => {
      const action = {
        type: PREVIOUS_STEP,
        formId
      };

      expect(freezedReducer(initialState, action)).toBe(initialState);
    });

    it('should not decrement currentStepIndex when it is already 0', () => {
      const action = {
        type: PREVIOUS_STEP,
        formId
      };

      expect(freezedReducer(defaultState, action)).toStrictEqual(defaultState);
    });
  });

  describe(NEXT_STEP, () => {
    it('should increment currentStepIndex on multi steps', () => {
      const action = {
        type: NEXT_STEP,
        formId
      };

      const defaultStateWithHigherCount = {
        ...defaultState,
        [formId]: { ...defaultState[formId], stepsCount: 2 }
      };

      expect(freezedReducer(defaultStateWithHigherCount, action)).toEqual({
        ...defaultStateWithHigherCount,
        [formId]: {
          ...defaultStateWithHigherCount[formId],
          currentStepIndex: one,
          isLastStep: true
        }
      });
    });

    it('should not increment currentStepIndex on single step', () => {
      const action = {
        type: NEXT_STEP,
        formId
      };

      expect(freezedReducer(defaultState, action)).toStrictEqual(defaultState);
    });
  });

  describe(RESET_FORM, () => {
    it('should remove the form from the formId', () => {
      const action = {
        type: RESET_FORM,
        formId
      };

      expect(
        freezedReducer(
          {
            ...defaultState,
            [formId]: { ...defaultState[formId], currentStepIndex: one }
          },
          action
        )
      ).toEqual(initialState);
    });
  });

  describe(UPDATE_FORM_DATA, () => {
    it('should set data under formId when it is empty yet', () => {
      const action = {
        type: UPDATE_FORM_DATA,
        formId,
        data: { foo: 'bar' }
      };

      expect(freezedReducer(defaultState, action)).toEqual({
        ...defaultState,
        [formId]: { ...defaultState[formId], data: action.data }
      });
    });

    it('should update data under formId', () => {
      const action = {
        type: UPDATE_FORM_DATA,
        formId,
        data: { bar: 'baz' }
      };

      const state = {
        ...defaultState,
        [formId]: { ...defaultState[formId], data: { foo: 'bar' } }
      };

      expect(freezedReducer(state, action)).toEqual({
        ...defaultState,
        [formId]: {
          ...defaultState[formId],
          data: { ...state[formId].data, ...action.data }
        }
      });
    });
  });

  describe(SET_STEP, () => {
    it('should return state when passed index is above stepsCount', () => {
      const action = {
        type: SET_STEP,
        formId,
        stepIndex: 666
      };

      expect(freezedReducer(defaultState, action)).toEqual(defaultState);
    });

    describe('on single step', () => {
      it('should set step to given stepIndex and redefine isLastStep', () => {
        const action = {
          type: SET_STEP,
          formId,
          stepIndex: 0
        };

        expect(freezedReducer(defaultState, action)).toEqual({
          ...defaultState,
          [formId]: {
            ...defaultState[formId],
            currentStepIndex: action.stepIndex,
            isLastStep: true
          }
        });
      });
    });

    describe('on multi steps', () => {
      it('should set step to given stepIndex and redefine isLastStep', () => {
        const action = {
          type: SET_STEP,
          formId,
          stepIndex: 0
        };

        const defaultStateWithHigherCount = {
          ...defaultState,
          [formId]: { ...defaultState[formId], stepsCount: 2 }
        };

        expect(freezedReducer(defaultStateWithHigherCount, action)).toEqual({
          ...defaultStateWithHigherCount,
          [formId]: {
            ...defaultStateWithHigherCount[formId],
            currentStepIndex: action.stepIndex,
            isLastStep: false
          }
        });
      });
    });
  });
});
