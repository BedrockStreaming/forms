import { useMemo } from 'react';
import { DefaultValues, FieldValues, FieldErrors } from 'react-hook-form';
import { getFieldsToCheckByStep, isStepInError } from '../utils/error.util';
import { DirtyFields, FormSchema } from '../types';

export interface UseIsFormStepValid {
  errors: FieldErrors;
  schema: FormSchema;
  isLastStep: boolean;
  currentStepIndex: number;
  dirtyFields: DirtyFields;
  defaultValues?: DefaultValues<FieldValues>;
  isValidating: boolean;
}

export const useIsFormStepValid = ({
  errors,
  schema,
  isLastStep,
  currentStepIndex,
  dirtyFields,
  defaultValues,
  isValidating
}: UseIsFormStepValid) =>
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
