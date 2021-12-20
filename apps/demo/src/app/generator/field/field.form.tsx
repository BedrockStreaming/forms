import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { FieldValues } from 'react-hook-form';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import {
  getCurrentStepIndex,
  isLastStep as isLastStepSelector,
  initForm,
  setNextStep,
  updateFormData,
  getFormData
} from '@bedrockstreaming/form-redux';

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { makeSchema } from './config';
import { dictionary } from '../dictionary';
import { useSubmit } from './useSubmit';
import { extraValidation } from '../../extraValidation';
import { getSchema } from '../generator.selectors';
import { useStyles } from '../useStyles';

const formId = 'add-field';
const defaultValues = {
  fieldId: '',
  fieldName: '',
  fieldTitle: '',
  fieldValidation: [],
  fieldType: '',
  fieldDefaultValue: '',
  stepId: '',
  positionInStep: 0
};

export const FieldForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const isLastStep = useSelector(isLastStepSelector(formId));
  const previousValues = useSelector(getFormData(formId));
  const storedSchema = useSelector(getSchema);
  const schema = useMemo(
    () => makeSchema({ dictionary, extraValidation, schema: storedSchema }),
    [storedSchema]
  );

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch, schema]);

  const [handleSubmit, cleanUseSubmit] = useSubmit(formId);

  const handleNextStep = (fieldsValues: FieldValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  useEffect(
    () => () => {
      cleanUseSubmit();
    },
    [cleanUseSubmit]
  );

  return (
    <Accordion className={classes.root} sx={{ p: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography component="h1" variant="h6">
          {formId}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ m: 2 }}>
          <FormBuilder
            dictionary={dictionary}
            schema={schema}
            defaultValues={
              _.isEmpty(previousValues) ? defaultValues : previousValues
            }
            onNextStep={handleNextStep}
            onSubmit={handleSubmit}
            currentStepIndex={currentStepIndex}
            isLastStep={isLastStep}
            extraValidation={extraValidation}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
