import { Text } from './dictionary/text.component';
import { Password } from './dictionary/password.component';
import { DateInput } from './dictionary/date.component';
import { Select } from './dictionary/select.component';
import { Checkbox } from './dictionary/checkBox.component';
import { Submit as SubmitRedux } from './dictionary/submit-redux.component';
import { Submit as SubmitContext } from './dictionary/submit-context.component';

/**
 * Here we expose different dictionaries to demonstrate different stores management.
 * The base dictionary is not exported since it contains no submit field.
 */

const DICTIONARY = {
  text: Text,
  password: Password,
  date: DateInput,
  select: Select,
  checkbox: Checkbox
};

export const REDUX_DICTIONARY = {
  ...DICTIONARY,
  submit: SubmitRedux
};

export const CONTEXT_DICTIONARY = {
  ...DICTIONARY,
  submit: SubmitContext
};
