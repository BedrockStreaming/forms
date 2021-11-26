import * as React from 'react';
import { UseFormGetValues, UnpackNestedValue } from 'react-hook-form';

import { SUBMIT_FIELD_TYPE } from '../constants';
import { FormField } from './formField.component';
import { Dictionary } from '../types';

export interface SubmitFieldProps<FormValues> {
  dictionary: Dictionary;
  isDirty: boolean;
  isValid: boolean;
  isPreFilled: boolean;
  getValues: UseFormGetValues<FormValues>;
  isLastStep: boolean;
  isFormStepValid: boolean;
  submitLabel: string;
  onNextStep: (value: UnpackNestedValue<FormValues>) => void;
}

export function SubmitField<FormValues>({
  dictionary,
  isDirty,
  isValid,
  isPreFilled,
  getValues,
  isLastStep,
  isFormStepValid,
  submitLabel,
  onNextStep
}: SubmitFieldProps<FormValues>) {
  const handleNextStep = React.useCallback(
    (event) => {
      event.preventDefault();
      onNextStep(getValues());
    },
    [onNextStep, getValues]
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
