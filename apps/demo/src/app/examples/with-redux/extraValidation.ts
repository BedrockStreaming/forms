import _ from 'lodash';

import {
  getUserAge,
  isDateValid
} from '../../components/birthdate/birthdate.utils';

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
  checkMinAge: () => (input?: string) => getUserAge(input) >= minAge,
  checkDateFormat: () => (input?: string) => {
    const match = input && input.match(/\D/g);
    const hasTwoSeparators = match && match.length === 2;
    const userAge = getUserAge(input);
    const isUserAgeBelowMaxAge = !!userAge && userAge <= maxAge;

    return !!(isDateValid(input) && hasTwoSeparators && isUserAgeBelowMaxAge);
  },
  checkMaxLength: (value: number) => (input: string) =>
    !!(input && input.length <= value),
  checkMinLength: (value: number) => (input: string) =>
    !!(input && input.length >= value),
  checkForUpper: () => (input: string) => /[A-Z]+/g.test(input),
  checkForLower: () => (input: string) => /[a-z]+/g.test(input),
  checkForNumber: () => (input: string) => /\d+/g.test(input),
  isChecked: () => (value?: string | number) => !!value,
  checkPattern: (value: string) => (input: string) =>
    new RegExp(value).test(input)
};
