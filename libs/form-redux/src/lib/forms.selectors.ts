import { DefaultFormState } from './forms.reducer';

const defaultObject = {} as const;

export const getFormData = (formId: string) => (state: { forms: DefaultFormState }) =>
  state.forms?.[formId]?.data || defaultObject;

export const getCurrentStepIndex = (formId: string) => (state: { forms: DefaultFormState }) =>
  state.forms?.[formId]?.currentStepIndex || 0;

export const isLastStep = (formId: string) => (state: { forms: DefaultFormState }) => {
  const value = state.forms[formId]?.isLastStep;
  if (typeof value === 'boolean') {
    return value;
  }

  return true;
};
