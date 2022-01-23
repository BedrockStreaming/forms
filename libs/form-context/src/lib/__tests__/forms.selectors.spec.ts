import {
  getFormData,
  getCurrentStepIndex,
  isLastStep
} from '../forms.selectors';

const formId = 'foo';
const state = {
  foo: {
    currentStepIndex: 0,
    data: {
      bar: 'baz'
    },
    isLastStep: false,
    stepsCount: 666
  }
};

describe('forms.selectors', () => {
  describe('getFormData', () => {
    it('should retrieve data from state input', () => {
      expect(getFormData(formId)(state)).toBe(state.foo.data);
    });
  });

  describe('getCurrentStepIndex', () => {
    it('should retrieve currentStepIndex from state input', () => {
      expect(getCurrentStepIndex(formId)(state)).toBe(
        state.foo.currentStepIndex
      );
    });
  });

  describe('isLastStep', () => {
    it('should retrieve isLastStep property', () => {
      expect(isLastStep(formId)(state)).toBe(state.foo.isLastStep);
    });
  });
});
