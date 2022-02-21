import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { FieldValues } from 'react-hook-form';
import { Dictionary, FormBuilder, ExtraValidation } from '@bedrockstreaming/form-builder';
import {
  getCurrentStepIndex,
  isLastStep as isLastStepSelector,
  initForm,
  setNextStep,
  updateFormData,
  getFormData,
} from '@bedrockstreaming/form-redux';

import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { makeSchema } from './config';
import { useStyles } from '../../useStyles';
import { getSchema } from '../../generator.selectors';
import { addField } from '../../generator.actions';
import { useSubmit } from '../../useSubmit.hook';

const formId = 'add-field';
const defaultValues = {
  fieldId: '',
  fieldName: '',
  fieldValidation: [],
  fieldType: '',
  fieldDefaultValue: '',
  stepId: '',
  positionInStep: 0,
};

export const FieldForm = ({
  dictionary,
  extraValidation,
}: {
  dictionary: Dictionary;
  extraValidation: ExtraValidation;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const isLastStep = useSelector(isLastStepSelector(formId));
  const previousValues = useSelector(getFormData(formId));
  const storedSchema = useSelector(getSchema);
  const schema = useMemo(
    () => makeSchema({ dictionary, extraValidation, schema: storedSchema }),
    [storedSchema, dictionary, extraValidation],
  );

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch, schema]);

  const [handleSubmit] = useSubmit(formId, addField);

  const handleNextStep = (fieldsValues: FieldValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexDirection="column">
          <Typography component="h2" variant="h6">
            {formId}
          </Typography>
          <Typography component="h4" variant="subtitle1">
            Add a new field to your schema
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ m: 2 }}>
          <FormBuilder
            formId={formId}
            dictionary={dictionary}
            schema={schema}
            defaultValues={_.isEmpty(previousValues) ? defaultValues : previousValues}
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
