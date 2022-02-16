import { FieldErrors, Path, FieldValues } from 'react-hook-form';
import { Validations } from '@bedrockstreaming/form-builder';
import {
  getValidationRulesHints,
  checkRules
} from '@bedrockstreaming/form-validation-rule-list';

import { ValidatedTextField } from '@forms/examples/styled-inputs';
import { BirthdateInput } from '@forms/examples/birthdate';

import { TextFieldMarginWrapper } from './styled';

import { RuleList } from '../atoms/rule-list.component';

export const DateInput = ({
  errors,
  validation,
  label,
  ...props
}: {
  errors: FieldErrors;
  errorMessage: string;
  label: string;
  value: string | number | undefined;
  validation: Validations;
  id: string;
  setFieldValue: (id: Path<FieldValues>, value: any) => void;
  onChange: (event: any) => void;
}) => {
  const rules = getValidationRulesHints({
    errors,
    validation
  });
  const hasError = !!checkRules(props.value, rules).length;
  const fieldError = errors && errors.type;
  const isValid = !!(props.value && !hasError && !fieldError);

  return (
    <TextFieldMarginWrapper>
      <BirthdateInput
        component={ValidatedTextField}
        label={label}
        hasError={hasError}
        valid={isValid}
        rules={rules}
        ruleComponent={RuleList}
        {...props}
      />
    </TextFieldMarginWrapper>
  );
};
