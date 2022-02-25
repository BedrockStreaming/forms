import { DefaultFormState } from './forms.reducer';
import { FieldValues } from 'react-hook-form';

const defaultData = {} as FieldValues;

export const getFormData = (formId: string) => (state: DefaultFormState) => state?.[formId]?.data || defaultData;

export const getCurrentStepIndex = (formId: string) => (state: DefaultFormState) =>
  state?.[formId]?.currentStepIndex || 0;

export const isLastStep = (formId: string) => (state: DefaultFormState) => {
  const value = state?.[formId]?.isLastStep;
  if (typeof value === 'boolean') {
    return value;
  }

  return true;
};
