---
id: form-redux
title: 🌐 Form Redux
---

`form-redux` is a redux slice for managing the forms steps.

## :question: Why

Since we are using `react-hook-form` to persist data locally, we are only storing the form data and step information on each form submission.

## :building_construction: Install

```bash
npm install @bedrockstreaming/form-redux
```

## :rocket: Usage

Import and subscribe the reducer.

```js
// reducers
import { reducer as forms } from '@bedrockstreaming/forms';

combineReducers({ forms, ... });
```

Use redux to control the form state.

```js
// a form using actions
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import {
  getCurrentStepIndex,
  isLastStep,
  resetForm,
  initForm,
  setNextStep,
} from '@bedrockstreaming/form-redux';

import { schema, formId } from './path/to/my/config';
import { fooSubmitAction } from '<my-app-module>';

export const FooForm = () => {
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const shouldSubmit = useSelector(isLastStep(formId));

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [dispatch]);

  const handleSubmit = (fieldValues) => {
    if (shouldSubmit) {
      dispatch(fooSubmitAction(fieldValues));
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
      currentStepIndex={currentStepIndex}
    />
  );
};
```
