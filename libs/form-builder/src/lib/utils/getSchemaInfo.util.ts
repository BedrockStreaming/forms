import _ from 'lodash';
import { SUBMIT_FIELD_TYPE } from '../constants';
import { FormFields, FormSchema } from '../types';

const EMPTY_ARRAY = [] as string[];
const EMPTY_OBJECT = {} as any;

export const sanitizeFieldsById = (
  fieldsById: string[],
  fields: FormFields,
  typesAllowed: string[]
): string[] =>
  _.filter(fieldsById, (fieldId) => {
    const type = _.get(fields, [fieldId, 'type']);

    return typesAllowed.includes(type) && type !== SUBMIT_FIELD_TYPE;
  });

export const getSchemaInfo = (
  schema: FormSchema,
  typesAllowed: string[],
  currentStepIndex: number
) => {
  const steps = _.get(schema, 'steps');
  const stepsById = _.get(schema, 'stepsById', EMPTY_ARRAY);
  const stepId = _.get(stepsById, currentStepIndex);

  const fieldsById = _.get(steps, [stepId, 'fieldsById'], EMPTY_ARRAY);
  const submitLabel = _.get(steps, [stepId, 'submit', 'label']);

  const fields = _.get(schema, 'fields', EMPTY_OBJECT);

  return {
    fields,
    fieldsById: sanitizeFieldsById(fieldsById, fields, typesAllowed),
    submitLabel,
    stepsById
  };
};
