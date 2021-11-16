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
      className={classnames('validation-rule-li', {
        [fontWeightClass]: true,
        [itemColorClass]: true
      })}
      data-testid={`hint-${_.kebabCase(key)}-${status}`}
    >
      <span>{key}</span>
    </li>
  );
};

export interface DotTextListProps {
  items: DotTextProps[];
  className?: string;
  [key: string]: any;
}

export const DotTextList = ({
  items,
  className,
  ...otherProps
}: DotTextListProps) => (
  <ul className={classnames('validation-rule-ul', className)} {...otherProps}>
    {_.map(items, DotText)}
  </ul>
);
