import { wrapped } from './wrapped.hoc';
import { ValidatedTextField } from './validatedTextField.component';

export const ValidatedPasswordTextFieldRaw = ({ name, ...props }) => {
  return <ValidatedTextField name={name} type="password" {...props} />;
};

ValidatedPasswordTextFieldRaw.displayName = 'ValidatedPasswordTextField';

export const ValidatedPasswordTextField = wrapped(
  ValidatedPasswordTextFieldRaw
);
