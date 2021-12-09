import { Button } from '@mui/material';

export const Submit = ({ label, ...props }: { label: string }) => {
  return (
    <Button variant="contained" sx={{ margin: 1 }} type="submit" {...props}>
      {label}
    </Button>
  );
};
