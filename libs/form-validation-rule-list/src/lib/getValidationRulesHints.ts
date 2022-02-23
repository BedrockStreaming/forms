import { Validations, DEFAULT_RULES_NAMES } from '@bedrockstreaming/form-builder';
import { FieldErrors } from 'react-hook-form';

import { rule, RuleObject } from './rule';

interface AbstractMapOfString {
  [key: string]: string;
}

export interface GetValidationRulesHintsArgs {
  t?: (value: string, config?: AbstractMapOfString) => string;
  errors: FieldErrors;
  validation: Validations;
  config?: AbstractMapOfString;
}

const identity = (value: string) => value;

export const getValidationRulesHints = ({ t = identity, errors, validation, config }: GetValidationRulesHintsArgs) => {
  return Object.values(validation).reduce((acc, { message, key }) => {
    return DEFAULT_RULES_NAMES[key] ? acc : [...acc, rule(t(message, config), () => !errors?.types[key])];
  }, [] as Array<RuleObject>);
};
