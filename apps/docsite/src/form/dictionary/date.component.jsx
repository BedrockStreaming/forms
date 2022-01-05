import React, { useMemo } from 'react';
import {
  getValidationRulesHints,
  checkRules,
  withValidationRuleList
} from '@bedrockstreaming/form-validation-rule-list';
import { TextField, Box } from '@mui/material';
import _ from 'lodash';

import { BirthdateInput } from '@forms/examples/birthdate';

import {
  colorByRulesClassnames,
  weightByRulesClassnames
} from '../constants/validationColors.constants';

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
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);
  const rules = getValidationRulesHints({
    errors,
    validation
  });

  const hasError = !!checkRules(value, rules).length;

  return (
    <Box sx={{ m: 1 }}>
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
    </Box>
  );
};
