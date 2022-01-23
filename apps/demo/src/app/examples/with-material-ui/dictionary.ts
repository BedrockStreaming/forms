import { Text } from './dictionary/text.component';
import { Password } from './dictionary/password.component';
import { DateInput } from './dictionary/date.component';
import { Submit } from './dictionary/submit.component';
import { Select } from './dictionary/select.component';
import { Previous } from './dictionary/previous.component';
import { Checkbox } from './dictionary/checkBox.component';
import { Thanks } from './dictionary/presentational/thanks.component';
import { OkBoomer } from './dictionary/presentational/okBoomer.component';
import { Birthday } from './dictionary/presentational/birthday.component';
import { OkKiddo } from './dictionary/presentational/kiddo.component';

export const dictionary = {
  text: Text,
  password: Password,
  date: DateInput,
  select: Select,
  checkbox: Checkbox,
  submit: Submit,
  previous: Previous,
  thanks: Thanks,
  okBoomer: OkBoomer,
  okKiddo: OkKiddo,
  birthday: Birthday
};
