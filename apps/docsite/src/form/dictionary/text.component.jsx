import React, {  useMemo } from 'react';
import { TextField } from '@mui/material';
import _ from 'lodash';
import { Box } from '@mui/system';

export const Text = ({
  'data-testid': dataTestId,
  errorMessage,
  errors,
  id,
  label,
  name,
  onBlur,
  onChange,
  optionalText,
  propRef,
  type,
  value
}
 ) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);
  const error = errors && errors.type && errorMessage;

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        data-testid={dataTestId}
        error={!!error}
        helperText={error || optionalText}
        id={id}
        inputProps={inputProps}
        label={label}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type || 'text'}
        value={value}
      />
    </Box>
  );
};
