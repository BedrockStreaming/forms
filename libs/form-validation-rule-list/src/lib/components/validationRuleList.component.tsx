import React from 'react';
import _ from 'lodash';

import {
  INCOMPLETE_STATE,
  STATUS_BY_STATE,
  StatusValue,
  ClassnamesByStatusNumbers
} from '../constants';
import { RuleObject } from '../rule';

import { DotTextList } from './dotTextList.component';

export interface RulesItem {
  key: string;
  fontWeightClass: string;
  itemColorClass: string;
  status: StatusValue;
}

export interface BaseRules {
  errors: string[];
  items: RulesItem[];
}

export interface EnhancedRules extends RuleObject, BaseRules {}

export interface ValidationRuleListProps {
  id?: string;
  rules: RuleObject[];
  value?: string | number;
  component?: React.FunctionComponent<any>;
  componentProp?: string;
  onError?: (value: any) => void;
  onChange?: (event: any) => void;
  className?: string;
  name?: string;
  valueProp?: any;
  weightByRulesClassnames: ClassnamesByStatusNumbers;
  colorByRulesClassnames: ClassnamesByStatusNumbers;
  [key: string]: any;
}

export const ValidationRuleList = ({
  rules = [],
  value = '',
  component: Component = DotTextList,
  componentProp = 'items',
  weightByRulesClassnames,
  colorByRulesClassnames,
  onError = _.noop,
  ...otherProps
}: ValidationRuleListProps) => {
  if (rules.length) {
    const { items, errors } = rules.reduce(
      (acc, { check, key }) => {
        const result = check(value);

        const nextErrors =
          result === INCOMPLETE_STATE ? _.concat(acc.errors, key) : acc.errors;
        const nextItems = _.concat(acc.items, {
          key,
          fontWeightClass: weightByRulesClassnames[result],
          itemColorClass: colorByRulesClassnames[result],
          status: STATUS_BY_STATE[result]
        });

        return { items: nextItems, errors: nextErrors };
      },
      { errors: [], items: [] } as BaseRules
    );

    onError(errors);

    const componentProps = { ...otherProps, [componentProp]: items };

    return <Component {...componentProps} />;
  }

  return null;
};
