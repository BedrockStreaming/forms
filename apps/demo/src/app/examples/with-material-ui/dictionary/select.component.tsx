import { Ref, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';
import { InputLabel, MenuItem, Select as MUISelect, Box } from '@mui/material';

export const Select = ({
  'data-testid': dataTestId,
  id,
  label,
  name,
  onBlur,
  onChange,
  propRef,
  value,
  choices,
  multiple,
  shouldDisplayRequiredHint,
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
  shouldDisplayRequiredHint?: boolean;
}) => {
  const inputProps = useMemo(() => ({ ref: propRef }), [propRef]);

  if (shouldDisplayRequiredHint) {
    label += ' *';
  }

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
