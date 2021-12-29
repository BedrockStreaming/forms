export const SUBMIT_FIELD_TYPE = 'submit';
export const PREVIOUS_FIELD_TYPE = 'previous';

interface DeFaultRulesNames {
  [key: string]: string;
}

export const DEFAULT_RULES_NAMES: DeFaultRulesNames = {
  min: 'min',
  max: 'max',
  required: 'required'
};
