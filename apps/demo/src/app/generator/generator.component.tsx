import { Typography, Box, Grid, Divider } from '@mui/material';

import { FieldForm } from './field/field.form';
import { SchemaVisualizer } from './schema/schema.component';
import { StepForm } from './step/step.form';
import { PreviewForm } from './preview/preview.component';
import { FormIdForm } from './formId/formId.form';
import { SchemaLoader } from './schema/schemaLoader.component';
import { DictionaryForm } from './dictionary/dictionary.form';
import { SchemaForm } from './schema/upload/schema.form';

const Generator = () => {
  return (
    <Box>
      <Typography component="h1" variant="h6">
        Form Schema Generator
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12} md={6}>
          <SchemaVisualizer />
          <PreviewForm />
        </Grid>
        <Grid item sm={4} md={6}>
          <FormIdForm />
          <SchemaForm />
          <DictionaryForm />
          <StepForm />
          <FieldForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Generator;
