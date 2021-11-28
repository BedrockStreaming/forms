import { FieldErrors, Path, FieldValues } from 'react-hook-form';
import {
  getValidationRulesHints,
  Validations
} from '@bedrockstreaming/form-builder';
import { checkRules } from '@bedrockstreaming/form-validation-rule-list';

import { TextFieldMarginWrapper } from './styled';
import {
  colorByRulesClassnames,
  weightByRulesClassnames
} from '../../../constants/validationColors.constants';
import { BirthdateInput } from '../../../components/birthdate/birthdateInput.component';

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
        label={label}
        hasError={hasError}
        valid={isValid}
        rules={rules}
        weightByRulesClassnames={weightByRulesClassnames}
        colorByRulesClassnames={colorByRulesClassnames}
        {...props}
      />
    </TextFieldMarginWrapper>
  );
};
