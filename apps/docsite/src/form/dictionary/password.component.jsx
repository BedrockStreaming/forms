import React, { useMemo } from 'react';
import {
  getValidationRulesHints,
} from '@bedrockstreaming/form-builder';
import {
  checkRules,
  withValidationRuleList
} from '@bedrockstreaming/form-validation-rule-list';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import _ from 'lodash';

import {
  colorByRulesClassnames,
  weightByRulesClassnames
} from '../constants/validationColors.constants';

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
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);

  const rules = getValidationRulesHints({
    errors,
    validation
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
        colorByRulesClassnames={colorByRulesClassnames}
        weightByRulesClassnames={weightByRulesClassnames}
        />
    </Box>
  );
};
