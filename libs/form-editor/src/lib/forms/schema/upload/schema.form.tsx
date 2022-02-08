import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { FormBuilder, Dictionary } from '@bedrockstreaming/form-builder';
import { initForm } from '@bedrockstreaming/form-redux';

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { schema } from './config';
import { useStyles } from '../../../useStyles';
import { useSubmit } from '../../../useSubmit.hook';
import { addSchema } from '../../../generator.actions';

const formId = 'upload-schema';
const defaultValues = {
  schema: ''
};

export const SchemaForm = ({ dictionary }: { dictionary: Dictionary }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const [handleSubmit] = useSubmit(formId, addSchema);

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexDirection="column">
          <Typography component="h2" variant="h6">
            {formId}
          </Typography>
          <Typography component="h4" variant="subtitle1">
            Copy paste your existing schema
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ m: 2 }}>
          <FormBuilder
            formId={formId}
            dictionary={dictionary}
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
