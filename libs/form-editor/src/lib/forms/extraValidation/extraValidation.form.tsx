import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { FormBuilder, Dictionary } from '@bedrockstreaming/form-builder';
import { initForm } from '@bedrockstreaming/form-redux';

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { makeSchema } from './config';
import { useStyles } from '../../useStyles';
import { useSubmit } from '../../useSubmit.hook';
import { addExtraValidation } from '../../generator.actions';
import { getExtraValidationList } from '../../generator.selectors';

const formId = 'upload-extraValidation';
const defaultValues = {
  extraValidationList: ''
};

export const ExtraValidationForm = ({
  dictionary
}: {
  dictionary: Dictionary;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const extraValidationList = useSelector(getExtraValidationList);
  const schema = makeSchema(extraValidationList);

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch, schema]);

  const [handleSubmit] = useSubmit(formId, addExtraValidation);

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexDirection="column">
          <Typography component="h2" variant="h6">
            {formId}
          </Typography>
          <Typography component="h4" variant="subtitle1">
            Copy paste your existing extraValidation object
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ m: 2 }}>
          <FormBuilder
            formId={formId}
            dictionary={dictionary}
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
