import PropTypes from 'prop-types';

import { wrapped } from './wrapped.hoc';
import { ValidatedTextField } from './validatedTextField.component';

export const ValidatedPasswordTextFieldRaw = ({ name, ...props }) => {
  return <ValidatedTextField name={name} type="password" {...props} />;
};

ValidatedPasswordTextFieldRaw.propTypes = {
  /** Input's name */
  name: PropTypes.string
};

ValidatedPasswordTextFieldRaw.displayName = 'ValidatedPasswordTextField';

export const ValidatedPasswordTextField = wrapped(
  ValidatedPasswordTextFieldRaw
);
