import { sanitizeFieldsById } from '../getSchemaInfo.util';
import set from 'immutable-set';
import {
  CORRECT_SCHEMA,
  stepOneId,
  typesAllowed
} from '../../__tests__/fixtures';

describe('sanitizeFieldsById', () => {
  it('should remove submit from returned fieldsById', () => {
    const badSchema = set(
      CORRECT_SCHEMA,
      ['steps', stepOneId, 'fieldsById'],
      [...CORRECT_SCHEMA.steps[stepOneId].fieldsById, 'submit']
    );

    expect(
      sanitizeFieldsById(
        badSchema.steps[stepOneId].fieldsById,
        badSchema.fields,
        typesAllowed
      )
    ).toEqual(CORRECT_SCHEMA.steps[stepOneId].fieldsById);
  });

  it('should remove any fieldById not present in dictionary from returned fieldsById', () => {
    const badSchema = set(
      CORRECT_SCHEMA,
      ['steps', stepOneId, 'fieldsById'],
      [...CORRECT_SCHEMA.steps[stepOneId].fieldsById, 'foo']
    );

    expect(
      sanitizeFieldsById(
        badSchema.steps[stepOneId].fieldsById,
        badSchema.fields,
        typesAllowed
      )
    ).toEqual(CORRECT_SCHEMA.steps[stepOneId].fieldsById);
  });
});
