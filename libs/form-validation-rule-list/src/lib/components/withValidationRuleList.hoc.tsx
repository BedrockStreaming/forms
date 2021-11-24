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
    component,
    componentProp,
    valueProp = 'value',
    onError,
    weightByRulesClassnames,
    colorByRulesClassnames,
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

  return Enhanced;
};
