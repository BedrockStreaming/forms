import { getFormData, getCurrentStepIndex, isLastStep } from '../forms.selectors';

const formId = 'foo';
const state = {
  foo: {
    currentStepIndex: 0,
    data: {
      bar: 'baz',
    },
    isLastStep: false,
    stepsCount: 666,
  },
};

describe('forms.selectors', () => {
  describe('getFormData', () => {
    it('should retrieve data from state input', () => {
      expect(getFormData(formId)(state)).toEqual(state.foo.data);
    });
  });

  describe('getCurrentStepIndex', () => {
    it('should retrieve currentStepIndex from state input', () => {
      expect(getCurrentStepIndex(formId)(state)).toEqual(state.foo.currentStepIndex);
    });
  });

  describe('isLastStep', () => {
    it('should retrieve isLastStep property', () => {
      expect(isLastStep(formId)(state)).toEqual(state.foo.isLastStep);
    });
  });
});
