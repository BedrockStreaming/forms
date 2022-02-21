import React, { useMemo } from 'react';
import {
  getValidationRulesHints,
  checkRules,
  withValidationRuleList,
} from '@bedrockstreaming/form-validation-rule-list';

import { TextField, Box } from '@mui/material';

import { RuleList } from '../rule-list.component';

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
  value,
  validation,
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);

  const rules = getValidationRulesHints({
    errors,
    validation,
  });

  const hasError = !!checkRules(value, rules).length;

  return (
    <Box sm={{ m: 1 }}>
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
    </Box>
  );
};
