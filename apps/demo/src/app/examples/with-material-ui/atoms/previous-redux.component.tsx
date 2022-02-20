import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousStep, getCurrentStepIndex } from '@bedrockstreaming/form-redux';

export const Previous = ({ label, formId, ...props }: { label: string; formId: string }) => {
  const dispatch = useDispatch();

  const shouldDisplayPrevious = useSelector(getCurrentStepIndex(formId)) !== 0;

  const handlePreviousStep = () => {
    dispatch(setPreviousStep(formId));
  };

  return shouldDisplayPrevious ? (
    <Button onClick={handlePreviousStep} variant="outlined" sx={{ margin: 1 }} type="button" {...props}>
      {label}
    </Button>
  ) : null;
};
