import { Ref, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';
import { Validations } from '@bedrockstreaming/form-builder';
import {
  getValidationRulesHints,
  checkRules,
  withValidationRuleList
} from '@bedrockstreaming/form-validation-rule-list';

import { TextField } from '@mui/material';
import _ from 'lodash';

import { RuleList } from '../atoms/rule-list.component';

const ValidatedTextField = withValidationRuleList(TextField);

export const Password = ({
  'data-testid': dataTestId,
  errors,
  id,
  label,
  name,
  onBlur,
  onChange,
  optionalText,
  propRef,
  type,
  value,
  validation
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
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);

  const rules = getValidationRulesHints({
    errors,
    validation
  });

  const hasError = !!checkRules(value, rules).length;

  return (
    <ValidatedTextField
      type="password"
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
      ruleComponent={RuleList}
    />
  );
};
