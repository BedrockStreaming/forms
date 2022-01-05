# :judge: form-validation-rule-list

This utility package allows to add a visual validation feedback to your users. It exposes a Higher Order Component adding some behavior to your existing inputs.

## :question: Why ?

By default, you can already validate your forms without adding any other library to the mix. It is also very trivial to display some error message since every dictionary component are receiving it from props. So why would you need something like `form validation rule list` ? **To give your users some hints about what is going wrong with their typing**. It's too often that we apply several validations rules on a single input and many of those rules are complaining at the same time, then what to display ?

## :building_construction: Install

```bash
npm install @bedrockstreaming/form-validation-rule-list
```

## :rocket: Usage

Extra validation

```jsx
const extraValidation = {
  oneUpperCaseCharacter: () => (fieldValue) => /(?=.*[A-Z])/.test(fieldValue),
  minLength: (minLengthValue) => (fieldValue) =>
    fieldValue && fieldValue.length >= minLengthValue,
};
```

Schema

```jsx
const schema = {
  fields: {
    password: {
      id: 'password',
      type: 'password',
      validation: {
        oneUpperCaseCharacter: {
          key: 'oneUpperCaseCharacter',
          message: 'You need at least one upper cased character',
        },
        minLength: {
          key: 'minLength',
          message: 'You password should be minimum 12 characters long',
          value: 12,
        },
      },
    },
  },
  steps: {...},
  stepsById: [...]
};
```

Dictionary

```jsx
import {
  getValidationRulesHints,
  checkRules,
  withValidationRuleList,
} from '@bedrockstreaming/form-validation-rule-list';

import { PasswordTextField } from '@mylib/textfield';

const ValidatedPasswordTextField = withValidationRuleList(PasswordTextField);

const dictionary = {
  password: ({ errors, validation, label, ...props }) => {
    // These rules don't match react-hook-form's rule API, its proper to the form-validation-rule-list package
    const rules = getValidationRulesHints({
      errors,
      validation,
    });

    const hasError = !!checkRules(props.value, rules).length;
    const fieldError = errors && errors.type;
    const isValid = !!(props.value && !hasError && !fieldError);

    return (
      <div>
        <ValidatedPasswordTextField
          label={label}
          hasError={hasError}
          valid={isValid}
          {...props}
          // specific props required by ValidationRuleList
          rules={rules}
          colors={validationColors}
        />
      </div>
    );
  },
};
```

:warning: Beware, you can't use several `react-hook-form` default rules as validation hints since the `errors` object returned by the library can only contain one default rule error at a time.

## Running unit tests

Run `nx test form-validation-rule-list` to execute the unit tests via [Jest](https://jestjs.io).
