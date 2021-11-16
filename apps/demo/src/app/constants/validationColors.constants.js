import {
  getColorByRulesClassnames,
  getWeightByRulesClassnames
} from '@bedrockstreaming/form-validation-rule-list';

export const VALIDATION_CLASSNAMES = {
  complete: 'complete-li',
  incomplete: 'incomplete-li',
  idle: 'idle-li'
};

export const weightByRulesClassnames = getWeightByRulesClassnames(
  VALIDATION_CLASSNAMES
);

export const colorByRulesClassnames = getColorByRulesClassnames(
  VALIDATION_CLASSNAMES
);
