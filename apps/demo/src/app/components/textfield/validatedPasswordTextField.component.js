import { wrapped } from './wrapped.hoc';
import { ValidatedTextField } from './validatedTextField.component';
import {
  weightByRulesClassnames,
  colorByRulesClassnames
} from '../../constants/validationColors.constants';

export const ValidatedPasswordTextFieldRaw = ({ name, ...props }) => {
  return <ValidatedTextField name={name} type="password" {...props} />;
};

ValidatedPasswordTextFieldRaw.defaultProps = {
  weightByRulesClassnames,
  colorByRulesClassnames
};

ValidatedPasswordTextFieldRaw.displayName = 'ValidatedPasswordTextField';

export const ValidatedPasswordTextField = wrapped(
  ValidatedPasswordTextFieldRaw
);
