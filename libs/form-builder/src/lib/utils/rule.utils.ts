export const DEFAULT_STATE = 0;
export const COMPLETE_STATE = 1;
export const INCOMPLETE_STATE = 2;

export type RuleCheck = (value: string | number) => boolean;

export interface RuleObject {
  key: string;
  check: (value: any) => 0 | 1 | 2;
}

export type Rule = (key: string, check: RuleCheck) => RuleObject;

export const rule = (key: string, check: RuleCheck) => ({
  key,
  check: (value: any) => {
    if (typeof value === 'undefined' || !value.length) {
      return DEFAULT_STATE;
    }

    if (!check) {
      return DEFAULT_STATE;
    }

    return check(value) ? COMPLETE_STATE : INCOMPLETE_STATE;
  }
});
