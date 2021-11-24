import classnames from 'classnames';
import _ from 'lodash';

export interface DotTextProps {
  key: string;
  itemColorClass: string;
  fontWeightClass: string;
  status: string;
}

export const DotText = ({
  key,
  itemColorClass,
  fontWeightClass,
  status
}: DotTextProps) => {
  return (
    <li
      key={key}
      className={classnames('validation-rule-li', [
        fontWeightClass,
        itemColorClass
      ])}
      data-testid={`hint-${_.kebabCase(key)}-${status}`}
    >
      <span>{key}</span>
    </li>
  );
};
