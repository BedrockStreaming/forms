import _ from 'lodash';
import { FormBuilderError } from './formBuilderError.utils';
import { SUBMIT_FIELD_TYPE } from '../constants';
import { Dictionary, FormSchema } from '../types';

export const handleFormBuilderError = (
  typesAllowed: string[],
  schema: FormSchema,
  dictionary: Dictionary
) => {
  const invalidTypesInSchema = _.filter(
    schema.fields,
    ({ type }) => !typesAllowed.includes(type) || type === SUBMIT_FIELD_TYPE
  );

  if (invalidTypesInSchema.length > 0) {
    throw new FormBuilderError(
      `The form's schema contains some bad field(s) type that are prohibited or not defined in the dictionary: \n${JSON.stringify(
        invalidTypesInSchema,
        null,
        2
      )}\nAvailable in dictionary:\n${JSON.stringify(typesAllowed)}`
    );
  }

  const steps = _.get(schema, 'steps');

  if (!_.isObject(steps) || _.isEmpty(steps)) {
    throw new FormBuilderError(
      `The form's schema must contain a map of steps by id. Found: \n${JSON.stringify(
        steps,
        null,
        2
      )}`
    );
  }

  const stepsById = _.get(schema, 'stepsById');

  if (_.keys(steps).length !== stepsById.length) {
    throw new FormBuilderError(
      `The form's schema must contain as many steps entries as steps ids. Found: \n${JSON.stringify(
        { steps: _.keys(steps).length, stepsById: stepsById.length },
        null,
        2
      )}`
    );
  }

  if (!dictionary.submit) {
    throw new FormBuilderError(
      `The form's dictionary must contain a submit field. Found: \n${JSON.stringify(
        dictionary,
        null,
        2
      )}`
    );
  }
};
