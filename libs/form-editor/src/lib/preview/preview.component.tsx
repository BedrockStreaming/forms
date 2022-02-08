import { useEffect } from 'react';
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
  updateFormData
} from '@bedrockstreaming/form-redux';

import { Typography, Box, Paper, Alert } from '@mui/material';

import { useSubmit } from '../useSubmit.hook';
import { getSchema, getDictionary } from '../generator.selectors';
import { useStyles } from '../useStyles';
import { submitPreview } from '../generator.actions';

const defaultValues = {};
const formId = 'user-form';

export const PreviewForm = ({
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
  const schema = useSelector(getSchema);
  const userDictionary = useSelector(getDictionary);

  useEffect(() => {
    if (formId && schema && schema.stepsById.length > 1) {
      dispatch(initForm(formId, schema));
    }
  }, [dispatch, schema]);

  const [handleSubmit] = useSubmit(formId, submitPreview);

  const handleNextStep = (fieldsValues: FieldValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  return (
    <Paper className={classes.root} sx={{ p: 2 }}>
      <Typography component="h1" variant="h6" gutterBottom>
        Preview {formId}
      </Typography>
      {userDictionary && (
        <Alert severity="warning">
          You can't use your own dictionary online, use{' '}
          <b>@bedrockstreaming/form-editor</b> in your project instead
        </Alert>
      )}

      <Box sx={{ m: 2 }}>
        <FormBuilder
          formId={formId}
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
