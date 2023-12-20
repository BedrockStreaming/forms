import * as React from 'react';
import { Ref, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUICheckbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export const Checkbox = ({
  'data-testid': dataTestId,
  id,
  label,
  name,
  onBlur,
  onChange,
  propRef,
  value,
  shouldDisplayRequiredHint,
}: {
  'data-testid': string;
  errorMessage: string;
  errors: FieldErrors;
  id: string;
  label: string;
  name: string;
  onBlur: (event: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  optionalText?: string;
  propRef: Ref<any>;
  type?: string;
  value?: boolean;
  shouldDisplayRequiredHint?: boolean;
}) => {
  const inputProps = useMemo(() => ({ ref: propRef, 'aria-label': 'controlled' }), [propRef]);

  if (shouldDisplayRequiredHint) {
    label += ' *';
  }

  return (
    <Box sx={{ m: 2 }}>
      <FormGroup>
        <FormControlLabel
          label={label}
          control={
            <MUICheckbox
              checked={!!value}
              id={id}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              inputProps={inputProps}
              data-testid={dataTestId}
            />
          }
        />
      </FormGroup>
    </Box>
  );
};
