import { Button, Box } from '@mui/material';
import { Previous } from '../atoms/previous-context.component';

export const Submit = ({
  label,
  formId,
  ...props
}: {
  label: string;
  formId: string;
}) => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Previous label="Previous" formId={formId} />
      <Button variant="contained" sx={{ margin: 1 }} type="submit" {...props}>
        {label}
      </Button>
    </Box>
  );
};
