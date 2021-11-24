export const DEFAULT_STATE = 0;
export const COMPLETE_STATE = 1;
export const INCOMPLETE_STATE = 2;

export const DEFAULT_STATUS = 'idle';
export const COMPLETE_STATUS = 'complete';
export const INCOMPLETE_STATUS = 'incomplete';

export const STATUS_BY_STATE = {
  [COMPLETE_STATE]: COMPLETE_STATUS,
  [INCOMPLETE_STATE]: INCOMPLETE_STATUS,
  [DEFAULT_STATE]: DEFAULT_STATUS
};

export const DEFAULT_RULES_NAMES = {
  min: 'min',
  max: 'max',
  required: 'required'
};

export interface ClassnamesByStatusNumbers {
  [DEFAULT_STATE]: string;
  [COMPLETE_STATE]: string;
  [INCOMPLETE_STATE]: string;
}

export interface ClassnamesByStatusStrings {
  [DEFAULT_STATUS]: string;
  [COMPLETE_STATUS]: string;
  [INCOMPLETE_STATUS]: string;
}

export type StatusValue =
  ClassnamesByStatusNumbers[keyof ClassnamesByStatusNumbers];
