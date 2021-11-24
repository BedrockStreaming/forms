import { getSchemaInfo } from '../getSchemaInfo.util';
import { CORRECT_SCHEMA, stepOne, stepOneId, typesAllowed } from './fixtures';

describe('getSchemaInfo', () => {
  const stepOneIndex = 0;

  const expectedResult = {
    fields: CORRECT_SCHEMA.fields,
    fieldsById: stepOne[stepOneId].fieldsById,
    stepsById: CORRECT_SCHEMA.stepsById,
    submitLabel: stepOne[stepOneId].submit.label
  };

  it('should return all fields, current step fieldsByIds, submit label and stepsById', () => {
    expect(getSchemaInfo(CORRECT_SCHEMA, typesAllowed, stepOneIndex)).toEqual(
      expectedResult
    );
  });

  it('should sanitize fieldsById from submit field', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      fieldsById: [...CORRECT_SCHEMA.fieldsById, 'submit']
    };
    expect(getSchemaInfo(badSchema, typesAllowed, stepOneIndex)).toEqual(
      expectedResult
    );
  });

  it('should sanitize fieldsById from unknown fields', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      fieldsById: [...CORRECT_SCHEMA.fieldsById, 'foo']
    };
    expect(getSchemaInfo(badSchema, typesAllowed, stepOneIndex)).toEqual(
      expectedResult
    );
  });
});
