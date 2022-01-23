import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export const Thanks = ({
  'data-testid': dataTestId
}: {
  'data-testid': string;
}) => {
  return (
    <Box sx={{ m: 2 }}>
      <Paper data-testid={dataTestId}>
        <Typography variant="h2">Thanks for submitting !</Typography>
      </Paper>
    </Box>
  );
};
