import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { FormBuilder } from '@bedrockstreaming/form-builder';
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
import { dictionary } from '../../dictionary';
import { useSubmit } from './useSubmit';
import { extraValidation } from '../../../extraValidation';
import { useStyles } from '../../useStyles';

const formId = 'upload-schema';
const defaultValues = {
  schema: ''
};

export const SchemaForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const [handleSubmit] = useSubmit(formId);

  return (
    <Accordion className={classes.root} sx={{ p: 2 }}>
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
            dictionary={dictionary}
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            extraValidation={extraValidation}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
