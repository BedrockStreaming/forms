import _ from 'lodash';

import { getUserAge, isDateValid } from '@forms/examples/birthdate';
import { ExtraValidation } from '@bedrockstreaming/form-builder';

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
export const extraValidation: ExtraValidation = {
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
  isChecked: () => (value?: boolean) => !!value,
  checkPattern: (value: string) => (input: string) =>
    new RegExp(value).test(input),
  isTrue: () => (input: boolean) => input === true
} as ExtraValidation;
