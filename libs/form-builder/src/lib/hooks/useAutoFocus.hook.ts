import { useEffect } from 'react';
import { FieldValues, UseFormSetFocus } from 'react-hook-form';
import { FormSchema } from '../types';

export interface UseAutoFocusArgs {
  currentStepIndex: number;
  schema: FormSchema;
  setFocus: UseFormSetFocus<FieldValues>;
}

export const useAutoFocus = ({ currentStepIndex, schema, setFocus }: UseAutoFocusArgs) => {
  useEffect(() => {
    const currentStepId = schema?.stepsById?.[currentStepIndex];
    const firstFieldIdInStep = schema?.steps?.[currentStepId]?.fieldsById?.[0];

    try {
      setFocus(firstFieldIdInStep);
    } catch (error) {
      return;
    }
  }, [currentStepIndex, schema, setFocus]);
};
