import { Dictionary, ExtraValidation } from '@bedrockstreaming/form-builder';
import { Typography, Box, Grid } from '@mui/material';

import { FormIdForm } from './formId/formId.form';
import { SchemaForm } from './schema/upload/schema.form';
import { SchemaVisualizer } from './schema/schema.component';
import { DictionaryForm } from './dictionary/dictionary.form';
import { StepForm } from './step/step.form';
import { FieldForm } from './field/field.form';
import { PreviewForm } from './preview/preview.component';

export const Generator = ({
  dictionary,
  extraValidation
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
          <SchemaVisualizer
            dictionary={dictionary}
            extraValidation={extraValidation}
          />
          <PreviewForm
            dictionary={dictionary}
            extraValidation={extraValidation}
          />
        </Grid>
        <Grid item sm={4} md={6}>
          <FormIdForm dictionary={dictionary} />
          <SchemaForm dictionary={dictionary} />
          <DictionaryForm dictionary={dictionary} />
          <StepForm dictionary={dictionary} extraValidation={extraValidation} />
          <FieldForm
            dictionary={dictionary}
            extraValidation={extraValidation}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
