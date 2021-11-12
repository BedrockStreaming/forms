import { Dictionary, Validations } from '../types';
import { ErrorOption, Path, Ref, SetFieldValue } from 'react-hook-form';

export interface FormFieldProps<FormValues> {
  id: string;
  fieldType: string;
  dictionary: Dictionary;
  validation?: Validations;
  errors?: ErrorOption;
  setFieldValue?: SetFieldValue<string | number>;
  triggerValidationField?: (value: Path<FormValues>) => void;
  propRef?: Ref;
  disabled?: boolean;
  label?: string;
  onClick?: (event: any) => void;
}

export function FormField<FormValues>({
  id,
  fieldType,
  dictionary,
  ...props
}: FormFieldProps<FormValues>) {
  const Field = dictionary[fieldType];

  if (!Field) return null;

  return <Field data-testid={id} id={id} {...props} />;
}
