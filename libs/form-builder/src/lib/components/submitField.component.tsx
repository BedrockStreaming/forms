import * as React from 'react';
import {
  UseFormGetValues,
  UnpackNestedValue,
  FieldValues,
  FieldErrors
} from 'react-hook-form';

import { SUBMIT_FIELD_TYPE } from '../constants';
import { FormField } from './formField.component';
import { Dictionary } from '../types';

export interface SubmitFieldProps {
  dictionary: Dictionary;
  isDirty: boolean;
  isValid: boolean;
  isPreFilled: boolean;
  getValues: UseFormGetValues<FieldValues>;
  isLastStep: boolean;
  isFormStepValid: boolean;
  submitLabel: string;
  onNextStep: (
    value: UnpackNestedValue<FieldValues>,
    errors: FieldErrors
  ) => void;
  errors: FieldErrors;
}

export function SubmitField({
  dictionary,
  isDirty,
  isValid,
  isPreFilled,
  getValues,
  isLastStep,
  isFormStepValid,
  submitLabel,
  onNextStep,
  errors
}: SubmitFieldProps) {
  const handleNextStep = React.useCallback(
    (event) => {
      event.preventDefault();
      onNextStep(getValues(), errors);
    },
    [onNextStep, getValues, errors]
  );

  return (
    <div>
      {isLastStep ? (
        <FormField
          id="submit-field"
          fieldType={SUBMIT_FIELD_TYPE}
          disabled={!(isDirty || isPreFilled) || !isValid}
          label={submitLabel}
          dictionary={dictionary}
        />
      ) : (
        <FormField
          id="next-field"
          fieldType={SUBMIT_FIELD_TYPE}
          disabled={!isFormStepValid}
          onClick={handleNextStep}
          label={submitLabel}
          dictionary={dictionary}
        />
      )}
    </div>
  );
}
