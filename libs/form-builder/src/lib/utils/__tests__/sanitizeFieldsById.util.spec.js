import { sanitizeFieldsById } from '../getSchemaInfo.util';
import { CORRECT_SCHEMA, typesAllowed } from './fixtures';

describe('sanitizeFieldsById', () => {
  it('should remove submit from returned fieldsById', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      fieldsById: [...CORRECT_SCHEMA.fieldsById, 'submit']
    };
    expect(
      sanitizeFieldsById(badSchema.fieldsById, badSchema.fields, typesAllowed)
    ).toEqual(CORRECT_SCHEMA.fieldsById);
  });

  it('should remove any fieldById not present in dictionary from returned fieldsById', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      fieldsById: [...CORRECT_SCHEMA.fieldsById, 'foo']
    };
    expect(
      sanitizeFieldsById(badSchema.fieldsById, badSchema.fields, typesAllowed)
    ).toEqual(CORRECT_SCHEMA.fieldsById);
  });
});
