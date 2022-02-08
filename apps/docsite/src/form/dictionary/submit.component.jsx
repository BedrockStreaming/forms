import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Box } from '@mui/material';
import { getCurrentStepIndex, setPreviousStep } from '@bedrockstreaming/form-redux';

export const Submit = ({ label, formId, ...props }) => {
  const dispatch = useDispatch();
  const shouldDisplayPrevious = useSelector(getCurrentStepIndex(formId)) !== 0;
  console.log({shouldDisplayPrevious})

  const handlePreviousStep = () => {
    dispatch(setPreviousStep(formId));
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      {shouldDisplayPrevious && (
        <Button
          onClick={handlePreviousStep}
          variant="outlined"
          sx={{ margin: 1 }}
          type="button"
        >
          Previous
        </Button>
      )}
      <Button variant="contained" sx={{ margin: 1 }} type="submit" {...props}>
        {label}
      </Button>
    </Box>
  );
};
