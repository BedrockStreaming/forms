import _ from 'lodash';
import styled from 'styled-components';
import { DotTextList as DotTextListComponent } from './dotTextList.component';

export const DotTextList = styled(DotTextListComponent)`
  margin-top: 4px;
`;

export const DEFAULT_STATE = 0;
export const COMPLETE_STATE = 1;
export const INCOMPLETE_STATE = 2;

export const rule = (key, check) => ({
  key,
  check: (value) => {
    if (_.isUndefined(value) || !value.length) {
      return DEFAULT_STATE;
    }

    if (!check) {
      return DEFAULT_STATE;
    }

    return check(value) ? COMPLETE_STATE : INCOMPLETE_STATE;
  }
});

export const checkRules = (value, rules) =>
  rules.reduce(
    (acc, { check, key }) =>
      check(value) === INCOMPLETE_STATE ? _.concat(acc, key) : acc,
    []
  );

export const ValidationRuleListComponent = ({
  rules,
  colors,
  value,
  component: Component,
  componentProp,
  onError,
  ...otherProps
}) => {
  if (rules.length) {
    const weightByRules = {
      [DEFAULT_STATE]: 'bold',
      [COMPLETE_STATE]: 400,
      [INCOMPLETE_STATE]: 'bold'
    };
    const colorByRules = _.merge(
      {
        [DEFAULT_STATE]: 'green',
        [COMPLETE_STATE]: 'red',
        [INCOMPLETE_STATE]: 'red'
      },
      colors || {}
    );

    const { items, errors } = rules.reduce(
      (acc, { check, key }) => {
        const result = check(value);

        const nextErrors =
          result === INCOMPLETE_STATE ? _.concat(acc.errors, key) : acc.errors;
        const nextItems = _.concat(acc.items, {
          key,
          itemFontWeight: weightByRules[result],
          itemColor: colorByRules[result]
        });

        return { items: nextItems, errors: nextErrors };
      },
      { errors: [], items: [] }
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

export const withValidationRuleList = (ToEnhance) => {
  const Enhanced = ({
    rules,
    colors,
    value,
    component,
    componentProp,
    valueProp,
    onError,
    ...otherProps
  }) => {
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
        />
      </div>
    );
  };

  Enhanced.defaultProps = { valueProp: 'value' };

  return Enhanced;
};

export default ValidationRuleListComponent;
