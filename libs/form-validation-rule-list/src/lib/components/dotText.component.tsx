import * as React from 'react';
import _ from 'lodash';

export interface DotTextProps {
  key: string;
  status: string;
  [key: string]: any;
}

export const DotText = ({ key, status, ...props }: DotTextProps) => {
  return (
    <li key={key} data-testid={`hint-${_.kebabCase(key)}-${status}`} {...props}>
      <span>{key}</span>
    </li>
  );
};
