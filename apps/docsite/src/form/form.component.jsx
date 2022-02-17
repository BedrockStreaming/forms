import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

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
  Divider,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { config } from './config';
import { dictionary } from './dictionary';
import { useSubmit } from './hooks/useSubmit.hook';
import { extraValidation } from './extraValidation';
import FormResults from './results.component';

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  password: ''
};

const {
  formIds: { register: formId, },
  schemas: { register: schema }
} = config;

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
  }
});

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const isLastStep = useSelector(isLastStepSelector(formId));
  const previousValues = useSelector(getFormData(formId));

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const [handleSubmit, cleanUseSubmit] = useSubmit(formId);

  const handleNextStep = (fieldsValues) => {
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
    <Paper className={classes.root} sx={{ p: 2 }} data-testid="form-example">
      <Typography sx={{ p: 1}} component="h1" variant="h6">
        Multi Step Registration Form Demo
      </Typography>
      <Divider />
      <Box sx={{ m: 2 }}>
        <Box sx={{ p: 2 }}>
          <Stepper activeStep={currentStepIndex}>
            {Object.keys(schema.steps).map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        <FormBuilder
          formId={formId}
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
      <FormResults results={_.isEmpty(previousValues) ? defaultValues : previousValues} />
    </Paper>
  );
};

export default Form;
