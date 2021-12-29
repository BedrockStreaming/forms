import { Button } from '@mui/material';

export const Previous = ({ label, ...props }: { label: string }) => {
  return (
    <Button variant="outlined" sx={{ margin: 1 }} type="button" {...props}>
      {label || 'Previous'}
    </Button>
  );
};
