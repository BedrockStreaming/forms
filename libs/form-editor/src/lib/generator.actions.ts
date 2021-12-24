import { FieldValues } from 'react-hook-form';

export const ADD_FIELD = 'generator/ADD_FIELD';
export const addField = (payload: FieldValues) => ({
  type: ADD_FIELD,
  payload
});

export const ADD_STEP = 'generator/ADD_STEP';
export const addStep = (payload: FieldValues) => ({ type: ADD_STEP, payload });

export const ADD_FORM_ID = 'generator/ADD_FORM_ID';
export const addFormId = (payload: FieldValues) => ({
  type: ADD_FORM_ID,
  payload: payload.formId
});

export const ADD_SCHEMA = 'generator/ADD_SCHEMA';
export const addSchema = (payload: FieldValues) => ({
  type: ADD_SCHEMA,
  payload: JSON.parse(payload.schema)
});

export const ADD_DICTIONARY = 'generator/ADD_DICTIONARY';
export const addDictionary = (payload: FieldValues) => ({
  type: ADD_DICTIONARY,
  payload: JSON.parse(payload.dictionary)
});

export const ADD_EXTRA_VALIDATION = 'generator/ADD_EXTRA_VALIDATION';
export const addExtraValidation = (payload: FieldValues) => ({
  type: ADD_EXTRA_VALIDATION,
  payload: JSON.parse(payload.extraValidation)
});

export const UPDATE_SCHEMA = 'generator/UPDATE_SCHEMA';
export const updateSchema = (payload: FieldValues) => ({
  type: UPDATE_SCHEMA,
  payload
});

export const SUBMIT_PREVIEW = 'generator/SUBMIT_PREVIEW';
export const submitPreview = (payload: FieldValues) => ({
  type: SUBMIT_PREVIEW,
  payload
});
