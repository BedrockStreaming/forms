import _ from 'lodash';
import { INCOMPLETE_STATE, DEFAULT_STATE, COMPLETE_STATE } from './constants';

export type RuleCheck = (value?: string | number) => boolean;

export interface RuleObject {
  key: string;
  check: (value?: string | number) => 0 | 1 | 2;
}

export type Rule = (key: string, check: RuleCheck) => RuleObject;

export const rule = (key: string, check?: RuleCheck): RuleObject => ({
  key,
  check: (value?: string | number) => {
    if (typeof value === 'undefined' || !_.get(value, ['length'])) {
      return DEFAULT_STATE;
    }

    if (!check) {
      return DEFAULT_STATE;
    }

    return check(value) ? COMPLETE_STATE : INCOMPLETE_STATE;
  }
});

export type CheckRules = (
  value: string | number,
  rules: RuleObject[]
) => string[];

export const checkRules = (
  value: string | number,
  rules: RuleObject[]
): string[] =>
  rules.reduce(
    (acc, { check, key }) =>
      check(value) === INCOMPLETE_STATE ? _.concat(acc, key) : acc,
    [] as string[]
  );
