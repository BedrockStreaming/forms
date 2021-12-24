import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { FieldValues } from 'react-hook-form';
import {
  Dictionary,
  FormBuilder,
  ExtraValidation
} from '@bedrockstreaming/form-builder';
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

import { getFields, getSchema } from '../generator.selectors';
import { makeSchema } from './config';
import { useSubmit } from '../useSubmit.hook';
import { useStyles } from '../useStyles';
import { addStep } from '../generator.actions';

const formId = 'add-step';
const defaultValues = {
  stepId: '',
  stepSubmitLabel: '',
  stepFieldsById: [],
  stepPosition: 0
};

export const StepForm = ({
  dictionary,
  extraValidation
}: {
  dictionary: Dictionary;
  extraValidation: ExtraValidation;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const isLastStep = useSelector(isLastStepSelector(formId));
  const previousValues = useSelector(getFormData(formId));
  const fields = useSelector(getFields);
  const storedSchema = useSelector(getSchema);
  const schema = useMemo(
    () => makeSchema({ fields, schema: storedSchema }),
    [fields, storedSchema]
  );

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch, schema]);

  const [handleSubmit] = useSubmit(formId, addStep);

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
            Add a step to your form (min 1)
          </Typography>
        </Box>
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
