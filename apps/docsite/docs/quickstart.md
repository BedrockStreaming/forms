---
id: quickstart
title: Quick start
---

The following snippets will help you get started with our form-builder in no time ! :rocket:

## Install

```sh
yarn add @bedrockstreaming/form-builder
```

## Bootstrap a form

You can organize your files as you wish, this is a single file example for a quick start purpose

```jsx
import * as React from 'react';
import { FormBuilder } from '@bedrockstreaming/form-builder';

const dictionary = {
  submit: ({ label }) => <button type="submit">{label}</button>,
  text: ({ value, onChange, label, errors }) => {
    console.log(errors);
    return (
      <div>
        <label>{label}</label>
        <input value={value} onChange={onChange} />
        <span style={{ marginLeft: '10px', color: 'red' }}>
          {errors?.message}
        </span>
      </div>
    );
  },
};

const schema = {
  fields: {
    firstname: {
      id: '1',
      title: 'first name',
      type: 'text',
      meta: {
        label: 'First name: ',
      },
      defaultValue: '',
    },
    lastname: {
      id: '2',
      title: 'last name',
      type: 'text',
      meta: {
        label: 'Last name: ',
      },
      defaultValue: '',
      validation: {
        required: {
          key: 'required',
          message: 'this field is required',
          value: true,
        },
      },
    },
  },
  fieldsById: ['firstname', 'lastname'],
  steps: {
    'single-step-form': {
      fieldsById: ['firstname', 'lastname'],
      id: 'single-step-form',
      submit: {
        label: 'Submit', // action contains the label for the submit button
      },
      meta: {}, // any step related data
    },
  },
  stepsById: ['single-step-form'],
};

const extraValidation = {};

const onSubmit = (formValues) => {
  console.log(formValues);
};

const MyForm = () => (
  <FormBuilder
    schema={schema}
    extraValidation={extraValidation}
    dictionary={dictionary}
    onSubmit={onSubmit}
  />
);

export default MyForm;
```

<iframe
  src="https://codesandbox.io/embed/simple-form-builder-pdxxd?fontsize=14&hidenavigation=1&theme=dark&editorsize=70&view=editor"
  style={{ width:"100%", height: "500px", border: 0, borderRadius: "4px", overflow:"hidden"}}
  title="simple-form-builder"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
