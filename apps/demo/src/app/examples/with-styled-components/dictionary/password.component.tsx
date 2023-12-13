import { FieldErrors } from 'react-hook-form';
import { Validations } from '@bedrockstreaming/form-builder';
import { getValidationRulesHints, checkRules } from '@bedrockstreaming/form-validation-rule-list';

import { ValidatedPasswordTextField } from '@forms/examples/styled-inputs';

import { TextFieldTopMarginWrapper } from './styled';

import { RuleList } from '../atoms/rule-list.component';

export const Password = ({
  errors,
  validation,
  shouldDisplayRequiredHint,
  label,
  ...props
}: {
  errors: FieldErrors;
  errorMessage: string;
  label: string;
  value?: string | number;
  validation: Validations;
  shouldDisplayRequiredHint?: boolean;
}) => {
  const rules = getValidationRulesHints({
    errors,
    validation,
  });
  const hasError = !!checkRules(props.value, rules).length;
  const fieldError = errors && errors.type;
  const isValid = !!(props.value && !hasError && !fieldError);

  if (shouldDisplayRequiredHint) {
    label += ' *';
  }

  return (
    <TextFieldTopMarginWrapper>
      <ValidatedPasswordTextField
        hasError={hasError}
        valid={isValid}
        label={label}
        {...props}
        rules={rules}
        ruleComponent={RuleList}
      />
    </TextFieldTopMarginWrapper>
  );
};
