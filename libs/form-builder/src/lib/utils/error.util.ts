import _ from 'lodash';
import { FieldErrors, DefaultValues, FieldValues } from 'react-hook-form';
import { DEFAULT_RULES_NAMES } from '../constants';
import { DirtyFields, FormSchema } from '../types';

const EMPTY_ARRAY = [] as const;

export const getFieldsToCheckByStep = ({
  schema,
  currentStepIndex
}: {
  schema: FormSchema;
  currentStepIndex: number;
}): string[] | readonly [] => {
  const currentStepId = _.get(schema, ['stepsById', currentStepIndex]);
  const fieldsToCheck = _.get(
    schema,
    ['steps', currentStepId, 'fieldsById'],
    EMPTY_ARRAY
  );

  return fieldsToCheck;
};

export const isFieldInError = ({
  fieldToCheck,
  errors
}: {
  fieldToCheck: string;
  errors: FieldErrors;
}) => !!(errors && errors[fieldToCheck]);

export const isFieldRequired = ({
  schema,
  fieldToCheck
}: {
  schema: FormSchema;
  fieldToCheck: string;
}) =>
  _.get(
    schema,
    ['fields', fieldToCheck, 'validation', DEFAULT_RULES_NAMES.required],
    false
  );

export const isFieldNotDirtyAndEmpty = ({
  fieldToCheck,
  dirtyFields,
  defaultValues
}: {
  fieldToCheck: string;
  dirtyFields: DirtyFields;
  defaultValues?: DefaultValues<FieldValues>;
}) => !_.get(dirtyFields, fieldToCheck) && !_.get(defaultValues, fieldToCheck);

export const isStepInError = ({
  fieldsToCheckByStep,
  schema,
  dirtyFields,
  defaultValues,
  errors
}: {
  schema: FormSchema;
  errors: FieldErrors;
  fieldsToCheckByStep: string[] | readonly [];
  dirtyFields: DirtyFields;
  defaultValues?: DefaultValues<FieldValues>;
}) =>
  fieldsToCheckByStep.some(
    (fieldToCheck) =>
      isFieldInError({ fieldToCheck, errors }) ||
      (isFieldRequired({ schema, fieldToCheck }) &&
        isFieldNotDirtyAndEmpty({ fieldToCheck, dirtyFields, defaultValues }))
  );
