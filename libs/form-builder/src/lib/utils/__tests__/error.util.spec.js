import { isStepInError } from '../error.util.ts';

describe('isStepInError', () => {
  let schema;
  let errors;
  let fieldsToCheckByStep;
  let dirtyFields;
  let defaultValues;

  beforeEach(() => {
    schema = {
      fields: {
        myField: {
          id: 'myField',
          type: 'text',
          validation: {
            required: {
              value: false,
              key: 'required',
              message: 'please fill this field',
            },
          },
        },
      },
      stepsById: ['step1'],
      steps: {
        step1: {
          id: 'step1',
          fieldsById: ['myField'],
          submit: { label: 'submit' },
        },
      },
    };
    errors = {};
    fieldsToCheckByStep = ['myField'];
    dirtyFields = {};
    defaultValues = {};
  });

  it('should return false if the field is empty and not required', () => {
    const isInError = isStepInError({
      schema,
      errors,
      fieldsToCheckByStep,
      dirtyFields,
      defaultValues,
    });

    expect(isInError).toBe(false);
  });

  it('should return true if the field is empty and required', () => {
    schema.fields.myField.validation.required.value = true;

    const isInError = isStepInError({
      schema,
      errors,
      fieldsToCheckByStep,
      dirtyFields,
      defaultValues,
    });

    expect(isInError).toBe(true);
  });
});
