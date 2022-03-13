export const SUBMIT_FIELD_TYPE = 'submit';

interface DeFaultRulesNames {
  [key: string]: string;
}

// Todo only restrict the react-hook-form rules when those are used in a validation rule list
export const DEFAULT_RULES_NAMES: DeFaultRulesNames = {
  min: 'min',
  max: 'max',
  required: 'required',
};
