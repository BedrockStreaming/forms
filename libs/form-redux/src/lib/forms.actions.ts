import { FormSchema } from '@forms/form-builder';

export const INIT_FORM = 'forms/INIT_FORM';
export const initForm = (formId: string, schema: FormSchema) => ({
  type: INIT_FORM,
  formId,
  schema
});

export const NEXT_STEP = 'forms/NEXT_STEP';
export const setNextStep = (formId: string) => ({ type: NEXT_STEP, formId });

export const PREVIOUS_STEP = 'forms/PREVIOUS_STEP';
export const setPreviousStep = (formId: string) => ({
  type: PREVIOUS_STEP,
  formId
});

export const UPDATE_FORM_DATA = 'forms/UPDATE_FORM_DATA';
export const updateFormData = <T>(formId: string, data: T) => ({
  type: UPDATE_FORM_DATA,
  formId,
  data
});

export const RESET_FORM = 'forms/RESET_FORM';
export const resetForm = (formId: string) => ({ type: RESET_FORM, formId });

export const SET_STEP = 'forms/SET_STEP';
export const setStep = (formId: string, stepIndex: number) => ({
  type: SET_STEP,
  formId,
  stepIndex
});
