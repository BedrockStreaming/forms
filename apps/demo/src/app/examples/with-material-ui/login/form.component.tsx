import { useEffect } from 'react';
import _ from 'lodash';

import { FieldValues } from 'react-hook-form';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import {
  useFormsDispatch,
  useFormsState,
  getCurrentStepIndex,
  isLastStep as isLastStepSelector,
  initForm,
  setNextStep,
  updateFormData,
  getFormData
} from '@bedrockstreaming/form-context';
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

import { config } from '../../../login.config';
import { CONTEXT_DICTIONARY as dictionary } from '../dictionary';
import { useSubmit } from '../../../hooks/useLoginSubmit.hook';
import { extraValidation } from '../../../extraValidation';

const formId = 'login';
const defaultValues = {
  email: '',
  password: ''
};

const {
  schemas: { login: schema }
} = config;

const useStyles = makeStyles({
  root: {
    margin: '16px auto',

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
    },
    '& .step-fields-actions': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }
  }
});

const Form = () => {
  const classes = useStyles();
  const dispatch = useFormsDispatch();
  const state = useFormsState();
  const currentStepIndex = getCurrentStepIndex(formId)(state);
  const isLastStep = isLastStepSelector(formId)(state);
  const previousValues = getFormData(formId)(state);

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const handleSubmit = useSubmit(formId);

  const handleNextStep = (fieldsValues: FieldValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  return (
    <Paper className={classes.root} sx={{ p: 2, m: 2 }}>
      <Typography component="h1" variant="h6">
        {formId} with React Context API
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
    </Paper>
  );
};

export default Form;
