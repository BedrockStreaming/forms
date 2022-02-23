import { getFormData, getCurrentStepIndex, isLastStep } from '../forms.selectors';

const formId = 'foo';
const state = {
  forms: {
    [formId]: {
      currentStepIndex: 666,
      data: { bar: 'baz' },
      isLastStep: false,
      stepsCount: 999,
    },
  },
};

describe('forms.selectors', () => {
  describe('getFormData', () => {
    it('should retrieve data from state input', () => {
      expect(getFormData(formId)(state)).toEqual(state.forms.foo.data);
    });
  });

  describe('getCurrentStepIndex', () => {
    it('should retrieve currentStepIndex from state input', () => {
      expect(getCurrentStepIndex(formId)(state)).toEqual(state.forms.foo.currentStepIndex);
    });
  });

  describe('isLastStep', () => {
    it('should retrieve isLastStep property', () => {
      expect(isLastStep(formId)(state)).toEqual(state.forms.foo.isLastStep);
    });
  });
});
