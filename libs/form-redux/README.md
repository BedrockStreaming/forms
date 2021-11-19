# form-redux

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
import React from 'react';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import {
  getCurrentStepIndex,
  getFormConfiguration,
  isLastStep,
  resetForm,
  initForm,
  setNextStep,
} from '@bedrockstreaming/form-redux';
import { fooSubmitAction } from '<my-app-module>';

export const FooForm = () => {
  const dispatch = useDispatch();
  const { foo: formId } = useSelector(getFormIds);
  const schema = useSelector(getFormConfiguration(formId));
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));
  const currentStepMeta = useSelector(
    getCurrentStepMeta(formId, currentStepIndex)
  );
  const shouldSubmit = useSelector(isLastStep(formId));

  useEffect(() => {
    dispatch(initForm(formId, schema));
  }, [formId, schema]);

  const handleSubmit = (formId) => (fieldValues) => {
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
      onSubmit={handleSubmit(formId)}
      currentStepIndex={currentStepIndex}
    />
  );
};
```

## Running unit tests

Run `nx test form-redux` to execute the unit tests via [Jest](https://jestjs.io).

## Dependencies

- redux
- redux-thunk
