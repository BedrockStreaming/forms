import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FieldValues } from 'react-hook-form';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import {
  getCurrentStepIndex,
  isLastStep as isLastStepSelector,
  initForm,
  setNextStep,
  updateFormData,
  getFormData,
  setPreviousStep
} from '@bedrockstreaming/form-redux';
import _ from 'lodash';

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

const Container = styled.div`
  padding: 24px;
  margin: 0 auto;
  width: 600px;
  background: white;
  border: 1px solid black;
  border-radius: 25px;

  .complete-li {
    color: #4ed569;
  }

  .incomplete-li,
  .idle-li {
    color: #da3b2b;
  }
`;

const Form = () => {
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

  const handlePreviousStep = () => {
    dispatch(setPreviousStep(formId));
  };

  useEffect(
    () => () => {
      cleanUseSubmit();
    },
    [cleanUseSubmit]
  );
  return (
    <Container>
      <FormBuilder
        dictionary={dictionary}
        schema={schema}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        onSubmit={handleSubmit}
        currentStepIndex={currentStepIndex}
        isLastStep={isLastStep}
        extraValidation={extraValidation}
        defaultValues={
          _.isEmpty(previousValues) ? defaultValues : previousValues
        }
      />
    </Container>
  );
};

export default Form;
