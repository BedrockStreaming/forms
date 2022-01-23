import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export const OkKiddo = ({
  'data-testid': dataTestId
}: {
  'data-testid': string;
}) => {
  return (
    <Box sx={{ m: 2 }}>
      <Paper data-testid={dataTestId}>
        <Typography variant="h2">Oh you're under 20 ?</Typography>
        <Typography>OK KIDDO</Typography>
      </Paper>
    </Box>
  );
};
