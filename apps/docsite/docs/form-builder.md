---
id: form-builder
title: 👷‍♂️ Form Builder
---

This utility package allows to dynamically build a form based on an input configuration and a dictionary of visual components.

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

```ts
import {
  DeepMap,
  DeepPartial,
  Path,
  PathValue,
  UnionLike,
  UnpackNestedValue,
} from 'react-hook-form';

export interface FormSchema {
  fields: {
    [FieldId: string]: {
      id: string;
      title: string;
      type: string;
      meta?: {
        [key: string]: unknown;
      };
      dependsOn?: Array<
        | string
        | {
            key: string;
            value?: string | number | null | string[] | number[];
            callback: string;
          }
      >;
      validation?: {
        [key: string]: {
          key: string;
          type?: string;
          message: string;
          value?: unknown;
        };
      };
      defaultValue?:
        | UnpackNestedValue<PathValue<unknown, never>>
        | string
        | number
        | string[]
        | number[]
        | Path<string>;
    };
  };
  steps: {
    [StepId: string]: {
      id: string;
      fieldsById: string[];
      submit: {
        label: string;
      };
      meta?: {
        [key: string]: unknown;
      };
    };
  };
  stepsById: string[];
}
```

See this stripped down example below of a single input form

```jsx
const schema = {
  fields: {
    'some-unique-identifier': {
      id: 'some-unique-identifier',
      title: 'First name',
      type: 'text',
    },
    // ...
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
  stepsById: ['step-foo'],
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

---

Dictionary components (field components) can use some defined props,

Here are all the base props that will be passed to every FormField.

```ts
export interface FormFieldProps {
  id: string;
  validation?: Validations;
  errors?: ErrorOption;
  setFieldValue?: SetFieldValue<string | number>;
  triggerValidationField?: (value: Path<FieldValues>) => void;
  propRef?: Ref;
  disabled?: boolean;
  label?: string;
  onClick?: (event: any) => void;
  isValidating?: boolean;
}
```

:::tip

You can leverage the `meta` field property to pass more values to your field !

:::

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

:bulb: If you are using redux, we have a slice ready for you :point_right: [@bedrockstreaming/form-redux](./form-redux.md)

## Dictionary

## Validation

To do fields validation, we use the native implementation of `react-hooks-form`. We leverage it through the validation field property.

When we want to perform a complex or very specific validation, even async, we need to:

- Create an object containing the custom validation functions and pass it to the `extraValidation` prop of the form-Builder
- Reference those `extraValidation` functions in the schema config

```jsx
const extraValidation = {
  customValidationFunction1: (valueFromSchema) => (fieldValue) =>
    doCustomValidationHere(valueFromSchema, fieldValue),
};

const schema = {
  fields: {
    birthdate: {
      // [...]
      validation: {
        customValidationFunction1: {
          // <-- this is a custom validation
          key: 'customValidationFunction1',
          message: 'forms.register.birthdate.minAgeError',
          value: 13,
        },
        required: {
          // <-- this is a default validation (native to react-hook-form)
          key: 'required',
          message: 'forms.required.error',
          value: true,
        },
      },
    },
  },
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

## Conditional Fields

You can add a `dependsOn` entry in any of your field schema.

```ts
export interface FormField {
  // [...]
  dependsOn?: Array<
    | string // an other field id
    | {
        fieldId: string; // an other field id
        key: string; // validation key
        value?: string | number | null | string[] | number[]; // any serializable value, works the same way as validation
        validate?: boolean; // perform an extra validation "manually"
      }
  >;
}
```

### Using strings

When using a string, corresponding to a field id, the form builder will hide the field until those target field ids have been touched and validated.

```jsx
const schema = {
  fields: {
    someField: {
      id: 'someField',
      // ...
    },
    myConditionalField: {
      id: 'myConditionalField',
      dependsOn: [
        {
          key: 'someField',
          callback: 'customValidationFunction1',
          value: 13,
        },
      ],
    },
  },
};
```

### Using objects

Otherwise, when using objects, you can either check for a specific validation error or leverage the `extraValidation` functions to execute a

```jsx
const extraValidation = {
  customValidationFunction1: (valueFromSchema) => (fieldValue) =>
    doCustomValidationHere(valueFromSchema, fieldValue),
  customValidationFunction2: (valueFromSchema) => (fieldValue) =>
    valueFromSchema === fieldValue,
};

const schema = {
  fields: {
    someField: {
      id: 'someField',
      validation: {
        key: 'customValidationFunction2'
        value: 'foo',
        message: 'Some error message'
      }
      // ...
    },
    myConditionalField: {
      id: 'myConditionalField',
      dependsOn: [
        {
          fieldId: 'someField',
          key: 'customValidationFunction1',
          value: 13,
          validate: true,
        },
        {
          fieldId: 'someField',
          key: 'customValidationFunction2',
        },
      ],
    },
  },
};
```

:::tip

When using boolean values (e.g. for checkbox), there is no other way than asserting the opposite of the default value to display a conditional field

:::
