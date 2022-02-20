import { Dictionary, ExtraValidation } from '@bedrockstreaming/form-builder';
import { Typography, Box, Grid } from '@mui/material';

import { SchemaForm } from './forms/schema/upload/schema.form';
import { SchemaVisualizer } from './forms/schema/schema.component';
import { DictionaryForm } from './forms/dictionary/dictionary.form';
import { StepForm } from './forms/step/step.form';
import { FieldForm } from './forms/field/field.form';
import { ExtraValidationForm } from './forms/extraValidation/extraValidation.form';
import { PreviewForm } from './preview/preview.component';

export const Generator = ({
  dictionary,
  extraValidation,
}: {
  dictionary: Dictionary;
  extraValidation: ExtraValidation;
}) => {
  return (
    <Box>
      <Typography component="h1" variant="h6">
        Form Schema Generator
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12} md={6}>
          <SchemaVisualizer dictionary={dictionary} extraValidation={extraValidation} />
          <PreviewForm dictionary={dictionary} extraValidation={extraValidation} />
        </Grid>
        <Grid item sm={4} md={6}>
          <SchemaForm dictionary={dictionary} />
          <DictionaryForm dictionary={dictionary} />
          <ExtraValidationForm dictionary={dictionary} />
          <StepForm dictionary={dictionary} extraValidation={extraValidation} />
          <FieldForm dictionary={dictionary} extraValidation={extraValidation} />
        </Grid>
      </Grid>
    </Box>
  );
};
