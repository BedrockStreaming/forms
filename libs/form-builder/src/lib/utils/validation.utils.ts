import _ from 'lodash';
import { RuleObject, rule } from './rule.utils';
import { DEFAULT_RULES_NAMES } from '../constants';
import { ExtraValidation, Validations } from '../types';
import { FieldErrors } from 'react-hook-form';
export interface GetFieldRulesArgs {
  validation?: Validations;
  extraValidation?: ExtraValidation;
}

export const getFieldRules = ({
  validation,
  extraValidation
}: GetFieldRulesArgs) => {
  const hookFormRules = _.reduce(
    validation,
    (acc, { key, ...rest }) =>
      _.includes(DEFAULT_RULES_NAMES, key) ? { ...acc, [key]: rest } : acc,
    {}
  );

  const extraRules = _.reduce(
    validation,
    (acc, { key, value }) =>
      _.includes(DEFAULT_RULES_NAMES, key) || !_.get(extraValidation, key)
        ? acc
        : { ...acc, [key]: _.invoke(extraValidation, key, value) },
    {}
  );
  const hasExtraRules = !!Object.keys(extraRules).length;

  return {
    ...hookFormRules,
    ...(hasExtraRules && { validate: extraRules })
  };
};

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
  config
}: GetValidationRulesHintsArgs) => {
  return Object.values(validation).reduce((acc, { message, key }) => {
    return DEFAULT_RULES_NAMES[key]
      ? acc
      : [
          ...acc,
          rule(t(message, config), () => !_.get(errors, ['types', key]))
        ];
  }, [] as Array<RuleObject>);
};
