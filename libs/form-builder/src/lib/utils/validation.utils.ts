import { RegisterOptions } from 'react-hook-form';
import _ from 'lodash';

import { DEFAULT_RULES_NAMES } from '../constants';
import { ExtraValidation, Validations } from '../types';

export interface GetFieldRulesArgs {
  validation?: Validations;
  extraValidation?: ExtraValidation;
}

export const getFieldRules = ({
  validation,
  extraValidation
}: GetFieldRulesArgs): RegisterOptions => {
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
