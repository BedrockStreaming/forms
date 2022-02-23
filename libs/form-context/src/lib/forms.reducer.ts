import { FormSchema } from '@bedrockstreaming/form-builder';
import { FieldValues } from 'react-hook-form';

import { PREVIOUS_STEP, NEXT_STEP, UPDATE_FORM_DATA, INIT_FORM, RESET_FORM, SET_STEP } from './forms.actions';

export interface DefaultFormState {
  [key: string]: {
    stepsCount: number;
    isLastStep: boolean;
    currentStepIndex: number;
    data: FieldValues;
  };
}

export interface FormAction {
  type: string;
  formId: string;
  data?: {
    [key: string]: unknown;
  };
  schema?: FormSchema;
  [key: string]: unknown;
}

const defaultFormState = {
  stepsCount: 1,
  isLastStep: true,
  currentStepIndex: 0,
  data: {},
};

const DEFAULT_OBJECT = {} as const;
export const initialState = {} as DefaultFormState;

const checkFormId = ({ formId }: FormAction) => !!formId;
const checkFormExist = ({ formId }: FormAction, state: DefaultFormState) => !!state[formId];
const checkStepExist = (stepsCount: number, newStepIndex: number) => newStepIndex + 1 <= stepsCount;

export const reducer = (state = initialState, action: FormAction) => {
  switch (action.type) {
    case INIT_FORM: {
      if (!checkFormId(action) || checkFormExist(action, state)) {
        return state;
      }

      const stepsById = action?.schema?.stepsById || ([] as string[]);
      const currentFormState = {
        ...defaultFormState,
        stepsCount: stepsById.length,
        isLastStep: stepsById.length === 1,
      };

      return {
        ...state,
        [action.formId]: currentFormState,
      };
    }

    case PREVIOUS_STEP: {
      if (!checkFormId(action)) {
        return state;
      }
      if (!checkFormExist(action, state)) {
        return state;
      }

      const formState = state?.[action.formId] || DEFAULT_OBJECT;
      const currentStepIndex = state?.[action.formId]?.currentStepIndex || 0;
      const stepsCount = state?.[action.formId]?.stepsCount || 1;

      // Can't go under 0
      const newStepIndex = currentStepIndex <= 0 ? 0 : currentStepIndex - 1;

      return {
        ...state,
        [action.formId]: {
          ...formState,
          isLastStep: stepsCount === newStepIndex + 1,
          currentStepIndex: newStepIndex,
        },
      };
    }

    case NEXT_STEP: {
      if (!checkFormId(action)) {
        return state;
      }
      if (!checkFormExist(action, state)) {
        return state;
      }

      const formState = state?.[action.formId] || DEFAULT_OBJECT;
      const currentStepIndex = state?.[action.formId]?.currentStepIndex || 0;
      const stepsCount = state?.[action.formId]?.stepsCount || 1;

      // Can't go above steps count
      const newStepIndex = currentStepIndex >= stepsCount - 1 ? stepsCount - 1 : currentStepIndex + 1;

      return {
        ...state,
        [action.formId]: {
          ...formState,
          isLastStep: stepsCount === newStepIndex + 1,
          currentStepIndex: newStepIndex,
        },
      };
    }

    case UPDATE_FORM_DATA: {
      if (!checkFormId(action)) {
        return state;
      }
      if (!checkFormExist(action, state)) {
        return state;
      }

      const formState = state?.[action.formId];

      if (!formState) return state;

      return {
        ...state,
        [action.formId]: {
          ...formState,
          data: {
            ...formState.data,
            ...action.data,
          },
        },
      };
    }

    case RESET_FORM: {
      if (!checkFormId(action)) {
        return state;
      }
      if (!checkFormExist(action, state)) {
        return state;
      }

      const { [action.formId]: targetForm, ...resetState } = state;

      return resetState;
    }

    case SET_STEP: {
      if (!checkFormId(action)) {
        return state;
      }
      if (!checkFormExist(action, state)) {
        return state;
      }

      const newStepIndex = typeof action.stepIndex === 'number' ? action.stepIndex : 0;
      const stepsCount = state?.[action.formId]?.stepsCount || 1;

      if (!checkStepExist(stepsCount, newStepIndex)) {
        return state;
      }

      const formState = state?.[action.formId] || DEFAULT_OBJECT;

      return {
        ...state,
        [action.formId]: {
          ...formState,
          isLastStep: stepsCount === newStepIndex + 1,
          currentStepIndex: newStepIndex % stepsCount,
        },
      };
    }
    default:
      return state;
  }
};
