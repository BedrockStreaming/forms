import * as React from 'react';
import { Dictionary, Validations } from '../types';
import { ErrorOption, Path, Ref, SetFieldValue, FieldValues } from 'react-hook-form';

export interface FormFieldProps {
  id: string;
  fieldType: string;
  dictionary: Dictionary;
  validation?: Validations;
  errors?: ErrorOption;
  setFieldValue?: SetFieldValue<FieldValues>;
  triggerValidationField?: (value: Path<FieldValues>) => void;
  propRef?: Ref;
  disabled?: boolean;
  label?: string;
  onClick?: (event: any) => void;
  isValidating?: boolean;
  formId?: string;
  shouldDisplayRequiredHint?: boolean;
}

export function FormField({
  id,
  fieldType,
  dictionary,
  shouldDisplayRequiredHint,
  validation,
  ...props
}: FormFieldProps) {
  const Field = dictionary[fieldType];

  if (!Field) return null;

  if (!validation?.required?.value) {
    shouldDisplayRequiredHint = false;
  }

  return (
    <Field
      data-testid={id}
      id={id}
      shouldDisplayRequiredHint={shouldDisplayRequiredHint}
      validation={validation}
      {...props}
    />
  );
}
