/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import { checkRules } from '@bedrockstreaming/form-validation-rule-list';
import { getValidationRulesHints } from '@forms/form-builder';

import { ValidatedPasswordTextField } from './components/textfield/validatedPasswordTextField.component';
import { ValidatedTextField } from './components/textfield/validatedTextField.component';

import { BirthdateInput } from './components/birthdate/birthdateInput.component';

const validationColors = {};

const TextFieldMarginWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`;

const TextFieldTopMarginWrapper = styled.div`
  margin-top: 20px;
`;

export const dictionary = {
  text: ({ errors, errorMessage, ...props }) => {
    const error = errors && errors.type && errorMessage;

    return (
      <TextFieldMarginWrapper>
        <ValidatedTextField
          type="text"
          hasError={!!error}
          errorText={error}
          valid={!!props.value && !error}
          {...props}
          label={props.label}
        />
      </TextFieldMarginWrapper>
    );
  },
  password: ({ errors, validation, ...props }) => {
    const rules = getValidationRulesHints({
      errors,
      validation
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
          label={props.label}
        />
      </TextFieldTopMarginWrapper>
    );
  },
  date: ({ errors, validation, label, ...props }) => {
    const rules = getValidationRulesHints({
      errors,
      validation
    });
    const hasError = !!checkRules(props.value, rules).length;
    const fieldError = errors && errors.type;
    const isValid = !!(props.value && !hasError && !fieldError);

    return (
      <TextFieldMarginWrapper>
        <BirthdateInput
          label={label}
          hasError={hasError}
          valid={isValid}
          rules={rules}
          colors={validationColors}
          {...props}
        />
      </TextFieldMarginWrapper>
    );
  },
  submit: ({ label, ...props }) => {
    return (
      <button type="submit" {...props}>
        {label}
      </button>
    );
  }
};
