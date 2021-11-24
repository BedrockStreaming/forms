import {
  getFormData,
  getCurrentStepIndex,
  isLastStep
} from '../forms.selectors';

const formId = 'foo';
const state = {
  forms: {
    foo: {
      currentStepIndex: 666,
      data: 'bar',
      isLastStep: false,
      stepsCount: 999
    }
  }
};

describe('forms.selectors', () => {
  describe('getFormData', () => {
    it('should retrieve data from state input', () => {
      expect(getFormData(formId)(state)).toBe(state.forms.foo.data);
    });
  });

  describe('getCurrentStepIndex', () => {
    it('should retrieve currentStepIndex from state input', () => {
      expect(getCurrentStepIndex(formId)(state)).toBe(
        state.forms.foo.currentStepIndex
      );
    });
  });

  describe('isLastStep', () => {
    it('should retrieve isLastStep property', () => {
      expect(isLastStep(formId)(state)).toBe(state.forms.foo.isLastStep);
    });
  });
});
