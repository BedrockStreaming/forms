import React from 'react';
import { wrapped } from './wrapped.hoc';
import { ValidatedTextField } from './validatedTextField.component.jsx';

export const ValidatedPasswordTextFieldRaw = ({ name, ...props }) => (
  <ValidatedTextField name={name} type="password" {...props} />
);

ValidatedPasswordTextFieldRaw.displayName = 'ValidatedPasswordTextField';

export const ValidatedPasswordTextField = wrapped(ValidatedPasswordTextFieldRaw);
