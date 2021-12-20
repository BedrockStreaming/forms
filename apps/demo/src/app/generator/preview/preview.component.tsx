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
  updateFormData
} from '@bedrockstreaming/form-redux';

import { Typography, Box, Paper } from '@mui/material';

import { dictionary } from '../dictionary';
import { useSubmit } from './useSubmit';
import { extraValidation } from '../../extraValidation';
import { getSchema, getTargetFormId } from '../generator.selectors';
import { useStyles } from '../useStyles';

const defaultValues = {};

export const PreviewForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formId = useSelector(getTargetFormId);
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const isLastStep = useSelector(isLastStepSelector(formId));
  const schema = useSelector(getSchema);

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch, schema, formId]);

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
        Preview {formId}
      </Typography>

      <Box sx={{ m: 2 }}>
        <FormBuilder
          dictionary={dictionary}
          schema={schema}
          defaultValues={defaultValues}
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
