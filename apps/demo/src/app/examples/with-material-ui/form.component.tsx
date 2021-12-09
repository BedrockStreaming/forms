import { useEffect } from 'react';
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
  Divider,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { config } from '../../config';
import { dictionary } from './dictionary';
import { useSubmit } from '../../hooks/useSubmit.hook';
import { extraValidation } from '../../extraValidation';

const formId = 'register';
const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  password: ''
};

const {
  schemas: { register: schema }
} = config;

const useStyles = makeStyles({
  root: {
    margin: '0 auto',

    '& .validation-rule-ul': {
      display: 'flex',
      padding: 0,
      listStyle: 'none'
    },

    '& .validation-rule-ul li': {
      margin: '4px',
      fontSize: 'smaller'
    },

    '& .complete-li': {
      color: '#4ed569'
    },
    '& .incomplete-li,.idle-li': {
      color: '#da3b2b'
    }
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
    <Paper className={classes.root} sx={{ p: 2 }}>
      <Typography component="h1" variant="h6">
        {formId}
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
    </Paper>
  );
};

export default Form;