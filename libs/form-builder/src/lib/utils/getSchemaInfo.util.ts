import { SUBMIT_FIELD_TYPE } from '../constants';
import { FormFields, FormMeta, FormSchema } from '../types';

const EMPTY_ARRAY = [] as const;
const EMPTY_OBJECT = {} as const;

export const sanitizeFieldsById = (fieldsById: string[], fields: FormFields, typesAllowed: string[]): string[] =>
  fieldsById.filter((fieldId) => {
    const type = fields?.[fieldId]?.type;

    return typesAllowed.includes(type) && type !== SUBMIT_FIELD_TYPE;
  });

export interface SchemaInfo {
  fields: FormFields;
  fieldsById: string[];
  submitLabel: string;
  stepsById: string[];
  formMeta: FormMeta;
}

export const getSchemaInfo = (schema: FormSchema, typesAllowed: string[], currentStepIndex: number): SchemaInfo => {
  const steps = schema?.steps;
  const stepsById = schema?.stepsById || EMPTY_ARRAY;
  const stepId = stepsById?.[currentStepIndex];
  const fieldsById = steps?.[stepId]?.fieldsById || EMPTY_ARRAY;
  const submitLabel = steps?.[stepId]?.submit?.label;
  const fields = schema?.fields || EMPTY_OBJECT;
  const formMeta = schema?.formMeta || EMPTY_OBJECT;

  return {
    fields,
    fieldsById: sanitizeFieldsById(fieldsById, fields, typesAllowed),
    submitLabel,
    stepsById,
    formMeta,
  };
};
