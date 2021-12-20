import { Typography, Box, Grid, Divider } from '@mui/material';

import { FieldForm } from './field/field.form';
import { SchemaVisualizer } from './schema/schema.component';
import { StepForm } from './step/step.form';
import { PreviewForm } from './preview/preview.component';

const Generator = () => {
  return (
    <Box>
      <Typography component="h1" variant="h6">
        Form Schema Generator
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <SchemaVisualizer />
          <Divider />
          <PreviewForm />
        </Grid>
        <Grid item sm={4}>
          <FieldForm />
          <StepForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Generator;
