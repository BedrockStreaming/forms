import { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled, { css } from 'styled-components';

import { rgba, timingFunctions } from 'polished';

import { wrapped } from './wrapped.hoc';

export const VERTICAL_SPACING = 4;

const textColor = '#000';
const textLightColor = rgba(textColor, 0.8);
const textInactiveColor = rgba(textColor, 0.5);

const lineInactiveColor = rgba(textColor, 0.3);

export const BorderBottom = styled.div`
  display: block;
  position: relative;
  top: -1px;
  width: 100%;
  height: 1px;
  background-color: ${textColor};
  transform: scale(0);
  transition: transform 0.2s ${timingFunctions('easeOutSine')};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: ${VERTICAL_SPACING}px ${7 * VERTICAL_SPACING}px ${VERTICAL_SPACING}px
    0;
  border: none;
  border-bottom: ${(props) =>
    props.readOnly ? 'none' : `1px solid ${lineInactiveColor}`};
  appearance: none;
  border-radius: 0;
  background-color: transparent;
  text-overflow: ellipsis;
  color: ${textColor};
  // TODO: set some typography properties

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    &:not(:disabled):not(:read-only) ~ ${BorderBottom} {
      transform: scale(1);
      transition-timing-function: ${timingFunctions('easeInSine')};
    }
  }

  &:invalid {
    box-shadow: none;
  }

  &:disabled {
    color: ${textInactiveColor};
  }

  &:read-only {
    cursor: default;
  }

  /* Safari specific custom icon styles */
  &::-webkit-credentials-auto-fill-button {
    background: ${textColor};
  }

  &::-webkit-caps-lock-indicator {
    content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 12 2 L 4 12 L 8 12 L 8 19 L 16 19 L 16 12 L 20 12 L 12 2 z M 8 20 L 8 22 L 16 22 L 16 20 L 8 20 z"/></svg>');
    align-self: baseline;
    margin: 4px 4px 4px 8px;
  }
`;

const labelUpStyle = css`
  color: ${textLightColor};
  transform: translateY(-100%);
  // TODO: set some typography properties
`;

export const Label = styled.label`
  display: flex;
  position: absolute;
  top: 0;
  padding: ${VERTICAL_SPACING}px 0;
  color: ${textColor};
  pointer-events: none;
  transition: transform 0.2s, font-size 0.2s, color 0.2s;

  input:disabled ~ & {
    color: ${textInactiveColor};
  }

  ${(props) => props.up && labelUpStyle};

  input:focus:not(:read-only) ~ & {
    ${labelUpStyle};
  }

  input:focus:not(:-moz-read-only) ~ & {
    ${labelUpStyle};
  }

  input:-webkit-autofill ~ & {
    ${labelUpStyle};
  }
`;

const OptionalText = styled.p`
  color: ${textColor};
`;

Label.propTypes = {
  up: PropTypes.bool.isRequired
};

export const TextFieldComponent = ({
  propRef,
  type,
  optionalText,
  label,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  readOnly,
  disabled,
  ...props
}) => {
  const isEmptyAndReadOnly = readOnly && !value;

  return (
    <>
      <Input
        ref={propRef}
        type={type}
        id={name}
        name={name}
        value={isEmptyAndReadOnly ? '-' : value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
      <BorderBottom />
      <Label up={readOnly || !!value} htmlFor={name} id={name}>
        {label}
        {optionalText && (
          <OptionalText component="span">
            &nbsp;
            {optionalText}
          </OptionalText>
        )}
      </Label>
    </>
  );
};

TextFieldComponent.defaultProps = {
  name: '',
  type: 'text',
  value: '',
  disabled: false,
  optionalText: '',
  onChange: _.noop,
  onFocus: _.noop,
  onBlur: _.noop,
  readOnly: false
};

TextFieldComponent.propTypes = {
  /** Ref */
  propRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** Input change handler */
  onChange: PropTypes.func,
  /** Input on focus handler */
  onFocus: PropTypes.func,
  /** Input on blur handler */
  onBlur: PropTypes.func,
  /** Input's name */
  name: PropTypes.string,
  /** Input's type */
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel']),
  /** Input's value */
  value: PropTypes.string,
  /** Cursor's value */
  disabled: PropTypes.bool,
  /** Optional text */
  optionalText: PropTypes.string,
  /** If `true`, the field cannot be edited. */
  readOnly: PropTypes.bool,
  /** Label */
  label: PropTypes.string,
  /** Required */
  required: PropTypes.bool
};

TextFieldComponent.displayName = 'TextField';

export const TextFieldRaw = TextFieldComponent;
export const TextField = memo(wrapped(TextFieldRaw));
