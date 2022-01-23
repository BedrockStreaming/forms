import { getUserAge, isDateValid } from '@forms/examples/birthdate';
import { ExtraValidation } from '@bedrockstreaming/form-builder';

/**
 * extravalidation: an object of functions that return a callback function used by react-hook-form
 * (with the current input value as argument)
 */
export const extraValidation = {
  checkMinAge: (value: number) => (input?: string) =>
    getUserAge(input) >= value,
  checkMaxAge: (value: number) => (input?: string) =>
    getUserAge(input) <= value,
  checkDateFormat: (value: number) => (input?: string) => {
    const match = input && input.match(/\D/g);
    const hasTwoSeparators = match && match.length === 2;
    const userAge = getUserAge(input);
    const isUserAgeBelowMaxAge = !!userAge && userAge <= value;

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
