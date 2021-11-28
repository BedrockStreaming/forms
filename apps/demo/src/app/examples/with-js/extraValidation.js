import _ from 'lodash';

import {
  getUserAge,
  isDateValid
} from './components/birthdate/birthdate.utils';

const config = {
  onboarding: {
    maxAge: 130,
    minAge: 13
  }
};

const maxAge = _.get(config, 'onboarding.maxAge');
const minAge = _.get(config, 'onboarding.minAge');

/**
 * extravalidation: an object of functions that return a callback function used by react-hook-form
 * (with the current input value as argument)
 */
export const extraValidation = {
  checkMinAge: () => (birthdate) => getUserAge(birthdate) >= minAge,
  checkDateFormat: () => (birthdate) => {
    const match = birthdate && birthdate.match(/\D/g);
    const hasTwoSeparators = match && match.length === 2;
    const userAge = getUserAge(birthdate);
    const isUserAgeBelowMaxAge = !!userAge && userAge <= maxAge;

    return isDateValid(birthdate) && hasTwoSeparators && isUserAgeBelowMaxAge;
  },
  checkMaxLength: (value) => (text) => text && text.length <= value,
  checkMinLength: (value) => (text) => text && text.length >= value,
  checkForUpper: () => (text) => /[A-Z]+/g.test(text),
  checkForLower: () => (text) => /[a-z]+/g.test(text),
  checkForNumber: () => (text) => /\d+/g.test(text),
  isChecked: () => (value) => !!value,
  checkPattern: (regexp) => (text) => new RegExp(regexp).test(text)
};
