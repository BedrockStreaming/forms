import {
  getFieldsToCheckByStep,
  updateValidity
} from '../useCheckFormStepValidity.hook';

jest.unmock('../useCheckFormStepValidity.hook.ts');

const createMockSchema = () => ({
  steps: {
    step_1: {
      fields: {
        field_1_1: {},
        field_1_2: {}
      },
      fieldsById: ['field_1_1', 'field_1_2']
    },
    step_2: {}
  },
  stepsById: ['step_1', 'step_2']
});

describe('useCheckFormStepValidity', () => {
  describe('updateValidity', () => {
    let trigger;
    let setValidity;
    let dirtyFields;
    let fieldsToCheck;
    let schema;
    let currentStepIndex;
    let defaultValues;

    beforeEach(() => {
      trigger = jest.fn().mockReturnValue(false);
      setValidity = jest.fn();
      dirtyFields = {};
      fieldsToCheck = [];
      schema = {};
      currentStepIndex = 0;
      defaultValues = {};
    });

    const callUpdateValidity = () =>
      updateValidity({
        dirtyFields,
        fieldsToCheck,
        defaultValues,
        trigger,
        setValidity
      });

    it('should be invalid when no dirtyFields nor fieldsToCheck are passed', async () => {
      await callUpdateValidity();

      expect(setValidity).toHaveBeenCalledWith(false);
    });

    describe('test the impact of the dirty state of fields on step validity', () => {
      beforeEach(() => {
        trigger.mockReturnValue(true);
        schema = createMockSchema();
        fieldsToCheck = getFieldsToCheckByStep({ schema, currentStepIndex });
      });

      it('should be valid if every field to check is dirty', async () => {
        dirtyFields = { field_1_1: true, field_1_2: true };

        await callUpdateValidity();
        expect(setValidity).toHaveBeenCalledWith(true);
      });

      it('should be invalid if one field or more is not dirty', async () => {
        dirtyFields = { field_1_1: true, field_1_2: false };

        await callUpdateValidity();
        expect(setValidity).toHaveBeenCalledWith(false);
      });
    });

    describe('test the impact of the valid state of fields on step validity', () => {
      beforeEach(() => {
        dirtyFields = { field_1_1: true, field_1_2: true };
        schema = createMockSchema();
        fieldsToCheck = getFieldsToCheckByStep({ schema, currentStepIndex });
      });

      it('should be invalid if one or more field is invalid', async () => {
        trigger.mockReturnValue(false);

        await callUpdateValidity();
        expect(setValidity).toHaveBeenCalledWith(false);
      });

      it('should be valid if all fields are valid', async () => {
        trigger.mockReturnValue(true);

        await callUpdateValidity();
        expect(setValidity).toHaveBeenCalledWith(true);
      });
    });
  });
});
