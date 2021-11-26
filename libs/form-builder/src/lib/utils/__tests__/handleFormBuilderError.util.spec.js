import { FormBuilderError } from '../formBuilderError.utils';
import { handleFormBuilderError } from '../handleFormBuilderError.util';
import {
  CORRECT_DICTIONARY,
  CORRECT_SCHEMA,
  typesAllowed
} from '../../__tests__/fixtures';

describe('handleFormBuilderError', () => {
  it('should not throw a FormBuilderError error if schema, types allowed and dictionary are correct', () => {
    return expect(() =>
      handleFormBuilderError(typesAllowed, CORRECT_SCHEMA, CORRECT_DICTIONARY)
    ).not.toThrowError(FormBuilderError);
  });

  it('should throw a FormBuilderError error when a field has a submit type', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      fields: { ...CORRECT_SCHEMA.fields, foo: { type: 'submit' } }
    };

    return expect(() =>
      handleFormBuilderError(
        [...typesAllowed, 'submit'],
        badSchema,
        CORRECT_DICTIONARY
      )
    ).toThrowError(FormBuilderError);
  });

  it('should throw a FormBuilderError error when a field is not whitelisted', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      fields: { ...CORRECT_SCHEMA.fields, foo: { type: 'foo' } }
    };

    return expect(() =>
      handleFormBuilderError(typesAllowed, badSchema, CORRECT_DICTIONARY)
    ).toThrowError(FormBuilderError);
  });

  it('should throw a FormBuilderError error when steps are empty', () => {
    const badSchema = { ...CORRECT_SCHEMA, steps: {} };

    return expect(() =>
      handleFormBuilderError(typesAllowed, badSchema, CORRECT_DICTIONARY)
    ).toThrowError(FormBuilderError);
  });

  it('should throw a FormBuilderError error when stepsById length is different than steps length', () => {
    const badSchema = {
      ...CORRECT_SCHEMA,
      stepsById: [...CORRECT_SCHEMA.stepsById, 'foo']
    };

    return expect(() =>
      handleFormBuilderError(typesAllowed, badSchema, CORRECT_DICTIONARY)
    ).toThrowError(FormBuilderError);
  });

  it('should throw a FormBuilderError error when a submit component is missing in dictionary', () => {
    const badDictionary = { ...CORRECT_DICTIONARY, submit: undefined };

    return expect(() =>
      handleFormBuilderError(typesAllowed, CORRECT_SCHEMA, badDictionary)
    ).toThrowError(FormBuilderError);
  });
});
