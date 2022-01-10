import { RegisterOptions } from 'react-hook-form';
import _ from 'lodash';

import { DEFAULT_RULES_NAMES } from '../constants';
import { ExtraValidation, Validations } from '../types';

export const handleValidateErrorMessage =
  (validate: (...args: any[]) => boolean | undefined, message: string) =>
  async (...args: any[]) => {
    const result = await validate(...args);

    return result || message;
  };

export interface GetFieldRulesArgs {
  validation?: Validations;
  extraValidation?: ExtraValidation;
}

export interface FieldRules extends RegisterOptions {
  validate?: { [key: string]: (value?: any) => Promise<boolean> | boolean };
}

export const getFieldRules = ({
  validation,
  extraValidation
}: GetFieldRulesArgs): FieldRules => {
  const hookFormRules = _.reduce(
    validation,
    (acc, { key, ...rest }) =>
      _.includes(DEFAULT_RULES_NAMES, key) ? { ...acc, [key]: rest } : acc,
    {}
  );

  const extraRules = _.reduce(
    validation,
    (acc, { key, value, message }) =>
      _.includes(DEFAULT_RULES_NAMES, key) ||
      (extraValidation && !extraValidation[key])
        ? acc
        : {
            ...acc,
            [key]: handleValidateErrorMessage(
              _.invoke(extraValidation, key, value),
              message
            )
          },
    {}
  );
  const hasExtraRules = !!Object.keys(extraRules).length;

  return {
    ...hookFormRules,
    ...(hasExtraRules && { validate: extraRules })
  };
};
