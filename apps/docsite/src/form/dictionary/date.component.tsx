import { Ref, useMemo } from 'react';
import { FieldErrors, Path, FieldValues } from 'react-hook-form';
import {
  getValidationRulesHints,
  Validations
} from '@bedrockstreaming/form-builder';
import {
  checkRules,
  withValidationRuleList
} from '@bedrockstreaming/form-validation-rule-list';
import { TextField } from '@mui/material';
import _ from 'lodash';

import { BirthdateInput } from '@forms/examples/birthdate';

import {
  colorByRulesClassnames,
  weightByRulesClassnames
} from '../../../constants/validationColors.constants';

const ValidatedTextField = withValidationRuleList(TextField);

export const DateInput = ({
  'data-testid': dataTestId,
  errors,
  validation,
  name,
  optionalText,
  label,
  id,
  value,
  setFieldValue,
  onChange,
  onBlur,
  propRef
}: {
  'data-testid': string;
  errors: FieldErrors;
  id: string;
  label: string;
  name: string;
  onBlur: (event: any) => void;
  onChange: (event: any) => void;
  optionalText?: string;
  propRef: Ref<any>;
  type?: string;
  value?: string | number;
  validation: Validations;
  setFieldValue: (id: Path<FieldValues>, value: any) => void;
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);
  const rules = getValidationRulesHints({
    errors,
    validation
  });

  const hasError = !!checkRules(value, rules).length;

  return (
    <div>
      <BirthdateInput
        component={ValidatedTextField}
        setFieldValue={setFieldValue}
        inputProps={inputProps}
        id={id}
        label={label}
        name={name}
        error={hasError}
        helperText={optionalText}
        onBlur={onBlur}
        onChange={onChange}
        rules={rules}
        value={value}
        data-testid={dataTestId}
        colorByRulesClassnames={colorByRulesClassnames}
        weightByRulesClassnames={weightByRulesClassnames}
      />
    </div>
  );
};