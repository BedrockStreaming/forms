import { FieldErrors } from 'react-hook-form';
import {
  getValidationRulesHints,
  Validations
} from '@bedrockstreaming/form-builder';
import { checkRules } from '@bedrockstreaming/form-validation-rule-list';

import { ValidatedPasswordTextField } from '@forms/examples/styled-inputs';

import { TextFieldTopMarginWrapper } from './styled';
import {
  colorByRulesClassnames,
  weightByRulesClassnames
} from '../../../constants/validationColors.constants';

export const Password = ({
  errors,
  validation,
  ...props
}: {
  errors: FieldErrors;
  errorMessage: string;
  label: string;
  value?: string | number;
  validation: Validations;
}) => {
  const rules = getValidationRulesHints({
    errors,
    validation
  });
  const hasError = !!checkRules(props.value, rules).length;
  const fieldError = errors && errors.type;
  const isValid = !!(props.value && !hasError && !fieldError);

  return (
    <TextFieldTopMarginWrapper>
      <ValidatedPasswordTextField
        hasError={hasError}
        valid={isValid}
        {...props}
        rules={rules}
        weightByRulesClassnames={weightByRulesClassnames}
        colorByRulesClassnames={colorByRulesClassnames}
        label={props.label}
      />
    </TextFieldTopMarginWrapper>
  );
};
