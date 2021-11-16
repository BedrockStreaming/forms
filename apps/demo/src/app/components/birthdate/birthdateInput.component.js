import { useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ValidatedTextField } from '../textfield/validatedTextField.component';
import {
  formatBirthdate,
  getBirthdateSeparator,
  shortDateDisplay
} from './birthdate.utils';
import {
  weightByRulesClassnames,
  colorByRulesClassnames
} from '../../constants/validationColors.constants';

const separator = getBirthdateSeparator(shortDateDisplay);
const MAX_INPUT_LENGTH = 10;

const StyledValidatedTextField = styled(ValidatedTextField)`
  button {
    color: 'grey';
  }
`;

export const BirthdateInput = ({
  id,
  label,
  value,
  setFieldValue,
  onChange,
  ...props
}) => {
  const previousInputValue = useRef(0);

  const handleChange = (event) => {
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
    <StyledValidatedTextField
      label={label || 'onboarding.labels.birthdate'}
      data-testid="birthdate-field"
      type="text"
      name="birthdate"
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
};

BirthdateInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

BirthdateInput.defaultProps = {
  weightByRulesClassnames,
  colorByRulesClassnames
};
