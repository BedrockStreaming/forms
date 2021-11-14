import _ from 'lodash';

const defaultObject = {} as any;

export const getFormData =
  <RootState>(formId: string) =>
  (state: RootState) =>
    _.get(state, ['forms', formId, 'data'], defaultObject);

export const getCurrentStepIndex =
  <RootState>(formId: string) =>
  (state: RootState) =>
    _.get(state, ['forms', formId, 'currentStepIndex'], 0);

export const isLastStep =
  <RootState>(formId: string) =>
  (state: RootState) =>
    _.get(state, ['forms', formId, 'isLastStep'], true);
