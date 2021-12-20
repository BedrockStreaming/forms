import { FormFields, FormSteps } from '@bedrockstreaming/form-builder';

export const ADD_FIELD = 'generator/ADD_FIELD';
export const addField = (payload: FormFields) => ({ type: ADD_FIELD, payload });

export const ADD_STEP = 'generator/ADD_STEP';
export const addStep = (payload: FormSteps) => ({ type: ADD_STEP, payload });
