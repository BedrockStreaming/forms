import * as React from 'react';
import {
  ValidationRuleList,
  ValidationRuleListProps
} from './validationRuleList.component';

export const withValidationRuleList = (
  ToEnhance: React.FunctionComponent<any>
) => {
  const Enhanced = ({
    rules,
    value,
    ruleComponent,
    ruleComponentProp,
    valueProp = 'value',
    onError,
    ...otherProps
  }: ValidationRuleListProps) => {
    const componentProps = { ...otherProps, [valueProp]: value };
    const { className } = otherProps;

    return (
      <div className={className}>
        <ToEnhance {...componentProps} />
        <ValidationRuleList
          rules={rules}
          value={value}
          component={ruleComponent}
          componentProp={ruleComponentProp}
          onError={onError}
          id={otherProps.name}
        />
      </div>
    );
  };

  return Enhanced;
};
