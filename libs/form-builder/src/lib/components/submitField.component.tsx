import * as React from 'react';
import { UseFormGetValues, UnpackNestedValue, FieldValues } from 'react-hook-form';

import { SUBMIT_FIELD_TYPE } from '../constants';
import { FormField } from './formField.component';
import { Dictionary } from '../types';

export interface SubmitFieldProps {
  formId: string;
  dictionary: Dictionary;
  submitDisabled: boolean;
  nextDisabled: boolean;
  isValidating: boolean;
  getValues: UseFormGetValues<FieldValues>;
  isLastStep: boolean;
  submitLabel: string;
  onNextStep: (value: UnpackNestedValue<FieldValues>) => void;
}

export function SubmitField({
  formId,
  dictionary,
  submitDisabled,
  nextDisabled,
  getValues,
  isLastStep,
  submitLabel,
  onNextStep,
  isValidating,
}: SubmitFieldProps) {
  const handleNextStep = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!nextDisabled) {
        onNextStep(getValues());
      }
    },
    [onNextStep, getValues, nextDisabled],
  );

  return (
    <div>
      {isLastStep ? (
        <FormField
          id="submit-field"
          fieldType={SUBMIT_FIELD_TYPE}
          disabled={submitDisabled}
          label={submitLabel}
          dictionary={dictionary}
          formId={formId}
        />
      ) : (
        <FormField
          id="next-field"
          fieldType={SUBMIT_FIELD_TYPE}
          disabled={isValidating}
          onClick={handleNextStep}
          label={submitLabel}
          dictionary={dictionary}
          formId={formId}
        />
      )}
    </div>
  );
}
