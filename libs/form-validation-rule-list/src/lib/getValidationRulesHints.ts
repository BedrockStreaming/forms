import { Validations, DEFAULT_RULES_NAMES } from '@bedrockstreaming/form-builder';
import { FieldErrors } from 'react-hook-form';
import _ from 'lodash';

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

export const getValidationRulesHints = ({
  t = _.identity,
  errors,
  validation,
  config,
}: GetValidationRulesHintsArgs) => {
  return Object.values(validation).reduce((acc, { message, key }) => {
    return DEFAULT_RULES_NAMES[key] ? acc : [...acc, rule(t(message, config), () => !_.get(errors, ['types', key]))];
  }, [] as Array<RuleObject>);
};
