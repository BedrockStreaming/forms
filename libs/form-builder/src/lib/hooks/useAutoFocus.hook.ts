import { useEffect } from 'react';
import _ from 'lodash';
import { FieldValues, UseFormSetFocus } from 'react-hook-form';
import { FormSchema } from '../types';

export interface UseAutoFocusArgs {
  currentStepIndex: number;
  schema: FormSchema;
  setFocus: UseFormSetFocus<FieldValues>;
}

export const useAutoFocus = ({
  currentStepIndex,
  schema,
  setFocus
}: UseAutoFocusArgs) => {
  useEffect(() => {
    const currentStepId = _.get(schema, `stepsById.${currentStepIndex}`);
    const firstFieldIdInStep = _.get(schema, [
      'steps',
      currentStepId,
      'fieldsById',
      0
    ]);

    try {
      setFocus(firstFieldIdInStep);
    } catch (error) {
      return;
    }
  }, [currentStepIndex, schema, setFocus]);
};
