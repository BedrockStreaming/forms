import classnames from 'classnames';
import _ from 'lodash';
import { DotText, DotTextProps } from './dotText.component';

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
  <ul
    className={classnames('validation-rule-ul', className)}
    {...otherProps}
    data-testid="validation-rule-ul"
  >
    {_.map(items, DotText)}
  </ul>
);
