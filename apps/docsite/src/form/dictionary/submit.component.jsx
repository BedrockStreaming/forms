import * as React from 'react';
import { Button } from '@mui/material';

export const Submit = ({ label, ...props }) => {
  return (
    <Button variant="contained" sx={{ margin: 1 }} type="submit" {...props}>
      {label}
    </Button>
  );
};
