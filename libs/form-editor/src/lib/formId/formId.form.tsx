import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { FieldValues } from 'react-hook-form';
import { Dictionary, FormBuilder } from '@bedrockstreaming/form-builder';
import {
  initForm,
  setNextStep,
  updateFormData
} from '@bedrockstreaming/form-redux';

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { schema } from './config';
import { useStyles } from '../useStyles';
import { useSubmit } from '../useSubmit.hook';
import { addFormId } from '../generator.actions';

const formId = 'add-form-id';
const defaultValues = {
  formId: ''
};

export const FormIdForm = ({ dictionary }: { dictionary: Dictionary }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const [handleSubmit] = useSubmit(formId, addFormId);

  const handleNextStep = (fieldsValues: FieldValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  return (
    <Accordion className={classes.root} sx={{ p: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexDirection="column">
          <Typography component="h2" variant="h6">
            {formId}
          </Typography>
          <Typography component="h4" variant="subtitle1">
            Choose a unique identifier
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ m: 2 }}>
          <FormBuilder
            dictionary={dictionary}
            schema={schema}
            defaultValues={defaultValues}
            onNextStep={handleNextStep}
            onSubmit={handleSubmit}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
