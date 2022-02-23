import { RegisterOptions } from 'react-hook-form';

import { DEFAULT_RULES_NAMES } from '../constants';
import { ExtraValidation, Validations } from '../types';

const EMPTY_OBJECT = {} as const;

export const handleValidateErrorMessage =
  (validate: (input: any) => boolean | string | undefined | Promise<boolean | string | undefined>, message: string) =>
  async (input: any): Promise<string | boolean | undefined> => {
    const result = await validate(input);

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
  validation = EMPTY_OBJECT,
  extraValidation = EMPTY_OBJECT,
}: GetFieldRulesArgs): FieldRules => {
  const hookFormRules = Object.values(validation).reduce(
    (acc, { key, ...rest }) => (DEFAULT_RULES_NAMES?.[key] ? { ...acc, [key]: rest } : acc),
    EMPTY_OBJECT,
  );

  const extraRules = Object.values(validation).reduce(
    (acc, { key, value, message }) =>
      DEFAULT_RULES_NAMES?.[key] || (extraValidation && !extraValidation[key])
        ? acc
        : {
            ...acc,
            [key]: handleValidateErrorMessage(extraValidation?.[key]?.(value), message),
          },
    EMPTY_OBJECT,
  );
  const hasExtraRules = !!Object.keys(extraRules).length;

  return {
    ...hookFormRules,
    ...(hasExtraRules && { validate: extraRules }),
  };
};
