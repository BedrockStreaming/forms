# :construction_worker: form-builder

This library helps to dynamically build a form based on a definition schema and a dictionary of visual components.

## :building_construction: Install

```bash
npm install @bedrockstreaming/form-builder
```

## :rocket: Usage

In order to create a form using this library, you simply need to import the `FormBuilder` component, and instantiate it with the following props:

- `schema`: an object that will contain all the **fields** you want to display in your form, as well as the **steps** and the **stepsById**.
- `dictionary`: an object that will map all the fields of the schema with the React component you provide
- `onSubmit`: the function you want to be called when the form is submitted

### schema

You should provide a `schema` with the following structure:

```jsx
const schema = {
  fields: {
    'some-unique-identifier': {
      id: 'some-unique-identifier',
      title: 'First name',
      type: 'text'
    },
    ...
  },
  steps: {
    'step-foo': {
      id: 'step-foo',
      fieldsById: ['some-unique-identifier'],
      submit: {
        label: 'foo', // submit button label
      },
    },
  },
  stepsById: ['step-foo']
};
```

### dictionary

You can then assign each type of field you have declared in your `schema` by configuring the `dictionary` prop:

```jsx
const dictionary = {
  'some-unique-identifier': MyUniqueInput,
  submit: MySubmitButton, // mandatory field
  ...
};
```

Make sure the `dictionary` keys corresponds to your fields types.

### onSubmit

The `onSubmit` callback is called when submitting the form, it follows `react-hook-form` API.

---

By default, the form schema must include steps, even for a single one.

### Single step forms

Example usage of a form that will display one text input.

```jsx
import React from 'react';
import { FormBuilder } from '@bedrockstreaming/form-builder';

const schema = {
  fields: {
    foo: {
      id: 'foo',
      title: 'name',
      type: 'text',
      meta: {
        label: 'Your name',
      },
    },
  },
  steps: {
    'single-step-form': {
      fieldsById: ['foo'],
      id: 'single-step-form',
      submit: {
        label: 'submit',
      },
    },
  },
  stepsById: ['single-step-form'],
};

const dictionary = {
  text: ({ value, onChange, label }) => (
    <input type="text" value={value} onChange={onChange} placeholder={label} />
  ),
  submit: ({ label }) => <button type="submit">{label}</button>,
};

const FormWrapper = () => {
  const onSubmit = (fieldValues) => {
    return someAPICall(fieldValues).then(() => ...);
  };

  return (
    <div>
      <FormBuilder
        schema={schema}
        dictionary={dictionary}
        onSubmit={onSubmit}
      />
    </div>
  )
}
```

### Multi steps forms

Example usage of a form that will display two steps.

```jsx
import React from 'react';
import { FormBuilder } from '@bedrockstreaming/form-builder';

const schema = {
  fields: {
    foo: {
      id: 'foo',
      title: 'name',
      type: 'text',
      meta: {
        label: 'some label',
      },
    },
    bar: {
      id: 'bar',
      title: 'email',
      type: 'text',
      meta: {
        label: 'some label',
      },
    },
  },
  steps: {
    'multi-step-form-1': {
      fieldsById: ['foo'],
      id: 'multi-step-form-1',
      submit: {
        label: 'next',
      },
    },
    'multi-step-form-2': {
      fieldsById: ['bar'],
      id: 'multi-step-form-2',
      submit: {
        label: 'submit',
      },
    },
  },
  stepsById: ['multi-step-form-1', 'multi-step-form-2'],
};

const dictionary = {
  text: () => <input type="text" placeholder="Your name" />,
};

const LAST_STEP_INDEX = schema.stepsById.length - 1;

const FormWrapper = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const onSubmit = (fieldValues) => {
    return someAPICall(fieldValues).then(() => ...)
  };

  return (
    <div>
      <FormBuilder
        schema={schema}
        dictionary={dictionary}
        currentStepIndex={stepIndex}
        onSubmit={onSubmit}
        onNextStep={() => setStepIndex((oldIndex) => oldIndex === LAST_STEP_INDEX ? oldIndex : oldIndex + 1)}
        onPreviousStep={() => setStepIndex((oldIndex) => oldIndex === 0 ? oldIndex : oldIndex - 1)}
      />
    </div>
  );
};
```

### Navigating in a multi-step form

This library doesn't provide steps state management by default. You can implement your own step management logic through the `onNextStep` and `onPreviousStep` callbacks, there you can change the `currentStepIndex` prop passed to the `FormBuilder` as it is done in the previous example.

:bulb: If you are using redux, we have a slice ready for you :point_right: [@bedrockstreaming/form-redux](../form-redux/README.md)

## FormField

The FormField specifics should be handled in the `dictionary` components
The FormField has props:

- id: the unique identifier of the field
- fieldType: the dictionary type of the field
- dictionary: the list of implemented fields
- setFieldValue: a wrapper to the native react-hooks-form function `setValue`, allow to change the field value without making a controlled component
- errors: return from react-hook-form with errors type and message
- validation: get the validation rules from the form config

## Dictionary

Dictionary components (field components) must accept three props:

- propRef: the field registered ref
- name: the id of the field element
- onChange: the onChange callback

## Validation

To do fields validation, we use the native implementation of react-hooks-form. We get access to a `rule` prop that is passed to our (currently controlled) components, which takes an object that can have several rules.

When we need more personalization in our validation for a special type of field for example, we need to do 2 things :

- Create an object containing the custom validation functions and pass it to the `extraValidation` prop of the form-Builder
- Reference those `extraValidation` functions in the schema config

```jsx
  const extraValidation = {
    'customValidationFunction1': (valueFromSchema) => fieldValue => doCustomValidationHere(valueFromSchema, fieldValue),
  };

  const schema = {
    fields: {
      birthDate: {
        ...
        meta: {
          ...
        },
        validation: {
          customValidationFunction1: { // <-- this is a custom validation
            key: 'customValidationFunction1',
            message: 'some.translated.message.minAgeError',
            value: 13,
          },
          required: { // <-- this is a default validation (native to react-hook-form)
            key: 'required',
            message: 'some.translated.message.requiredError',
            value: true,
          },
        },
      },
    }
  };

  const MyForm = () => (
    <FormBuilder
      schema={schema}
      extraValidation={extraValidation}
      dictionary={dictionary}
      onSubmit={onSubmit}
    />
  );

  // More info on the official react-hooks-form doc : https://react-hook-form.com/get-started#Applyvalidation
```

## Examples

For real-world usage, see the [demo](../../apps/demo) app and the [form-editor](../form-editor) lib.

## Contributing

### Running unit tests

Run `yarn nx test form-builder` to execute the unit tests via [Jest](https://jestjs.io).
