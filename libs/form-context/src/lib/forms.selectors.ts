import _ from 'lodash';
import { DefaultFormState } from './forms.reducer';
import { FieldValues } from 'react-hook-form';

const defaultData = {} as FieldValues;

export const getFormData = (formId: string) => (state: DefaultFormState) =>
  _.get(state, [formId, 'data'], defaultData);

export const getCurrentStepIndex =
  (formId: string) => (state: DefaultFormState) =>
    _.get(state, [formId, 'currentStepIndex'], 0);

export const isLastStep = (formId: string) => (state: DefaultFormState) =>
  _.get(state, [formId, 'isLastStep'], true);
