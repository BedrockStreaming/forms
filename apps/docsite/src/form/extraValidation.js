import _ from 'lodash';

import { getUserAge, isDateValid } from '@forms/examples/birthdate';

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
  checkMinAge: () => (input) => getUserAge(input) >= minAge,
  checkDateFormat: () => (input) => {
    const match = input && input.match(/\D/g);
    const hasTwoSeparators = match && match.length === 2;
    const userAge = getUserAge(input);
    const isUserAgeBelowMaxAge = !!userAge && userAge <= maxAge;

    return !!(isDateValid(input) && hasTwoSeparators && isUserAgeBelowMaxAge);
  },
  checkMaxLength: (value) => (input) => !!(input && input.length <= value),
  checkMinLength: (value) => (input) => !!(input && input.length >= value),
  checkForUpper: () => (input) => /[A-Z]+/g.test(input),
  checkForLower: () => (input) => /[a-z]+/g.test(input),
  checkForNumber: () => (input) => /\d+/g.test(input),
  isChecked: () => (value) => !!value,
  checkPattern: (value) => (input) => new RegExp(value).test(input)
};
