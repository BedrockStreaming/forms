import { Ref, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';
import { InputLabel, MenuItem, Select as MUISelect } from '@mui/material';
import _ from 'lodash';
import { Box } from '@mui/system';

export const Select = ({
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
  value,
  choices,
  multiple
}: {
  'data-testid': string;
  errorMessage: string;
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
  choices: string[] | number[];
  multiple?: boolean;
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);
  const error = errors && errors.type && errorMessage;

  return (
    <Box sx={{ m: 2 }}>
      <InputLabel id="label-id">{label}</InputLabel>
      <MUISelect
        multiple={multiple}
        labelId="label-id"
        value={value}
        label={label}
        onChange={onChange}
        id={id}
        inputProps={inputProps}
        data-testid={dataTestId}
        onBlur={onBlur}
        name={name}
      >
        {choices.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </MUISelect>
    </Box>
  );
};
