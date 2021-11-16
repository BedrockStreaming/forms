import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FormBuilder } from '@forms/form-builder';
import {
  getCurrentStepIndex,
  isLastStep as isLastStepSelector,
  initForm,
  setNextStep,
  updateFormData
} from '@forms/form-redux';
import { config } from './config';
import { dictionary } from './dictionary';
import { useSubmit } from './hooks/useSubmit.hook';
import { extraValidation } from './extraValidation';

const formId = 'register';
const {
  schemas: { register: schema }
} = config;

const Container = styled.div`
  padding: 24px;
  margin: 0 auto;
  width: 600px;
  background: white;
  border: 1px solid black;
  border-radius: 25px;
`;

const Form = () => {
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const isLastStep = useSelector(isLastStepSelector(formId));

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const [handleSubmit, cleanUseSubmit] = useSubmit(formId);

  const handleNextStep = (fieldsValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  useEffect(() => () => cleanUseSubmit(), [cleanUseSubmit]);

  return (
    <Container>
      <FormBuilder
        dictionary={dictionary}
        schema={schema}
        onNextStep={handleNextStep}
        onSubmit={handleSubmit}
        currentStepIndex={currentStepIndex}
        isLastStep={isLastStep}
        extraValidation={extraValidation}
      />
    </Container>
  );
};

export default Form;
