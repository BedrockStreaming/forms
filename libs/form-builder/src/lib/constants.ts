export const SUBMIT_FIELD_TYPE = 'submit';

interface DeFaultRulesNames {
  [key: string]: string;
}

// TODO: only restrict rules used with form-validation-rule-list
export const DEFAULT_RULES_NAMES: DeFaultRulesNames = {
  min: 'min',
  max: 'max',
  required: 'required',
};
