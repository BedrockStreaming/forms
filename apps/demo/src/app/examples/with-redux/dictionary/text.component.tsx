import { FieldErrors } from 'react-hook-form';
import { Validations } from '@bedrockstreaming/form-builder';

import { TextFieldMarginWrapper } from './styled';
import { ValidatedTextField } from '../../../components/textfield/validatedTextField.component';
import {
  colorByRulesClassnames,
  weightByRulesClassnames
} from '../../../constants/validationColors.constants';

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
      <ValidatedTextField
        type="text"
        hasError={!!error}
        errorText={error}
        valid={!!props.value && !error}
        weightByRulesClassnames={weightByRulesClassnames}
        colorByRulesClassnames={colorByRulesClassnames}
        {...props}
        label={props.label}
      />
    </TextFieldMarginWrapper>
  );
};
