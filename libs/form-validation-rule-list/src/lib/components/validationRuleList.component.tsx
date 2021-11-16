import React from 'react';
import _ from 'lodash';

import { INCOMPLETE_STATE } from '../constants';
import { RuleObject } from '../rule';
import { ClassnamesByStatusNumbers } from '../types';

import { DotTextList } from './dotTextList.component';

interface RulesItem {
  key: string;
  fontWeightClass: string;
  itemColorClass: string;
}

interface BaseRules {
  errors: string[];
  items: RulesItem[];
}

interface EnhancedRules extends RuleObject, BaseRules {}

export interface ValidationRuleListComponentProps {
  id?: string;
  rules: EnhancedRules[];
  colors: any;
  value: any;
  component: React.FunctionComponent<any>;
  componentProp: any;
  onError: (value: any) => void;
  className?: string;
  name?: string;
  valueProp?: any;
  weightByRulesClassnames: ClassnamesByStatusNumbers;
  colorByRulesClassnames: ClassnamesByStatusNumbers;
}

export const ValidationRuleListComponent = ({
  rules,
  colors,
  value,
  component: Component,
  componentProp,
  weightByRulesClassnames,
  colorByRulesClassnames,
  onError,
  ...otherProps
}: ValidationRuleListComponentProps) => {
  if (rules.length) {
    const { items, errors } = rules.reduce(
      (acc, { check, key }) => {
        const result = check(value);

        const nextErrors =
          result === INCOMPLETE_STATE ? _.concat(acc.errors, key) : acc.errors;
        const nextItems = _.concat(acc.items, {
          key,
          fontWeightClass: weightByRulesClassnames[result],
          itemColorClass: colorByRulesClassnames[result]
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

ValidationRuleListComponent.defaultProps = {
  rules: [],
  colors: undefined,
  value: '',
  component: DotTextList,
  componentProp: 'items',
  onError: _.noop
};

ValidationRuleListComponent.displayName = 'ValidationRuleList';

export const withValidationRuleList = (
  ToEnhance: React.FunctionComponent<any>
) => {
  const Enhanced = ({
    rules,
    colors,
    value,
    component,
    componentProp,
    valueProp,
    onError,
    weightByRulesClassnames,
    colorByRulesClassnames,
    ...otherProps
  }: ValidationRuleListComponentProps) => {
    const componentProps = { ...otherProps, [valueProp]: value };
    const { className } = otherProps;

    return (
      <div className={className}>
        <ToEnhance {...componentProps} />
        <ValidationRuleListComponent
          rules={rules}
          colors={colors}
          value={value}
          component={component}
          componentProp={componentProp}
          onError={onError}
          id={otherProps.name}
          weightByRulesClassnames={weightByRulesClassnames}
          colorByRulesClassnames={colorByRulesClassnames}
        />
      </div>
    );
  };

  Enhanced.defaultProps = { valueProp: 'value' };

  return Enhanced;
};

export default ValidationRuleListComponent;
