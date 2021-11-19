# :construction_worker: form-builder

This utility package allows to dynamically build a form based on an input configuration and a dictionary of visual components.

## :building_construction: Install

```bash
npm install @bedrockstreaming/form-builder
```

## :rocket: Usage

### How to create a form using the FormBuilder?

In order to create a form using the Form-Builder, you simply need to import the Form-Builder from the package, render the components in the JSX and provide it with the following props:

- `schema`: an object that will contains all the fields you want to display in your form
- `dictionary`: an object that will map all the fields of the schema with the React component you provide
- `onSubmit`: the function you want to be called when the form is submitted
- `currentStepIndex`: _optional_ the current form step index, use only for multi steps, 0 by default
- `extraValidation`: an object that will map custom validation functions to our fields, see Validation part of the doc

## How to configure your form?

- formId

Each form has a unique identifier, steps information and form data will be stored under this id inside the forms reducer.

- schema

To configure your form, you need to create a configuration `schema` to indicate which fields to render.
To do that, you should provide the `schema` with the following structure:

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
  fieldsById: ['some-unique-identifier'],
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

You can then assign each type of field you have declared in `schema` by configuring the `dictionary` prop:

```jsx
const dictionary = {
  text: MyTextFieldComponent,
  checkbox: MyCheckboxFieldComponent,
  submit: MySubmitButton, // mandatory field
  ...
};
```

Make sure the `dictionary` keys corresponds to your fields types.

### How to use it in my React application ?

By default, the form schema must include steps, even for a single one.

## Single step forms

Example usage of a form that will display one text input.

```jsx
import React from 'react';
import { FormBuilder } from '@bedrockstreaming/form-builder';

const schema = {
  fields: {
    1: {
      id: '1',
      title: 'name',
      type: 'text',
      meta: {
        label: 'i18n.path.to.label',
      },
    },
  },
  fieldsById: ['1'],
  steps: {
    'single-step-form': {
      fieldsById: ['1'],
      id: 'single-step-form',
      submit: {
        label: 'global.submit', // action contains the label for the submit button
      },
      meta: {}, // any step related data
    },
  },
  stepsById: ['single-step-form'],
};

const dictionary = {
  text: () => <input type="text" placeholder="Your name" />,
};

const DumbComponent = () => (
  <div>
    <FormBuilder schema={schema} dictionary={dictionary} onSubmit={() => {}} />
  </div>
);
```

## Multi steps forms

Example usage of a form that will display two steps.

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { FormBuilder } from '@bedrockstreaming/form-builder';
import { getCurrentStepIndex } from '@bedrockstreaming/form-redux';

const schema = {
  fields: {
    1: {
      id: '1',
      title: 'name',
      type: 'text',
      meta: {
        label: 'i18n.path.to.label',
      },
    },
    2: {
      id: '2',
      title: 'email',
      type: 'text',
      meta: {
        label: 'i18n.path.to.label',
      },
    },
  },
  fieldsById: ['1', '2'],
  steps: {
    'multi-step-form-1': {
      fieldsById: ['1'],
      id: 'multi-step-form-1',
      submit: {
        label: 'global.next',
      },
      meta: {},
    },
    'multi-step-form-2': {
      fieldsById: ['2'],
      id: 'multi-step-form-2',
      submit: {
        label: 'global.submit',
      },
      meta: {},
    },
  },
  stepsById: ['multi-step-form-1', 'multi-step-form-2'],
};

const dictionary = {
  text: () => <input type="text" placeholder="Your name" />,
};

const DumbComponent = () => {
  const currentStepIndex = useSelector(getCurrentStepIndex(formId));

  return (
    <div>
      <FormBuilder
        schema={schema}
        dictionary={dictionary}
        currentStepIndex={currentStepIndex}
        onSubmit={() => {}}
      />
    </div>
  );
};
```

### Navigating in a multi-step form

To navigate in a form built by the form-builder, you can use the redux module from [@bedrockstreamin/form-redux](../form-redux/README.md)

> e.g. `setNextStep(formId)` & `setPreviousStep(formId)` where the formId is the id of the form located in the config.

The next action is handled in the submit button, everything is handled by the form-builder so there is nothing to do but adding a submit field at every step of a new multistep form.

## FormField

The FormField specific logics should be handled in the `dictionary`  
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
    'customValidationFunction1': (...youCanPassAnyUsefullThingsHere) => fieldValue => doCustomValidationHere(fieldValue),
    'customValidationFunction2': () => fieldValue => doOtherCustomValidationHere(fieldValue),
  };

  const schema = {
    fields: {
      BIRTHDATE: {
        ...
        meta: {
          ...
        },
        validation: {
          customValidationFunction1: { // <-- this is a custom validation
            key: 'customValidationFunction1',
            message: 'forms.register.birthdate.minAgeError',
          },
          customValidationFunction2: {  // <-- this is a custom validation
            key: 'customValidationFunction2',
            message: 'forms.register.birthdate.maxAgeError',
          },
          required: { // <-- this is a default validation (native to react-hook-form)
            key: 'required',
            message: 'forms.required.error',
            value: true,
          },
        },
      },
  };

  ...
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

### Validation hints

In order to display some hints to the user regarding what validation is passing or not, we use `@bedrockstreaming/form-validation-rule-list` package. As a result, whenever you want to use a `ValidatedTextField` (or any input using the `withValidationRuleList` HOC), you need to do add a few things to your dictionary components:

- use `getValidationRulesHints` from `@bedrockstreaming/form-builder` to retrieve the rules. It will translate the error messages and format the validation errors to what's expected by `@bedrockstreaming/form-validation-rule-list` elements. Optionally, you can pass a config object in case you have some sprintf values to template inside your error messages.
- provide some `rules` and `colors` props
- use the `checkRules` function from `@bedrockstreaming/form-validation-rule-list`

```js
import { useTranslate } from '@m6web/react-i18n';
import { getValidationRulesHints } from '@bedrockstreaming/form-builder';
import { checkRules } from '@bedrockstreaming/form-validation-rule-list';
import { onboarding } from '@mylib/config';
import { ValidatedPasswordTextField } from '@mylib/textfield';

const dictionary = {
  password: ({ errors, validation, ...props }) => {
    const t = useTranslate();
    const rules = getValidationRulesHints({
      t,
      errors,
      validation,
      config: onboarding,
    });
    const hasError = !!checkRules(props.value, rules).length;
    const fieldError = errors && errors.type;
    const isValid = !!(props.value && !hasError && !fieldError);

    return (
      <TextFieldTopMarginWrapper>
        <ValidatedPasswordTextField
          hasError={hasError}
          valid={isValid}
          {...props}
          rules={rules}
          colors={validationColors}
          label={t(props.label)}
        />
      </TextFieldTopMarginWrapper>
    );
  },
};
```

:warning: Beware, you can't use several `react-hook-form` default rules as validation hints since the `errors` object returned by the library can only contain one default rule error at a time.

### Running unit tests

Run `yarn nx test form-builder` to execute the unit tests via [Jest](https://jestjs.io).

### Running e2e tests

Run `yarn nx test form-builder` to execute the unit tests via [Jest](https://jestjs.io).
