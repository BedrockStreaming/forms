import * as React from 'react';
import _ from 'lodash';

import {
  formatBirthdate,
  getBirthdateSeparator,
  shortDateDisplay
} from './birthdate.utils';

const separator = getBirthdateSeparator(shortDateDisplay);
const MAX_INPUT_LENGTH = 10;

export interface ComponentProps {
  value: any;
  label: string;
  onChange: (event: any) => void;
  'data-testid': string;
  type: string;
  name: string;
  [key: string]: any;
}

export interface BirthdateInputProps {
  component: (props: any) => JSX.Element;
  id: string;
  value: any;
  label: string;
  setFieldValue: any;
  onChange: (event: any) => void;
  [key: string]: any;
}

export const BirthdateInput = ({
  component: Component,
  id,
  label,
  value,
  setFieldValue,
  onChange,
  ...props
}: BirthdateInputProps) => {
  const previousInputValue = React.useRef<string>('');

  const handleChange = (event: any) => {
    const eventValue = _.get(event, 'target.value', '');

    if (eventValue.length > MAX_INPUT_LENGTH) {
      return;
    }

    const isDeleting = previousInputValue.current.length >= eventValue.length;

    const shouldFormatInput =
      !isDeleting || eventValue.length === MAX_INPUT_LENGTH;

    if (shouldFormatInput) {
      const newBirthdateInput =
        eventValue[eventValue.length] === separator
          ? eventValue
          : formatBirthdate(eventValue);
      setFieldValue(id, formatBirthdate(newBirthdateInput));
    }

    previousInputValue.current = eventValue;
    onChange(event);
  };

  return (
    <Component
      label={label}
      data-testid="birthdate-field"
      type="text"
      name="birthdate"
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
};
