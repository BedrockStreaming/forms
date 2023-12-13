import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStepIndex, setPreviousStep } from '@bedrockstreaming/form-redux';

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background: rgba(150, 100, 255);
`;

const PreviousButton = styled.button`
  padding: 8px 16px;
  color: rgba(150, 100, 255);
  background: white
  border: 1px solid rgba(150, 100, 255);
`;

export const Submit = ({
  label,
  formId,
  shouldDisplayRequiredHint,
  ...props
}: {
  label: string;
  formId: string;
  shouldDisplayRequiredHint?: boolean;
}) => {
  const dispatch = useDispatch();

  const shouldDisplayPrevious = useSelector(getCurrentStepIndex(formId)) !== 0;

  const handlePreviousStep = () => {
    dispatch(setPreviousStep(formId));
  };

  if (shouldDisplayRequiredHint) {
    label += ' *';
  }

  return (
    <ActionsWrapper>
      {shouldDisplayPrevious && (
        <PreviousButton onClick={handlePreviousStep} type="button">
          Previous
        </PreviousButton>
      )}
      <SubmitButton type="submit" {...props}>
        {label}
      </SubmitButton>
    </ActionsWrapper>
  );
};
