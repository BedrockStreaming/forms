import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import { getSchema } from '../generator.selectors';

export const SchemaVisualizer = () => {
  const schema = useSelector(getSchema);
  return (
    <Paper sx={{ p: 1 }}>
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </Paper>
  );
};
