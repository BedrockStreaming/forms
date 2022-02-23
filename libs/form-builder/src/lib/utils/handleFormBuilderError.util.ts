import { FormBuilderError } from './formBuilderError.utils';
import { SUBMIT_FIELD_TYPE } from '../constants';
import { Dictionary, FormSchema } from '../types';

const EMPTY_OBJECT = {} as const;
const EMPTY_ARRAY = [] as const;

export const handleFormBuilderError = (typesAllowed: string[], schema: FormSchema, dictionary: Dictionary) => {
  const fieldValues = Object.values(schema?.fields || EMPTY_OBJECT);
  const invalidTypesInSchema = fieldValues.filter(
    ({ type }) => !typesAllowed.includes(type) || type === SUBMIT_FIELD_TYPE,
  );

  if (invalidTypesInSchema.length > 0) {
    throw new FormBuilderError(
      `The form's schema contains some bad field(s) type that are prohibited or not defined in the dictionary: \n${JSON.stringify(
        invalidTypesInSchema,
        null,
        2,
      )}\nAvailable in dictionary:\n${JSON.stringify(typesAllowed)}`,
    );
  }

  const steps = schema?.steps || EMPTY_OBJECT;
  const isStepsNonNullObject = steps && typeof steps === 'object';

  if (!isStepsNonNullObject || Object.keys(steps).length === 0) {
    throw new FormBuilderError(
      `The form's schema must contain a map of steps by id. Found: \n${JSON.stringify(steps, null, 2)}`,
    );
  }

  const stepsById = schema?.stepsById || EMPTY_ARRAY;

  if (Object.keys(steps).length !== stepsById.length) {
    throw new FormBuilderError(
      `The form's schema must contain as many steps entries as steps ids. Found: \n${JSON.stringify(
        { steps: Object.keys(steps).length, stepsById: stepsById.length },
        null,
        2,
      )}`,
    );
  }

  if (!dictionary.submit) {
    throw new FormBuilderError(
      `The form's dictionary must contain a submit field. Found: \n${JSON.stringify(dictionary, null, 2)}`,
    );
  }
};
