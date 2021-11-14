import { useRef, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { withValidationRuleList } from '../../validation-rule-list/validationRuleList.component';

import { TextFieldRaw } from './textfield.component';

const ErrorMessage = styled.p`
  color: '#c0c';
  margin-top: 4px;
`;

const Wrapper = styled.div`
  position: relative;
`;

export const ValidatedTextFieldComponent = ({
  name,
  value,
  cursor,
  hasError,
  errorText,
  hideIcon,
  onFocus,
  onBlur,
  extraIcon,
  ...props
}) => {
  const textFieldRef = useRef();

  const onFocusEvent = (eventAction) => (event) => {
    eventAction(event);
  };

  useEffect(() => {
    if (cursor) {
      textFieldRef.current.setSelectionRange(cursor, cursor);
    }
  }, [value]);

  return (
    <Wrapper>
      <TextFieldRaw
        propRef={textFieldRef}
        name={name}
        onFocus={onFocusEvent(onFocus)}
        onBlur={onFocusEvent(onBlur)}
        value={value}
        {...props}
      />

      {hasError && errorText && (
        <ErrorMessage data-testid={name} id={name}>
          {errorText}
        </ErrorMessage>
      )}
    </Wrapper>
  );
};

ValidatedTextFieldComponent.defaultProps = {
  cursor: 0,
  hasError: false,
  valid: false,
  onFocus: _.noop,
  onBlur: _.noop
};

ValidatedTextFieldComponent.displayName = 'ValidatedTextField';

export const ValidatedTextField = withValidationRuleList(
  ValidatedTextFieldComponent
);
