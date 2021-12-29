import { useMemo } from 'react';
import { DefaultValues, FieldValues, FieldErrors } from 'react-hook-form';
import { getFieldsToCheckByStep, isStepInError } from '../utils/error.util';
import { DirtyFields, FormSchema } from '../types';

export const useIsFormStepValid = ({
  errors,
  schema,
  isLastStep,
  currentStepIndex,
  dirtyFields,
  defaultValues,
  isValidating
}: {
  errors: FieldErrors;
  schema: FormSchema;
  isLastStep: boolean;
  currentStepIndex: number;
  dirtyFields: DirtyFields;
  defaultValues?: DefaultValues<FieldValues>;
  isValidating: boolean;
}) =>
  useMemo(() => {
    if (isLastStep || isValidating) {
      return false;
    }

    const fieldsToCheckByStep = getFieldsToCheckByStep({
      schema,
      currentStepIndex
    });

    const stepInError = isStepInError({
      fieldsToCheckByStep,
      schema,
      dirtyFields,
      defaultValues,
      errors
    });

    return !stepInError;
  }, [
    errors,
    schema,
    isLastStep,
    currentStepIndex,
    dirtyFields,
    defaultValues,
    isValidating
  ]);
