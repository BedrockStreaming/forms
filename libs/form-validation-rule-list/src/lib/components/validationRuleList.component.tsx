import * as React from 'react';
import _ from 'lodash';

import { INCOMPLETE_STATE, STATUS_BY_STATE } from '../constants';
import { RuleObject } from '../rule';

export interface RulesItem {
  key: string;
  status: string;
}

export interface BaseRules {
  errors: string[];
  items: RulesItem[];
}

export interface EnhancedRules extends RuleObject, BaseRules {}

const getItemsAndErrors = (rules: RuleObject[], value?: string | number) =>
  rules.reduce(
    (acc, { check, key }) => {
      const result = check(value);

      const nextErrors = result === INCOMPLETE_STATE ? _.concat(acc.errors, key) : acc.errors;
      const nextItems = _.concat(acc.items, {
        key,
        status: STATUS_BY_STATE[result],
      });

      return { items: nextItems, errors: nextErrors };
    },
    { errors: [], items: [] } as BaseRules,
  );

export interface ValidationRuleListProps {
  id?: string;
  rules?: RuleObject[];
  value?: string | number;
  component?: React.FunctionComponent<any>;
  componentProp?: string;
  onError?: (value: any) => void;
  onChange?: (event: any) => void;
  className?: string;
  name?: string;
  valueProp?: any;
  [key: string]: any;
}

export const ValidationRuleList = ({
  rules = [],
  value = '',
  component: Component,
  componentProp = 'items',
  onError = _.noop,
  ...otherProps
}: ValidationRuleListProps) => {
  if (!Component || !rules.length) {
    return null;
  }

  const { items, errors } = getItemsAndErrors(rules, value);

  onError(errors);

  const componentProps = { ...otherProps, [componentProp]: items };

  return <Component {...componentProps} />;
};
