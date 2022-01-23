import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export const OkBoomer = ({
  'data-testid': dataTestId
}: {
  'data-testid': string;
}) => {
  return (
    <Box sx={{ m: 2 }}>
      <Paper data-testid={dataTestId}>
        <Typography variant="h2">Oh you're above 40 ?</Typography>
        <Typography>OK BOOMER</Typography>
      </Paper>
    </Box>
  );
};
