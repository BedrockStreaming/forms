---
id: form-context
title: 🌐 Form Context
---

`form-context` is a React reducer solution to manage steps.

## :question: Why

Since we are using `react-hook-form` to persist data locally, we are only storing the form data and step information on each step submission.

:::note

You can avoid to store any form data if you wish

:::

## :building_construction: Install

```bash
npm install @bedrockstreaming/form-context
```

## :rocket: Usage

```js
import { useEffect } from 'react';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import {
  getCurrentStepIndex,
  isLastStep,
  resetForm,
  initForm,
  setNextStep,
  useFormsDispatch,
  useFormsState,
  FormProvider,
} from '@bedrockstreaming/form-context';

import { schema, formId } from './path/to/my/config';
import { fooSubmitAction } from '<my-app-module>';

const FooForm = () => {
  const dispatch = useFormsDispatch();
  const state = useFormsState();
  const currentStepIndex = getCurrentStepIndex(formId)(state);
  const shouldSubmit = isLastStepSelector(formId)(state);
  const previousValues = getFormData(formId)(state);

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const handleSubmit = useSubmit(formId);

  const handleNextStep = (fieldsValues: FieldValues) => {
    dispatch(updateFormData(formId, fieldsValues));
    dispatch(setNextStep(formId));
  };

  const handleSubmit = (fieldValues: FieldValues) => {
    if (shouldSubmit) {
      fooSubmit(fieldValues);
      dispatch(resetForm(formId));
    } else {
      dispatch(setNextStep(formId));
    }
  };

  return (
    <FormBuilder
      dictionary={dictionary}
      schema={schema}
      onSubmit={handleSubmit}
      handleNextStep={handleNextStep}
      currentStepIndex={currentStepIndex}
    />
  );
};

export const FormContainer = () => {
  return (
    <FormsProvider>
      <Form />
    </FormsProvider>
  );
};
```
