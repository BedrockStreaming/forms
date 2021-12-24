import { FormFields, FormSteps } from '@bedrockstreaming/form-builder';

export const ADD_FIELD = 'generator/ADD_FIELD';
export const addField = (payload: FormFields) => ({ type: ADD_FIELD, payload });

export const ADD_STEP = 'generator/ADD_STEP';
export const addStep = (payload: FormSteps) => ({ type: ADD_STEP, payload });

export const ADD_FORM_ID = 'generator/ADD_FORM_ID';
export const addFormId = (payload: string) => ({ type: ADD_FORM_ID, payload });

export const ADD_SCHEMA = 'generator/ADD_SCHEMA';
export const addSchema = (payload: string) => {
  const object = JSON.parse(payload);
  return { type: ADD_SCHEMA, payload: object };
};

export const ADD_DICTIONARY = 'generator/ADD_DICTIONARY';
export const addDictionary = (payload: string) => ({
  type: ADD_DICTIONARY,
  payload: JSON.parse(payload)
});
