import { getSchemaInfo, sanitizeFieldsById } from '../getSchemaInfo.util';
import { CORRECT_SCHEMA, stepOne, stepOneId, typesAllowed } from '../../__tests__/fixtures';

describe('getSchemaInfo', () => {
  const stepOneIndex = 0;

  const expectedResult = {
    fields: CORRECT_SCHEMA.fields,
    fieldsById: stepOne[stepOneId].fieldsById,
    stepsById: CORRECT_SCHEMA.stepsById,
    submitLabel: stepOne[stepOneId].submit.label,
    formMeta: CORRECT_SCHEMA.formMeta,
  };

  it('should return all fields, current step fieldsByIds, submit label and stepsById', () => {
    expect(getSchemaInfo(CORRECT_SCHEMA, typesAllowed, stepOneIndex)).toEqual(expectedResult);
  });

  it('should sanitize fieldsById from submit field', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      steps: {
        ...CORRECT_SCHEMA.steps,
        [stepOneId]: {
          ...CORRECT_SCHEMA.steps[stepOneId],
          fieldsById: [...CORRECT_SCHEMA.steps[stepOneId].fieldsById, 'submit'],
        },
      },
    };

    expect(getSchemaInfo(badSchema, typesAllowed, stepOneIndex)).toEqual(expectedResult);
  });

  it('should sanitize fieldsById from unknown fields', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      steps: {
        ...CORRECT_SCHEMA.steps,
        [stepOneId]: {
          ...CORRECT_SCHEMA.steps[stepOneId],
          fieldsById: [...CORRECT_SCHEMA.steps[stepOneId].fieldsById, 'foo'],
        },
      },
    };

    expect(getSchemaInfo(badSchema, typesAllowed, stepOneIndex)).toEqual(expectedResult);
  });
});

describe('sanitizeFieldsById', () => {
  it('should remove submit from returned fieldsById', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      steps: {
        ...CORRECT_SCHEMA.steps,
        [stepOneId]: {
          ...CORRECT_SCHEMA.steps[stepOneId],
          fieldsById: [...CORRECT_SCHEMA.steps[stepOneId].fieldsById, 'submit'],
        },
      },
    };

    expect(sanitizeFieldsById(badSchema.steps[stepOneId].fieldsById, badSchema.fields, typesAllowed)).toEqual(
      CORRECT_SCHEMA.steps[stepOneId].fieldsById,
    );
  });

  it('should remove any fieldById not present in dictionary from returned fieldsById', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      steps: {
        ...CORRECT_SCHEMA.steps,
        [stepOneId]: {
          ...CORRECT_SCHEMA.steps[stepOneId],
          fieldsById: [...CORRECT_SCHEMA.steps[stepOneId].fieldsById, 'foo'],
        },
      },
    };

    expect(sanitizeFieldsById(badSchema.steps[stepOneId].fieldsById, badSchema.fields, typesAllowed)).toEqual(
      CORRECT_SCHEMA.steps[stepOneId].fieldsById,
    );
  });
});
