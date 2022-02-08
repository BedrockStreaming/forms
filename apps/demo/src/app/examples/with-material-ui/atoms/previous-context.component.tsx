import {
  setPreviousStep,
  useFormsDispatch,
  useFormsState,
  getCurrentStepIndex
} from '@bedrockstreaming/form-context';
import { Button } from '@mui/material';

export const Previous = ({
  label,
  formId,
  ...props
}: {
  label: string;
  formId: string;
}) => {
  const dispatch = useFormsDispatch();
  const state = useFormsState();
  const shouldDisplayPrevious = getCurrentStepIndex(formId)(state) !== 0;

  const handlePreviousStep = () => {
    dispatch(setPreviousStep(formId));
  };

  return shouldDisplayPrevious ? (
    <Button
      onClick={handlePreviousStep}
      variant="outlined"
      sx={{ margin: 1 }}
      type="button"
      {...props}
    >
      {label}
    </Button>
  ) : null;
};
