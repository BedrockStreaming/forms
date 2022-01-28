import { FormSchema } from '@bedrockstreaming/form-builder';
import {
  INIT_FORM,
  initForm,
  NEXT_STEP,
  setNextStep,
  PREVIOUS_STEP,
  setPreviousStep,
  UPDATE_FORM_DATA,
  updateFormData,
  RESET_FORM,
  resetForm,
  setStep,
  SET_STEP
} from '../forms.actions';

const formId = 'foo';
const CORRECT_SCHEMA: FormSchema = {
  fields: {
    foo: {
      id: 'foo',
      type: 'text'
    },
    bar: {
      id: 'bar',
      type: 'checkbox'
    }
  },
  steps: {
    one: {
      fieldsById: ['foo', 'bar'],
      id: 'one',
      submit: {
        label: 'label'
      }
    }
  },
  stepsById: ['one']
};

describe('forms.actions', () => {
  describe('initForm', () => {
    it('should return type and formId', () => {
      expect(initForm(formId, CORRECT_SCHEMA)).toEqual({
        type: INIT_FORM,
        formId,
        schema: CORRECT_SCHEMA
      });
    });
  });

  describe('resetForm', () => {
    it('should return type and formId', () => {
      expect(resetForm(formId)).toEqual({ type: RESET_FORM, formId });
    });
  });

  describe('setNextStep', () => {
    it('should return type and formId', () => {
      expect(setNextStep(formId)).toEqual({ type: NEXT_STEP, formId });
    });
  });

  describe('setPreviousStep', () => {
    it('should return type and formId', () => {
      expect(setPreviousStep(formId)).toEqual({ type: PREVIOUS_STEP, formId });
    });
  });

  describe('updateFormData', () => {
    it('should return type, formId and data', () => {
      const data = { bar: 'baz' };
      expect(updateFormData(formId, data)).toEqual({
        type: UPDATE_FORM_DATA,
        formId,
        data
      });
    });
  });

  describe('setStep', () => {
    it('should return type, formId and stepIndex', () => {
      const stepIndex = 666;
      expect(setStep(formId, stepIndex)).toEqual({
        type: SET_STEP,
        formId,
        stepIndex
      });
    });
  });
});
