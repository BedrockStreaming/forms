import { FieldErrors } from 'react-hook-form';
import { Validations } from '@bedrockstreaming/form-builder';

import { ValidatedTextField } from '@forms/examples/styled-inputs';

import { TextFieldMarginWrapper } from './styled';

export const Text = ({
  errors,
  errorMessage,
  validation,
  ...props
}: {
  errors: FieldErrors;
  errorMessage: string;
  label: string;
  value?: string | number;
  validation: Validations;
}) => {
  const error = errors && errors.type && errorMessage;

  return (
    <TextFieldMarginWrapper>
      <ValidatedTextField type="text" hasError={!!error} errorText={error} valid={!!props.value && !error} {...props} />
    </TextFieldMarginWrapper>
  );
};
